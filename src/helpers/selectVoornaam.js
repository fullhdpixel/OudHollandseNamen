import {similarity} from './similarity'

export function selectVoornaam(voornaam, collection) {
  // Calculate simularities between voornaam and all in men/women
  let value = 0 // initial
  let highestIndex = 0 // index of highest value

  collection.forEach((name, index) => {
    const test = similarity(voornaam, name)
    if (test > value) {
      value = test
      highestIndex = index
    }
  })

  return collection[highestIndex]
}
