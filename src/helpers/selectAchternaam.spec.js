import {expect} from 'chai'

import {selectAchternaam} from './selectAchternaam.js'
import achternamen from '../../databank/achternamen'

describe('selectAchternaam()', function () {  
  it('#can select achternaam (1)', function() {
    const result = selectAchternaam('de Vliet', achternamen)
    expect(result).to.equal('de Boij')
  })

  it('#can select achternaam (2)', function() {    
    const result = selectAchternaam('Kanter', achternamen)
    expect(result).to.equal('Sanders')
  })
})