class SearchInput {
  constructor(callback) {
    this._setHandlers(callback)
  }

  _setHandlers(callback) {
    document.forms.search.addEventListener('submit', event => {
      const input = document.forms.search.elements.searchInput
      if (input.value < 1) alert('Заполните поле ввода!') 
      else callback(event)
    })
    
  }

  checkValidity(input) {
    if (input.validity.tooShort) {
      
      return false;
    }
  }
}

export default SearchInput