import {expect} from 'chai'

import {selectVoornaam} from './selectVoornaam.js'

import mannen from '../../databank/voornamen/mannen'
import vrouwen from '../../databank/voornamen/vrouwen'

describe('selectVoornaam()', function () {  
  it('#can select voornaam (Male)', function() {
    const result = selectVoornaam('Thijs', mannen)
    expect(result).to.equal('Matthijs')
  })

  it('#can select voornaam (Female)', function() {    
    const result = selectVoornaam('Liselotte', vrouwen)
    expect(result).to.equal('Neeltje')
  })
})