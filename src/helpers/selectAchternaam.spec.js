import {expect} from 'chai'

import {selectAchternaam} from './selectAchternaam.js'
import achternamen from '../../databank/achternamen'

describe('selectAchternaam()', function () {  
  it('#can select achternaam (1)', function() {
    const result = selectAchternaam('Smudde', achternamen)
    expect(result).to.equal('Amede')
  })

  it('#can select achternaam (2)', function() {    
    const result = selectAchternaam('den Hartog', achternamen)
    expect(result).to.equal('ter Maet')
  })
})