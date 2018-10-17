import React from 'react'
import {render} from 'react-dom'
import GitHubForkRibbon from 'react-github-fork-ribbon'

import toastr from 'toastr'

import {selectVoornaam} from './helpers/selectVoornaam'
import {selectAchternaam} from './helpers/selectAchternaam'

import mannen from '../databank/voornamen/mannen'
import vrouwen from '../databank/voornamen/vrouwen'
import achternamen from '../databank/achternamen'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      voornaam: '', // input
      achternaam: '', // input
      naam: '', // result
    }
  }

  selectAchternaam = () => {
    const countAchternamen = achternamen.length
    const selectedValue = Math.floor(Math.random() * countAchternamen)

    return achternamen[selectedValue]
  }

  createNaam = e => {
    e.preventDefault()

    let {voornaam, achternaam} = this.state

    // determine gender based on voornaam
    voornaam = voornaam.trim()
    achternaam = achternaam.trim()

    fetch(`https://api.genderize.io/?name=${voornaam}&country_id=NL`).then(response => {
      if (!(response && response.status == 200)) 
        toastr.error('API Response was not correct!', 'Something went wrong')

      return response.json()
    }).then(({error, gender}) => {
      if (error && error.message) 
        return toastr.error(error.code + ' API error', error.message)

      const collection = gender === 'male'
        ? mannen
        : vrouwen
      const firstname = selectVoornaam(voornaam, collection)
      const lastname = selectAchternaam(achternaam, achternamen)
      const naam = `${firstname} ${lastname}`

      this.setState({naam})
    })
  }

  capitalize = text => text
    .charAt(0)
    .toUpperCase() + text.substr(1)

  onChange = ({
    target: {
      name,
      value
    }
  }) => this.setState({
    [name]: this.capitalize(value)
  })

  retry = () => this.setState({naam: ''})

  render() {
    const {voornaam, achternaam, naam} = this.state

    const hasName = naam && naam.length > 1
      ? true
      : false

    return (
      <React.Fragment>
        <GitHubForkRibbon
          href='https://github.com/fullhdpixel/OudHollandseNamen/'
          target='_blank'
          position='right'>
          View Source Code
        </GitHubForkRibbon>
        <main>
          <div className='content'>
            <div className='glitch'>
              <div className='glitch__img'></div>
              <div className='glitch__img'></div>
              <div className='glitch__img'></div>
              <div className='glitch__img'></div>
              <div className='glitch__img'></div>
            </div>
            <h2 className='content__title'>{naam}</h2>
            {hasName && <button onClick={() => this.retry()}>Probeer Opnieuw</button>}
            {!hasName && <form onSubmit={this.createNaam}>
              <p className='content__text'>Jouw naam in de tijd van René Descartes.</p>
              <input
                autoFocus
                onChange={this.onChange}
                type='text'
                className='form-control'
                placeholder='Voornaam'
                name='voornaam'
                value={voornaam}
                required/>
              <input
                onChange={this.onChange}
                type='text'
                className='form-control'
                placeholder='Achternaam'
                name='achternaam'
                value={achternaam}
                required/>
              <button type='submit'>Start de tijdmachine</button>
            </form>}
          </div>
        </main>
      </React.Fragment>
    )
  }
}

render(
  <App/>, document.getElementById('root'))