import {similarity} from './similarity'

export function selectAchternaam(achternaam, collection) {
  // Calculate simularities between achternaam and collection
  let value = 0 // initial
  let highestIndex = 0 // index of highest value

  collection.forEach((name, index) => {
    const test = similarity(achternaam, name)
    if (test > value) {
      value = test
      highestIndex = index
    }
  })

  return collection[highestIndex]
}
