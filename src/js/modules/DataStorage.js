class DataStorage {
  setData(data) {
    localStorage.setItem('data', JSON.stringify(data))
  }

  emptyCheck() {
    if (localStorage.getItem('data') == null) return true
    else return false
  }

  setQuestion(question) {
    localStorage.setItem('question', question)
  }

  getQuestion() {
    return localStorage.getItem('question')
  }

  getTotalResults() {
    return JSON.parse(localStorage.getItem('data')).totalResults
  }

  getCards() {
    return JSON.parse(localStorage.getItem('data')).articles
  }
}

const storage = new DataStorage()
export default storage