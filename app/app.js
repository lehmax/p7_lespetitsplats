import { recipes } from './data/recipes.js'
import { createFilters } from './input/filters.js'
import { searchInput } from './input/search.js'
import { searchRecipesByKeyWords, searchRecipesByText } from './search.js'
import { createRecipe } from './template/recipe.js'

const app = (initRecipes) => {
  const noRecipe = !initRecipes || initRecipes.length === 0

  if (noRecipe) {
    console.error('No recipes found')
    return
  }

  const state = {
    inputText: {},
    inputFilters: {},
    recipes: initRecipes
  }

  const init = () => {
    const recipes = state.recipes

    updateRecipeCounter(recipes.length)
    updateRecipesList(recipes)
    state.inputText = searchInput()
    state.inputFilters = createFilters(recipes)

    document.addEventListener('searchRecipes', onSearch)
  }

  const onSearch = ({ detail }) => {
    toggleNoResultsMessage(false)
    search()
    updateRecipesList()
    updateRecipeCounter()
    // if (type === 'reset' || type === 'text') {
    //   createFilters(recipes)
    // }
    toggleNoResultsMessage(state.recipes.length === 0, state.inputText.value)
  }

  const search = () => {
    const { inputText, inputFilters, recipes: filteredRecipes } = state

    const isSomeFiltersSelected = Object.keys(inputFilters).some((key) => {
      return inputFilters[key].state.value.length !== 0
    })

    const isTextSearch = inputText.value.length >= 3

    let list = isSomeFiltersSelected ? filteredRecipes : initRecipes

    if (isTextSearch) {
      list = searchRecipesByText(inputText.value, list)
    }

    if (isSomeFiltersSelected) {
      list = searchRecipesByKeyWords(inputFilters, list)
    }

    state.recipes = list
  }

  const updateRecipesList = () => {
    const recipesContainer = document.getElementById('recipes')

    recipesContainer.innerHTML = state.recipes
      .map((recipe) => {
        return createRecipe(recipe).getHTML()
      })
      .join('')
  }

  const updateRecipeCounter = () => {
    const counter = document.getElementById('recipes-counter')
    const total = state.recipes.length
    counter.innerText = `${total} ${total > 1 ? 'recettes' : 'recette'}`
  }

  const toggleNoResultsMessage = (token, value = '') => {
    const messageContainer = document.getElementById('message')
    messageContainer.querySelector('strong').innerText = token ? value : ' '
    messageContainer.classList.toggle('hidden', !token)
  }

  return {
    init
  }
}

app(recipes).init()
