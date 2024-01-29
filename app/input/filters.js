import { createElement } from '../utils/dom.js'
import { toSentenceCase } from '../utils/string.js'

export const createFilters = (recipes) => {
  const ingredientsFilter = document.getElementById('ingredients-filter')
  const appliancesFilter = document.getElementById('appliances-filter')
  const ustensilsFilter = document.getElementById('ustensils-filter')

  const { ingredientsKeyWords, appliancesKeyWords, ustensilsKeyWords } =
    getKeyWords(recipes)

  return {
    ingredients: keyWordFilter(
      'ingredients',
      ingredientsKeyWords,
      ingredientsFilter
    ),
    appliances: keyWordFilter(
      'appliances',
      appliancesKeyWords,
      appliancesFilter
    ),
    ustensils: keyWordFilter('ustensils', ustensilsKeyWords, ustensilsFilter)
  }
}

const getKeyWords = (recipes) => {
  const keywords = recipes.reduce(
    (keywords, recipe) => {
      const { appliance, ustensils, ingredients } = recipe
      const { ingredientsKeyWords, appliancesKeyWords, ustensilsKeyWords } =
        keywords

      ingredients.forEach((item) => {
        const ingredientKW = toSentenceCase(item.ingredient)

        if (!ingredientsKeyWords.includes(ingredientKW)) {
          ingredientsKeyWords.push(ingredientKW)
        }
      })

      const applianceKW = toSentenceCase(appliance)

      if (!appliancesKeyWords.includes(applianceKW)) {
        appliancesKeyWords.push(applianceKW)
      }

      ustensils.forEach((ustensil) => {
        const ustensilKW = toSentenceCase(ustensil)

        if (!ustensilsKeyWords.includes(ustensilKW)) {
          ustensilsKeyWords.push(ustensilKW)
        }
      })

      return keywords
    },
    {
      ingredientsKeyWords: [],
      appliancesKeyWords: [],
      ustensilsKeyWords: []
    }
  )

  for (const key in keywords) {
    keywords[key] = keywords[key].sort((kw1, kw2) =>
      kw1.localeCompare(kw2, 'fr', { ignorePunctuation: true })
    )
  }

  return keywords
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
    const clonedButton = buttonDropdown.cloneNode(true)
    clonedButton.addEventListener('click', handleDropdown)
    buttonDropdown.replaceWith(clonedButton)

    keyWordList.innerHTML = ''

    if (keywords.length === 0) {
      keyWordList.innerHTML =
        '<div class="px-4 py-2 text-sm">Aucun résultat.</div>'
    }

    keywords.forEach((keyword, index) => {
      const option = createOption(keyword, index)
      keyWordList.appendChild(option)
    })

    filter.addEventListener('submit', filterOptions)
  }

  const updateOptions = () => {}

  const handleDropdown = (event) => {
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
      keyWordList.insertAdjacentHTML(
        'beforeend',
        '<div class="no-result px-4 py-2 text-sm">Aucun résultat.</div>'
      )
    }
  }

  const createOption = (option, index) => {
    const optionElement = createElement('div', {
      'data-id': `${name}-${index}`,
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
    addTag(target)
    state.value.push(target.innerText.trim().toLowerCase())

    sendChange()
  }

  const onRemoveOption = (event) => {
    const { target } = event

    const tag = keyWordsTags.querySelector(
      `[data-id=${target.getAttribute('data-id')}]`
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
    const event = new Event('searchRecipes', {
      bubbles: true,
      cancelable: true
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

  const addTag = (option) => {
    const tag = createElement('div', {
      'data-id': `${option.getAttribute('data-id')}`,
      class:
        'cursor-pointer flex items-center px-4 py-4 rounded-sm gap-x-4 bg-yellow lg:gap-x-14'
    })

    const innerTag = `
      <span class="text-sm">${option.innerText}</span>
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
