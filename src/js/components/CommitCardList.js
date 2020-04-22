import githubApi from '../modules/GithubApi'
import CommitCard from './CommitCard'

class CommitCardList {
  constructor(container) {
    this.container = container
    this.cards = []

    this.getCards()
    
  }

  render() {
    this.cards.forEach(item => {
      let card = new CommitCard(item)
      this.container.insertAdjacentHTML('afterbegin', card.create())
    })
  }

  getCards() {
    githubApi.getCommits()
    .then(res => {
      res.forEach(item => {
        this.cards.push(item)
      })

      this.render()
      
      const Flickity = require('flickity')
      let flkty = new Flickity('.results__slider', {
        cellAlign: 'center',
        contain: true,
        wrapAround: true,
        groupCells: true
      })
    })
    .catch(err => console.log(err))
  }
}

export default CommitCardList