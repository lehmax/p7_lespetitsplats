/**
 * Converts a string to sentence case.
 * @param {string} string - The input string.
 * @returns {string} The string converted to sentence case.
 */
export const toSentenceCase = (string) => {
  return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1)
}
