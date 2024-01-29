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

    const matchInIngredients = selectedIngredients.length
      ? ingredients.some(({ ingredient }) => {
          return selectedIngredients.includes(ingredient.toLowerCase())
        })
      : true

    const matchInAppliance = selectedAppliances.length
      ? selectedAppliances.includes(appliance.toLowerCase())
      : true

    const matchInUstensils = selectedUstensils.length
      ? ustensils.some((ustensil) => {
          return selectedUstensils.includes(ustensil.toLowerCase())
        })
      : true

    return matchInIngredients && matchInAppliance && matchInUstensils
  })
}
