import { filterType } from '../app.js'
import { sortArrayAlphabeticaly } from '../utils/array.js'
import { createElement } from '../utils/dom.js'
import { toSentenceCase } from '../utils/string.js'

export const createFilters = (recipes) => {
  const ingredientsFilter = document.getElementById('ingredients-filter')
  const appliancesFilter = document.getElementById('appliances-filter')
  const ustensilsFilter = document.getElementById('ustensils-filter')
  const keyWords = createKeyWords(recipes)

  return {
    ingredients: keyWordFilter(
      'ingredients',
      keyWords.ingredients(),
      ingredientsFilter
    ),
    appliances: keyWordFilter(
      'appliances',
      keyWords.appliances(),
      appliancesFilter
    ),
    ustensils: keyWordFilter('ustensils', keyWords.ustensils(), ustensilsFilter)
  }
}

const createKeyWords = (recipes) => {
  const ingredients = () => {
    const ingredients = recipes.reduce((ingredients, { ingredients: ings }) => {
      ings.forEach(({ ingredient }) => {
        const ingredientKW = toSentenceCase(ingredient)

        if (!ingredients.includes(ingredientKW)) {
          ingredients.push(ingredientKW)
        }
      })

      return ingredients
    }, [])

    return sortArrayAlphabeticaly(ingredients)
  }

  const appliances = () => {
    const appliances = recipes.reduce((appliances, { appliance }) => {
      const applianceKW = toSentenceCase(appliance)

      if (!appliances.includes(applianceKW)) {
        appliances.push(applianceKW)
      }

      return appliances
    }, [])

    return sortArrayAlphabeticaly(appliances)
  }

  const ustensils = () => {
    const ustensils = recipes.reduce((ustensils, { ustensils: ustls }) => {
      ustls.forEach((ustensil) => {
        const ustensilKW = toSentenceCase(ustensil)

        if (!ustensils.includes(ustensilKW)) {
          ustensils.push(ustensilKW)
        }
      })

      return ustensils
    }, [])

    return sortArrayAlphabeticaly(ustensils)
  }

  return {
    ingredients,
    appliances,
    ustensils
  }
}

