export const searchRecipesByText = (value, recipes) => {
  let recipesFiltered = []
  const lowValue = value.trim().toLowerCase()

  for (let step = 0; step < recipes.length; step++) {
    const { name, ingredients, description } = recipes[step]

    const matchInName = name.toLowerCase().includes(lowValue)

    if (matchInName) {
      recipesFiltered = [...recipesFiltered, recipes[step]]
      continue
    }

    const matchInDescription = description.toLowerCase().includes(lowValue)
    if (matchInDescription) {
      recipesFiltered = [...recipesFiltered, recipes[step]]
      continue
    }

    let matchInIngredients = false
    for (let step = 0; step < ingredients.length; step++) {
      const { ingredient } = ingredients[step]
      if (ingredient.toLowerCase().includes(lowValue)) {
        matchInIngredients = true
        break
      }
    }

    if (matchInIngredients) {
      recipesFiltered = [...recipesFiltered, recipes[step]]
      continue
    }
  }

  return recipesFiltered
}

export const searchRecipesByKeyWords = (filters, recipes) => {
  return recipes.filter(({ ingredients, appliance, ustensils }) => {
    const { value: selectedIngredients } = filters.ingredients.state
    const { value: selectedAppliances } = filters.appliances.state
    const { value: selectedUstensils } = filters.ustensils.state

    let matchInIngredients = true
    let matchInUstensils = true
    let matchInAppliance = true

    if (selectedIngredients.length > 0) {
      matchInIngredients = selectedIngredients.every((selection) =>
        ingredients
          .map(({ ingredient }) => ingredient.toLowerCase())
          .includes(selection)
      )
    }

    if (selectedAppliances.length > 0) {
      matchInAppliance = selectedAppliances.includes(appliance.toLowerCase())
    }

    if (selectedUstensils.length > 0) {
      matchInUstensils = selectedUstensils.every((selection) =>
        ustensils.map((ustensil) => ustensil.toLowerCase()).includes(selection)
      )
    }

    return matchInIngredients && matchInAppliance && matchInUstensils
  })
}
