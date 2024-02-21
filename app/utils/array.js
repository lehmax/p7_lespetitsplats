/**
 * Sorts an array alphabetically.
 *
 * @param {Array} array - The array to be sorted.
 * @returns {Array} - The sorted array.
 */
export const sortArrayAlphabeticaly = (array, locale = 'fr') => {
  return array.toSorted((stringA, stringB) =>
    stringA.localeCompare(stringB, locale, { ignorePunctuation: true })
  )
}
