export const searchRecipesByText = (value, recipes) => {
  return recipes.filter(({ name, ingredients, description }) => {
    const lowValue = value.trim().toLowerCase()

    const matchInName = name.toLowerCase().includes(lowValue)
    const matchInDescription = description.toLowerCase().includes(lowValue)

    const matchInIngredients = ingredients.some(({ ingredient }) => {
      return ingredient.toLowerCase().includes(lowValue)
    })

    return matchInName || matchInDescription || matchInIngredients
  })
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
