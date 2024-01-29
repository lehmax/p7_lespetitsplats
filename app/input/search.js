export const searchInput = () => {
  const formSearch = document.getElementById('form-search')
  const inputSearch = formSearch.querySelector('input[type="search"]')
  const state = { value: '' }

  const onSearch = (event) => {
    event.preventDefault()
    const isSameSearch = inputSearch.value?.trim() === state.value

    if (isSameSearch) {
      return
    }

    state.value = inputSearch.value.trim()

    const isInvalid = state.value.length < 3
    formSearch.classList.toggle('error', isInvalid)

    formSearch.dispatchEvent(
      new Event('searchRecipes', {
        bubbles: true,
        cancelable: true
      })
    )
  }

  formSearch.addEventListener('submit', onSearch)

  return state
}
