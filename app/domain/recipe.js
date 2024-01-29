/**
 * Creates a recipe object with the provided properties.
 * @param {Object} recipeData - The data for the recipe.
 * @param {string} recipeData.id - The ID of the recipe.
 * @param {string} recipeData.image - The image URL of the recipe.
 * @param {string} recipeData.name - The name of the recipe.
 * @param {number} recipeData.servings - The number of servings for the recipe.
 * @param {Array<Object>} recipeData.ingredients - The list of ingredients for the recipe.
 * @param {string} recipeData.ingredients[].ingredient - The name of the ingredient.
 * @param {number} recipeData.ingredients[].quantity - The quantity of the ingredient.
 * @param {string} recipeData.ingredients[].unit - The unit of measurement for the ingredient.
 * @param {number} recipeData.time - The cooking time in minutes.
 * @param {string} recipeData.description - The description of the recipe.
 * @param {string} recipeData.appliance - The appliance required for the recipe.
 * @param {Array<string>} recipeData.ustensils - The list of utensils required for the recipe.
 * @returns {Object} - The recipe object.
 */
export const createRecipe = ({
  id,
  image,
  name,
  servings,
  ingredients,
  time,
  description,
  appliance,
  ustensils
}) => {
  const getIngredients = () => {
    return ingredients
      .map(({ ingredient, quantity, unit }) => {
        return `
          <div>
            <dt>${ingredient}</dt>
            <dd>${quantity || ''} ${unit || ''}</dd>
          </div>`
      })
      .join('')
  }

  const getElement = () => {
    return `
      <article class="w-full bg-white rounded-lg md:max-w-380">
        <div class="relative">
          <img
            src="./assets/images/recipes/${image}"
            alt="Photo de la recette"
            class="w-full rounded-t-lg object-cover h-64"
          />
          <span
            class="absolute top-5 right-5 z-0 rounded-md bg-yellow px-4 py-1.5 text-xs"
            >${time}min</span
          >
        </div>
        <div class="px-6 py-8">
          <h3 class="text-xl font-heavy">${name}</h3>
          <div class="mt-9">
            <h4 class="uppercase text-md text-gray">recette</h4>
            <p class="mt-4">
              ${description}
            </p>
          </div>
          <div class="mt-9">
            <h5 class="uppercase text-md text-gray">ingrédient</h5>
            <dl class="grid grid-cols-2 my-4 gap-y-5 gap-x-20">${getIngredients()}</dl>
          </div>
        </div>
      </article>
    `
  }

  return {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
    getElement
  }
}
