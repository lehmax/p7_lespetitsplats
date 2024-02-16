export const searchInput = () => {
  const formSearch = document.getElementById('form-search')
  const inputSearch = formSearch.querySelector('input[type="search"]')
  const state = { value: '' }

  const invalidMsg = `
    <span
      class="absolute
      left-0 py-2 text-xs
      font-bold text-white
      border-2 rounded bg-rose-500
      px-9 -bottom-12 invalid
     border-rose-500"
    >
      Veuillez saisir au moins 3 caractères
    </span>
  `

  const onSearch = (event) => {
    event.preventDefault()
    const isSameSearch = inputSearch.value?.trim() === state.value

    if (isSameSearch) {
      return
    }

    state.value = inputSearch.value.trim()
    formSearch.classList.remove('error')
    if (inputSearch.nextElementSibling) {
      inputSearch.nextElementSibling.remove()
    }

    const isInvalid = state.value.length < 3
    if (isInvalid) {
      formSearch.classList.add('error')
      inputSearch.insertAdjacentHTML('afterend', invalidMsg)
    }

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
