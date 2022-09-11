const newElement = (type, ...classes) => {
  const el = document.createElement(type)
  classes.forEach(cl => {
    el.classList.add(cl)
  })
  return el
}

const newElementWithQuantity = (qty, type, ...classes) => {
  let ret = {}
  for (let i = 1; i <= qty; ++i) {
    ret[i] = newElement(type, classes)
  }
  return ret
}

export { newElement, newElementWithQuantity }