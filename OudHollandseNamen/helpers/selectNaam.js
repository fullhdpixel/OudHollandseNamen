import {similarity} from './similarity'

export function selectNaam(naam, collection) {
  // Calculate simularities between naam and all in men/women
  let value = 0 // initial
  let highestIndex = 0 // index of highest value

  collection.forEach((name, index) => {
    const test = similarity(naam, name)
    if (test > value) {
      value = test
      highestIndex = index
    }
  })

  return collection[highestIndex]
}
