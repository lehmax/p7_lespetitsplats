import { recipes } from './data/recipes.js'
import { createRecipe } from './domain/recipe.js'

console.table(recipes)

if (recipes.length > 0) {
  const recipesContainer = document.getElementById('recipes')

  recipes.forEach((recipe) => {
    const recipeElement = createRecipe(recipe).getElement()
    recipesContainer.insertAdjacentHTML('beforeend', recipeElement)
  })
}
