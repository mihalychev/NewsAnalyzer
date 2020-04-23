import formatDate from '../utils/formatDate'
import sanitizeHTML from '../utils/sanitizeHTML'

class NewsCard {
  constructor(data) {
    this.data = data
  }
  
  create() {
    return `
      <a href="${this.data.url}" target='_blank' class="results__card">
        <div style="background-image: url(${this.data.urlToImage != null ? this.data.urlToImage : 'https://i.redd.it/s8lk86v3r2m11.png'})" class="results__img"></div>
        <div class="results__card-content">
          <p class="results__date">${sanitizeHTML(formatDate(this.data.publishedAt))}</p>
          <h4 class="results__card-title">${sanitizeHTML(this.data.title)}</h4>
          <p class="results__text">${sanitizeHTML(this.data.description)}</p>
          <h5 class="results__site">${sanitizeHTML(this.data.source.name)}</h5>
        </div>
      </a>
    `
  }
}

export default NewsCard