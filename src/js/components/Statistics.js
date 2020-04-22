import storage from '../modules/DataStorage'

import { DAYS } from '../constants/constants'

class Statistics {
  constructor() {
    document.querySelector('#question').textContent = storage.getQuestion()
    document.querySelector('#total').textContent = storage.getTotalResults()
    document.querySelector('#mentions').textContent = this.getMentionsInTitle()

    this.mentions = this.getMentionsInTitle() + this.getMentionsInDescription()

    document.querySelectorAll('#fourth').forEach(item => item.textContent = Math.floor( this.mentions / 4 ))
    document.querySelectorAll('#half').forEach(item => item.textContent = Math.floor( this.mentions / 2 ))
    document.querySelectorAll('#threeFourth').forEach(item => item.textContent = Math.floor( this.mentions * 3 / 4 ))
    document.querySelectorAll('#all').forEach(item => item.textContent = this.mentions)

    this.setProgress()
    this.getDays()
  }

  getMentionsInTitle() {
    const news = storage.getCards()
    let mentions = 0

    news.forEach(item => {
      if (item.title != null) {
        if (item.title.includes(storage.getQuestion())) mentions += 1
      }
    })

    return mentions
  }

  getMentionsInDescription() {
    const news = storage.getCards()
    let mentions = 0

    news.forEach(item => {
      if (item.description != null) {
        if (item.description.includes(storage.getQuestion())) mentions += 1
      }
    })

    return mentions
  }

  setProgress() {
    document.querySelectorAll('.analytics__bar-container').forEach((item, index) => {
      let bar = item.querySelector('.analytics__bar')

      const resultsByDays = this.getResultsByDays()

      bar.max = this.mentions
      bar.value = resultsByDays[6 - index]

      item.querySelector('.analytics__percentage').textContent = resultsByDays[6 - index]
    })
  }

  getDays() {
    let currentDay = new Date().getDate()
    let currentWeekDay = new Date().getDay()
    document.querySelectorAll('#date').forEach((item, index) => {
      let weekDay = 0
      if (currentWeekDay - (6 - index) < 0) {
        weekDay = 7 + currentWeekDay - (6 - index)
      } else {
        weekDay = currentWeekDay - (6 - index)
      }

      item.textContent = `${currentDay - 6 + index}, ${DAYS[weekDay]}`
    })
  }

  getResultsByDays() {
    const results = [[], [], [], [], [], [], []]

    storage.getCards().forEach(item => {
      let currentDay = new Date().getDate()
      let day = +item.publishedAt.slice(8, 10)
      results[currentDay - day].push(item)
    })

    return results.map(item => {
      if (item.length != 0) {
        let count = 0
        item.forEach((value) => {
          if (value.description != null && value.title != null) {
            if (value.description.includes(storage.getQuestion())) count += 1
            if (value.title.includes(storage.getQuestion())) count += 1
          }
        })
        return count
      } else {
        return 0
      }
      
    })
  }
}

export default Statistics