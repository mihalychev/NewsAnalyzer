import './css/about.css'
const Flickity = require('flickity')

let flkty = new Flickity('.results__slider', {
  cellAlign: 'center',
  contain: true,
  wrapAround: true,
  groupCells: true
})

console.log(Flickity)