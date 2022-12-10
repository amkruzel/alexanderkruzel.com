import { newElement } from "../helperFunctions.js"

const makeContactSection = () => {

  const contactContainer = newElement('div', 'section-container')
  const contactHeader    = newElement('div', 'section-header')

  const contactSection = newElement('div', 'proj-section')

  const contactSectionEmail    = newElement('a', 'contact-link')
  const contactSectionGithub   = newElement('a', 'contact-link')
  const contactSectionLinkedin = newElement('a', 'contact-link')

  contactHeader.textContent = 'Contact'

  contactSectionEmail.textContent    = 'email'
  contactSectionGithub.textContent   = 'github'
  contactSectionLinkedin.textContent = 'linkedin'

  contactSectionEmail.href    = 'mailto: kruzelm.alex@gmail.com'
  contactSectionGithub.href   = 'https://github.com/amkruzel'
  contactSectionLinkedin.href = 'https://www.linkedin.com/in/alexander-kruzel-801370203/'

  contactSectionEmail.setAttribute('target', '_blank')
  contactSectionGithub.setAttribute('target', '_blank')
  contactSectionLinkedin.setAttribute('target', '_blank')

  contactSection.append(
    contactSectionEmail,
    contactSectionGithub,
    contactSectionLinkedin
  )

  contactContainer.append(
    contactHeader,
    contactSection)

  return contactContainer
}

export { makeContactSection }