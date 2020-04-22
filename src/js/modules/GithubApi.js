class GithubApi {
  constructor(option) {
    this.user = option.user
    this.repo = option.repo
  }

  getCommits() {
    return fetch(`https://api.github.com/repos/${this.user}/${this.repo}/commits`)
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(`Ошибка: ${res.status}`)
    })  
  }
}

const githubApi = new GithubApi({
  user: 'Simonion19',
  repo: 'NewsAnalyzer'
})

export default githubApi