/**
 * Creates a new DOM element with the specified tag name and attributes.
 *
 * @param {string} tagName - The tag name of the element to create.
 * @param {Object} [attributes={}] - The attributes to set on the element.
 * @param {Array} [children=[]] - The children of the element.
 * @returns {Element} The newly created element.
 */
export const createElement = (tagName, attributes, children = []) => {
  const element = document.createElement(tagName)

  if (attributes) {
    for (const [attribute, value] of Object.entries(attributes)) {
      if (value === null) {
        return element
      }

      element.setAttribute(attribute, value)
    }
  }

  children.forEach((child) => element.appendChild(child))

  return element
}
