import React from 'react'
import {render} from 'react-dom'
import GitHubForkRibbon from 'react-github-fork-ribbon'

import * as Styled from './css/Index'

import {selectNaam} from './helpers/selectNaam'

import mannen from '../databank/voornamen/mannen'
import vrouwen from '../databank/voornamen/vrouwen'
import achternamen from '../databank/achternamen'

import frenchMannen from '../databank/french_voornamen/mannen'
import frenchVrouwen from '../databank/french_voornamen/vrouwen'
import frenchAchternamen from '../databank/french_achternamen'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      voornaam: '', // input
      achternaam: '', // input
      naam: '', // result
      hasError: false, // if errorBox should be shown
      errorReason: '', // string with detailed error
      isFrench: true
    }
  }

  fetchGender = e => {
    e.preventDefault()

    let {voornaam} = this.state

    // determine gender based on voornaam
    voornaam = voornaam.trim()

    if (!navigator.onLine)
      return this.setState({hasError: true, errorReason: 'Je bent helaas niet online.'})

    fetch(`https://api.genderize.io/?name=${voornaam}&country_id=NL`).then(response => {
      if (!(response && response.status == 200)) 
        return this.setState({hasError: true, errorReason: 'Tijdmachine is kapot.'})

      return response.json()
    }).then(({error, gender}) => {
      if (error && error.message) 
        return this.setState({hasError: true, errorReason: error.code + ' API error' + error.message})

      this.createNaam(gender)
    })
  }

  createNaam = gender => {
    let {voornaam, achternaam, isFrench} = this.state

    voornaam = voornaam.trim()
    achternaam = achternaam.trim()

    const voornamen = gender === 'male'
    ? (isFrench ? frenchMannen : mannen)
    : (isFrench ? frenchVrouwen : vrouwen)
    const firstname = selectNaam(voornaam, voornamen)
    const lastname = selectNaam(achternaam, isFrench ? frenchAchternamen : achternamen)
    const naam = `${firstname} ${lastname}`

    this.setState({naam})
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

  retry = () => this.setState({naam: '', hasError: false, errorReason: ''})

  switchLanguage = countryString => this.setState({isFrench: countryString === 'french'})

  render() {
    const {voornaam, achternaam, naam, hasError, errorReason} = this.state

    const hasName = (naam && naam.length > 1) || hasError
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
            <Styled.glitch>
              <div className='glitch__img'></div>
              <div className='glitch__img'></div>
              <div className='glitch__img'></div>
              <div className='glitch__img'></div>
              <div className='glitch__img'></div>
            </Styled.glitch>
            {hasError && <div className='content__text'>
              <div className='errorBox'>Oeps, er ging iets verkeerd bij het starten van de tijdmachine. {errorReason}</div>
            </div>}

            <h2 className='content__title'>{naam}</h2>
            {hasName && <button onClick={() => this.retry()}>Probeer Opnieuw</button>}
            {!hasName && <form onSubmit={this.fetchGender}>
              <p className='content__text'>Jouw naam in de tijd van René Descartes.</p>
              <Styled.FlagContainer>
                <Styled.FlagItem
                  onClick={() => this.switchLanguage('dutch')}
                  isSelected={!this.state.isFrench}
                  src='../OudHollandseNamen/img/dutch_flag.svg'
                  alt=''/>
                <Styled.FlagItem
                  onClick={() => this.switchLanguage('french')}
                  isSelected={this.state.isFrench}
                  src='../OudHollandseNamen/img/french_flag.png'
                  alt=''/>
              </Styled.FlagContainer>
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