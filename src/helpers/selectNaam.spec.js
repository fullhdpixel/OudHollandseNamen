import {expect} from 'chai'

import {selectNaam} from './selectNaam.js'

import mannen from '../../databank/voornamen/mannen'
import vrouwen from '../../databank/voornamen/vrouwen'
import achternamen from '../../databank/achternamen'

describe('selectNaam()', function () {  
  it('#can select voornaam (Male)', function() {
    const result = selectNaam('Gerard', mannen)
    expect(result).to.equal('Gerardus')
  })

  it('#can select voornaam (Female)', function() {    
    const result = selectNaam('Liselotte', vrouwen)
    expect(result).to.equal('Neeltje')
  })

  it('#can select achternaam (1)', function() {
    const result = selectNaam('de Vliet', achternamen)
    expect(result).to.equal('de Boij')
  })

  it('#can select achternaam (2)', function() {    
    const result = selectNaam('Kanter', achternamen)
    expect(result).to.equal('Sanders')
  })
})