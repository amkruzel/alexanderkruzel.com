import { newElement } from "../helperFunctions.js"

const makeProjectsSection = () => {

  const projContainer = newElement('div', 'section-container')
  const projHeader    = newElement('div', 'section-header')

  const webDevSection = newElement('div', 'proj-section')
  const rubySection   = newElement('div', 'proj-section')
  const funcSection   = newElement('div', 'proj-section')
  //const miscSection   = newElement('div', 'proj-section')

  const webDevHeader = newElement('div', 'proj-section-header')
  const rubyHeader   = newElement('div', 'proj-section-header')
  const funcHeader   = newElement('div', 'proj-section-header')
  //const miscHeader   = newElement('div', 'proj-section-header')

  projHeader.textContent = 'Projects'

  webDevHeader.textContent = 'Web Development'
  rubyHeader.textContent   = 'Ruby / command line games'
  funcHeader.textContent   = 'Functional Programming'
  //miscHeader.textContent   = 'Other'

  const playChess = createOneProject(
    'Play Chess', 
    'https://github.com/amkruzel/playchess',
    'https://playchess.page')

  const toDoList = createOneProject(
    'To-Do List', 
    'https://github.com/amkruzel/todo-list',
    'https://amkruzel.github.io/todo-list/')

  const adminDashboard = createOneProject(
    'Admin Dashboard', 
    'https://github.com/amkruzel/admin-dashboard',
    'https://amkruzel.github.io/admin-dashboard/')

  const connectFour = createOneProject(
    'Connect Four', 
    'https://github.com/amkruzel/connect_four')    

  const hangman = createOneProject(
    'Hangman', 
    'https://github.com/amkruzel/hangman',
    'https://replit.com/@amkruzel/hangman#.replit')

  const mastermind = createOneProject(
    'Mastermind', 
    'https://github.com/amkruzel/mastermind',
    'https://replit.com/@amkruzel/mastermind#.replit')

  const aoc2022 = createOneProject(
    'Advent of Code 2022',
    'https://github.com/amkruzel/adventofcode2022'
  )

  webDevSection.append(
    webDevHeader,
    playChess,
    toDoList,
    adminDashboard)

  rubySection.append(
    rubyHeader,
    connectFour,
    hangman,
    mastermind)

  funcSection.append(
    funcHeader,
    aoc2022)

  //miscSection.append(miscHeader)

  projContainer.append(
    projHeader,
    webDevSection,
    rubySection,
    funcSection)

  return projContainer
}

const createOneProject = (item, l1, l2) => {

  const l2defined = l2 != null

  const githubHTML     = '<u>github</u> <span style="font-size:10px;">⤻</span>'
  const directLinkHTML = 
    l2defined 
  ? '<u>direct link</u> <span style="font-size:10px;">⤻</span>' 
  : ''

  const container  = newElement('div', 'proj-item')
  const name       = newElement('div', 'proj-item-name')

  const link1      = newElement('a')
  const link2      = newElement('a')

  link1.setAttribute('target', '_blank')
  link2.setAttribute('target', '_blank')

  name.textContent = item

  link1.innerHTML = githubHTML
  link2.innerHTML = l2defined ? directLinkHTML : ''

  link1.href = l1
  link2.href = l2defined ? l2 : ''

  const blank = newElement('span')

  container.append(
    name,
    link1,
    blank,
    link2
  )

  return container
}

export { makeProjectsSection }