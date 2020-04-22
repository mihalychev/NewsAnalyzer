import NewsCard from './NewsCard'
import SearchInput from './SearchInput'
import NewsApi from '../modules/NewsApi'
import storage from '../modules/DataStorage'
import loading from '../utils/loading'

import { NUMBER_OF_CARDS_IN_RENDER } from '../constants/constants'

class NewsList {
  constructor(container) {
    this.container = container
    this.cards = []

    if (!storage.emptyCheck()) {
      storage.getCards().forEach(item => this.cards.push(new NewsCard(item)))
    }

    this.cardsOnPage = 0
    this.searchKey = ''
    this.searchInput = new SearchInput(this.formSubmit.bind(this))

    if (this.cards.length != 0) {
      this.render()
      document.querySelector('.results__content').classList.remove('hidden')
    }

    this._setHandlers();
  }

  render() {
    let numberOfCards = this.cardsOnPage
    while (this.cardsOnPage < numberOfCards + NUMBER_OF_CARDS_IN_RENDER) {
      if (this.cardsOnPage == this.cards.length) {
        document.querySelector('.results__more-btn').classList.add('hidden')
        break
      }
      this.container.insertAdjacentHTML('beforeend', this.cards[this.cardsOnPage].create())
      this.cardsOnPage++
    }

    if (this.cardsOnPage == this.cards.length) {
      document.querySelector('.results__more-btn').classList.add('hidden')
    }
  }

  initializeCards() {
    const api = new NewsApi({
      url: 'https://newsapi.org/v2/everything',
      key: 'eb4321ba7c90488f94bc3073b3c31c22',
      searchKey: this.searchKey
    })

    api.getNews()
    .then(res => {
      if (res.articles.length == 0) {
        loading(false, false)
        return null
      }

      storage.setData(res)

      res.articles.forEach(item => {
        this.cards.push(new NewsCard(item))
      })

      this.render()
      loading(false)
    })
    .catch(err => console.log(err))
  }

  formSubmit(event) {
    event.preventDefault()
    this.cardsOnPage = 0
    this.cards = []
    document.querySelector('.not-found').classList.add('hidden')
    document.querySelector('.results__more-btn').classList.remove('hidden')
    loading(true)
    this.container.textContent = ''
    this.searchKey = document.forms.search.searchInput.value
    storage.setQuestion(this.searchKey)
    this.initializeCards()
  }

  _setHandlers() {
    document.querySelector('.results__more-btn').addEventListener('click', () => this.render())
  }
}

export default NewsList