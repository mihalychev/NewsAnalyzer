import formatDate from '../utils/formatDate'
import sanitizeHTML from '../utils/sanitizeHTML'

class CommitCard {
  constructor(data) {
    this.data = data
  }
  
  create() {
    return `
    <article class="results__card results__card_slider-cell">
      <p class="results__date">${sanitizeHTML(formatDate(this.data.commit.committer.date))}</p>
      <div class="results__info">
        <img src="${this.data.author.avatar_url}" alt="photo" class="results__user-photo">
        <div class="container">
          <h4 class="results__card-title results__card-title_slider-cell">${sanitizeHTML(this.data.commit.committer.name)}</h4>
          <p class="results__email">${sanitizeHTML(this.data.commit.committer.email)}</p>
        </div>
      </div>
      <p class="results__text">${sanitizeHTML(this.data.commit.message)}</p>
    </article>
    `
  }
}

export default CommitCard