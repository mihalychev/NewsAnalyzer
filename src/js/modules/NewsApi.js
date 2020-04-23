class NewsApi {
  constructor(options) {
    this.url = options.url
    this.apiKey = options.key
    this.searchKey = options.searchKey
  }

  getNews() {
    return fetch(`${this.url}?language=ru&q=${this.searchKey}&from=${this.searchFromDate()}&sortBy=publishedAt&pageSize=100&apiKey=${this.apiKey}`)
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  searchFromDate() {
    let ourDate = new Date()

    let pastDate = ourDate.getDate() - 6
    ourDate.setDate(pastDate)

    let year = ourDate.getFullYear()
    let month = ourDate.getMonth() + 1 < 10 ? '0' + (ourDate.getMonth() + 1) : ourDate.getMonth() + 1
    let day = ourDate.getDate() < 10 ? '0' + ourDate.getDate() : ourDate.getDate()

    return(`${year}-${month}-${day}`)
  }
}

export default NewsApi