const keyWordFilter = (name, keywords, element) => {
  const state = {
    value: []
  }

  if (element instanceof HTMLElement === false) {
    return
  }

  const keyWordList = element.querySelector('.keywords-list')
  const activeKeywordList = element.querySelector('.active-keywords-list')
  const keyWordsTags = document.getElementById('keywords-tags')
  const buttonDropdown = element.querySelector('button')
  const filter = element.querySelector('form')

  const init = () => {
    buttonDropdown.addEventListener('click', onButtonDropdown)

    keyWordList.innerHTML = ''

    keywords.forEach((keyword) => {
      const option = createOption(keyword)
      keyWordList.appendChild(option)
    })

    filter.addEventListener('submit', filterOptions)
  }

  const onButtonDropdown = (event) => {
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
      if (dropdown !== event.target.nextElementSibling) {
        dropdown.classList.add('hidden')
      }
    })

    const isExpanded = event.target.getAttribute('aria-expanded') === 'true'
    const dropdown = event.target.nextElementSibling
    dropdown.classList.toggle('hidden')
    event.target.setAttribute('aria-expanded', !isExpanded)
  }

  const filterOptions = (event) => {
    event.preventDefault()

    keyWordList.querySelector('.no-result')?.remove()
    const input = event.target.querySelector('input')
    const value = input.value.trim().toLowerCase()
    const options = keyWordList.querySelectorAll('[role="option"]')

    let isResult = false

    options.forEach((option) => {
      const text = option.innerText.toLowerCase()
      const isMatch = text.includes(value)
      option.classList.toggle('hidden', !isMatch)

      if (isMatch) {
        isResult = true
      }
    })

    if (!isResult) {
      displayNoResults()
    }
  }

  const updateOptions = (recipes) => {
    filter.reset()
    keyWordList.innerHTML = ''

    const keywords = createKeyWords(recipes)[name]()
    const notSelectedKeywords = keywords.filter(
      (keyword) => !state.value.includes(keyword.toLowerCase())
    )

    if (keywords.length === 0) {
      displayNoResults()
    }

    notSelectedKeywords.forEach((keyword) => {
      const option = createOption(keyword)
      keyWordList.appendChild(option)
    })
  }

  const displayNoResults = () => {
    if (keyWordList.querySelector('.no-result') === null) {
      keyWordList.insertAdjacentHTML(
        'beforeend',
        '<div class="px-4 py-2 text-sm no-result">Aucun résultat.</div>'
      )
    }
  }

  const createOption = (option) => {
    const optionElement = createElement('div', {
      'data-id': `${option}`,
      class:
        'px-4 py-2 text-sm hover:bg-yellow hover:font-bold cursor-pointer flex justify-between items-center',
      'aria-selected': false,
      role: 'option'
    })

    optionElement.innerText = option
    optionElement.addEventListener('click', onAddOption)

    return optionElement
  }

  const onAddOption = (event) => {
    const { target } = event

    addOption(target)
    addTag(target.getAttribute('data-id'))
    state.value.push(target.innerText.trim().toLowerCase())

    sendChange()
  }

  const onRemoveOption = (event) => {
    const { target } = event

    const tag = keyWordsTags.querySelector(
      `[data-id="${target.getAttribute('data-id')}"]`
    )

    removeOption(target)
    removeTag(tag)
    removeSelectedKeywords(target)
    sendChange()
  }

  const onRemoveTag = (event) => {
    const { target } = event

    const option = activeKeywordList.querySelector(
      `[data-id="${target.getAttribute('data-id')}"]`
    )

    removeOption(option)
    removeTag(target)
    removeSelectedKeywords(target)
    sendChange()
  }

  const removeSelectedKeywords = (option) => {
    state.value = state.value.filter(
      (keyword) => keyword !== option.innerText.trim().toLowerCase()
    )
  }

  const sendChange = () => {
    const event = new CustomEvent('searchRecipes', {
      bubbles: true,
      cancelable: true,
      detail: { type: filterType.KEYWORDS }
    })

    element.dispatchEvent(event)
  }

  const addOption = (option) => {
    activeKeywordList.appendChild(option)
    option.setAttribute('aria-selected', true)
    option.removeEventListener('click', onAddOption)
    option.addEventListener('click', onRemoveOption)
    option.classList.add('active')
    option.insertAdjacentHTML(
      'beforeend',
      '<i class="pointer-events-none opacity-0 fa-solid fa-circle-xmark" aria-hidden="true"></i>'
    )
  }

  const addTag = (keyword) => {
    const tag = createElement('div', {
      'data-id': `${keyword}`,
      class:
        'cursor-pointer flex items-center px-4 py-4 rounded-sm gap-x-4 bg-yellow lg:gap-x-14'
    })

    const innerTag = `
      <span class="text-sm">${keyword}</span>
      <i class="pointer-events-none fa-solid fa-xmark fa-lg" aria-hidden="true"></i>
    `

    tag.innerHTML = innerTag
    tag.addEventListener('click', onRemoveTag)
    keyWordsTags.appendChild(tag)
  }

  const removeOption = (activeOption) => {
    keyWordList.insertAdjacentElement('afterbegin', activeOption)
    activeOption.setAttribute('aria-selected', false)
    activeOption.removeEventListener('click', onRemoveOption)
    activeOption.addEventListener('click', onAddOption)
    activeOption.classList.remove('active')
    activeOption.querySelector('i').remove()
  }

  const removeTag = (tag) => {
    tag.remove()
  }

  if (buttonDropdown) {
    init()
  }

  return {
    name,
    state,
    updateOptions
  }
}
