import React from 'react'
import {render} from 'react-dom'

import {selectVoornaam} from './helpers/selectVoornaam'
import {selectAchternaam} from './helpers/selectAchternaam'

import mannen from '../databank/voornamen/mannen'
import vrouwen from '../databank/voornamen/vrouwen'
import achternamen from '../databank/achternamen'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        voornaam: 'thijs',   // input
        achternaam: 'smudde', // input
        naam: ''        // result
    }
  }

  selectAchternaam = () => {
    const countAchternamen = achternamen.length
    const selectedValue = Math.floor(Math.random() * countAchternamen)

    return achternamen[selectedValue]
  }

  createNaam = e => {
    e.preventDefault()

    const {voornaam, achternaam} = this.state

    // determine gender based on voornaam

    fetch(`https://api.genderize.io/?name=${voornaam}&country_id=NL`).then(response => {
      if (!(response && response.status == 200))
        toastr.error('API Response was not correct!', 'Something went wrong')
      
      return response.json()
    }).then(({error, gender}) => {
      if (error && error.message)
        return toastr.error(error.code + ' API error', error.message)

      const collection = gender === 'male' ? mannen : vrouwen
      const firstname = selectVoornaam(voornaam, collection)
      const lastname = selectAchternaam(achternaam, achternamen)
      const naam = `${firstname} ${lastname}`

      this.setState({naam})
    })
  }

  onChange = event => {
    const target = event.target
    const {name, value} = target

    this.setState({[name]: value})
  }

  render() {
    const {voornaam, achternaam, naam} = this.state

    return (
      <React.Fragment>
        <form onSubmit={this.createNaam}>Jouw naam in de 18e eeuw.
          <br/>
          <input
            autoFocus
            onChange={this.onChange}
            type='text'
            placeholder='Voornaam'
            name='voornaam'
            value={voornaam}
            required/>
          <input
            autoFocus
            onChange={this.onChange}
            type='text'
            placeholder='Achternaam'
            name='achternaam'
            value={achternaam}
            required/>
          <button type='submit'>Genereer je OudHollandSche naam</button>
        </form>
        {naam}
      </React.Fragment>
    )
  }
}

render(
  <App/>, document.getElementById('root'))