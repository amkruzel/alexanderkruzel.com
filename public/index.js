
/* Firebase Function Imports */

// Complete documentation here - https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp }                     from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js'
import { getStorage, getDownloadURL, ref }   from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js'
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js'

// Function imports from local js files

import { newElement } from './helperFunctions.js'

// Other local js imports

import { makeProjectsSection } from './scripts/projects.js'
import { makeContactSection }  from './scripts/contact.js'

// Other imports

import lottieWeb from 'https://cdn.skypack.dev/lottie-web'

// This app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCquEX_gZWRdC2wriLApLM8BA83MzLV8YE',
  authDomain: 'personal-site-a4587.firebaseapp.com',
  projectId: 'personal-site-a4587',
  storageBucket: 'personal-site-a4587.appspot.com',
  messagingSenderId: '937088829561',
  appId: '1:937088829561:web:82c552ada29fdb3f436ca8'
}

// Initialize Firebase variables
const app     = initializeApp(firebaseConfig)
const db      = getFirestore(app)
const storage = getStorage(app)

// Globals
let PageState = {
  DOM: null,
  text: null
}

// Constants
const AudioDir = 'music'

const allMusicArr = await getDocs(collection(db, AudioDir))
const allGenreArr = await getDocs(collection(db, 'genre'))

let genres

allGenreArr.forEach(e => {
  genres = e.data().genres
})

// DOM elements
const Content  = document.querySelector('.content')
const navUl    = document.querySelector('.nav-ul')
const navItems = document.querySelectorAll('.nav-item')

const homeSection     = newElement('div', 'home-section')
const musicSection    = newElement('div', 'music-section', 'hidden')
const projectsSection = newElement('div', 'projects-section', 'hidden')
const contactSection  = newElement('div', 'contact-section', 'coming-soon', 'hidden')

Content.append(
  homeSection,
  musicSection,
  projectsSection,
  contactSection
)

navUl.addEventListener('mouseover', function (e) {
  const item = e.target

  navItems.forEach(e => (e.style.opacity = '.4'))
  item.style.opacity = '1'

  navUl.addEventListener('mouseout', function (f) {
    navItems.forEach(f => (f.style.opacity = '1'))
  })
})

const makeHomeSection = () => {
  const imgContainer = newElement('div')

  const img = newElement('img')

  getDownloadURL(ref(storage, `media/home-img.jpg`))
    .then(url => {
      // uncomment this line to load image
      img.src = url
    })
    .catch(err => {
      console.log(err) // TODO
    })

  img.style.height = '500px'

  imgContainer.append(img)

  return imgContainer 
}

homeSection.append(
  makeHomeSection() 
)

PageState.DOM = homeSection
PageState.text = 'home'

const makeGenreSection = (genre) => {
  const genreSection = newElement('div', 'genre-section')
  const songsSection = newElement('div', 'songs-section')

  const genreHeader = newElement('div', 'songs-section-header')

  songsSection.dataset.genre = genre
  genreHeader.textContent = genre

  genreSection.append(
    genreHeader,
    songsSection
  )

  return genreSection
}

projectsSection.append(
  makeProjectsSection()
)

contactSection.append(
  makeContactSection()
)

genres.forEach(g => {
  musicSection.append(makeGenreSection(g))
})

const electronicDescContainer = newElement('div', 'elec-desc')
document.querySelector('[data-genre="Trombone & Electronics"]').parentElement.insertBefore(
  electronicDescContainer,
  document.querySelector('[data-genre="Trombone & Electronics"]')
)

electronicDescContainer.innerHTML = 
  `
  The following recordings were made from April - June 2020. <br>
  The original accompaniment (most often piano) was transcribed <br>
  to be electronic accompaniment, which I played along with. 
  `

const makeSongContainer = (song) => {

  ///////////////////
  // Get Song Info //
  ///////////////////

  if (song === null || song === undefined) return

  const { 
    title, 
    titleEnglish,
    composer, 
    lyricist,
    yearRecorded,
    textEnglish,
    filepath } = song

  const audio = newElement('audio')
  audio.preload = 'metadata'

  getDownloadURL(ref(storage, `${AudioDir}/${filepath}`))
    .then(url => {
      audio.src = url
    })
    .catch(err => {
      console.log(err) // TODO
    })

  //////////////////
  // DOM Elements //
  //////////////////

  // divs
  const songContainer            = newElement('div', 'song-container')
  const audioPlayerContainer     = newElement('div', 'audio-player-container')
  const expandedContentContainer = newElement('div', 'expanded-content')
  
  const detailsTitle        = newElement('div')
  const detailsComposer     = newElement('div')
  const detailsLyricist     = newElement('div')
  const detailsYearRecorded = newElement('div')
  const detailsText         = newElement('div')

  const titleHeader        = newElement('div')
  const composerHeader     = newElement('div')
  const lyricistHeader     = newElement('div')
  const yearRecordedHeader = newElement('div')
  const textHeader         = newElement('div')

  titleHeader.textContent        = 'title'
  composerHeader.textContent     = 'composer'
  lyricistHeader.textContent     = 'lyricist'
  yearRecordedHeader.textContent = 'year recorded'
  textHeader.textContent         = 'text (translated to english)'

  const titleContent        = newElement('div')
  const titleContentEnglish = newElement('span')  
  const composerContent     = newElement('div')
  const lyricistContent     = newElement('div')
  const yearRecordedContent = newElement('div')
  const textContent         = newElement('div')

  titleContent.textContent = title
  titleContentEnglish.textContent = `  (${titleEnglish})`
  titleContentEnglish.style.fontStyle = 'italic'
  composerContent.textContent = composer
  lyricistContent.textContent = lyricist
  yearRecordedContent.textContent = yearRecorded
  
  if (textEnglish !== undefined) {
    textEnglish.forEach((line) => {
      textContent.innerHTML += line + '<br />'
    })
  }
  
  // p
  const songTitle = newElement('p')
  songTitle.textContent = title

  // buttons
  const playIconContainer   = newElement('button', 'play-icon')
  const muteIconContainer   = newElement('button', 'mute-icon')
  const expandIconContainer = newElement('button', 'expand-chevron')

  // spans
  const currentTimeContainer = newElement('span', 'current-time', 'time')
  const durationContainer    = newElement('span', 'duration', 'time')

  currentTimeContainer.textContent = '0:00'
  durationContainer.textContent = '0:00'

  // inputs
  const seekSlider   = newElement('input', 'seek-slider')
  const volumeSlider = newElement('input', 'volume-slider')

  seekSlider.type = 'range'
  seekSlider.max = '100'
  seekSlider.value = '0'

  volumeSlider.type = 'range'
  volumeSlider.max = '100'
  volumeSlider.value = '100'

  // output
  const volumeOutput = newElement('output', 'volume-output')
  volumeOutput.textContent = '100'

  //////////////////
  // Building DOM //
  //////////////////

  audioPlayerContainer.append(
    audio,
    songTitle,
    playIconContainer,
    currentTimeContainer,
    seekSlider,
    durationContainer,
    expandIconContainer,
    volumeOutput,
    volumeSlider,
    muteIconContainer
  )

  if (titleEnglish !== undefined) {
    titleContent.append(titleContentEnglish)
  }

  detailsTitle.append(
    titleHeader,
    titleContent
  )

  detailsComposer.append(
    composerHeader,
    composerContent
  )

  detailsLyricist.append(
    lyricistHeader,
    lyricistContent
  )

  detailsYearRecorded.append(
    yearRecordedHeader,
    yearRecordedContent
  )

  detailsText.append(
    textHeader,
    textContent
  )

  expandedContentContainer.append(
    detailsTitle,
    detailsComposer,
  )

  if (lyricist !== undefined) { 
    expandedContentContainer.append(detailsLyricist)
  }

  if (yearRecorded !== undefined) {
    expandedContentContainer.append(detailsYearRecorded)
  }

  if (textEnglish !== undefined) {
    expandedContentContainer.append(detailsText)
  } else {
    expandedContentContainer.append(newElement('div'))
  }

  songContainer.append(
    audioPlayerContainer,
    expandedContentContainer
  )

  ////////////////
  // Animations //
  ////////////////

  const playAnimation = lottieWeb.loadAnimation({
    container: playIconContainer,
    path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: "Play Animation",
  })

  playAnimation.goToAndStop(14, true)
  
  const muteAnimation = lottieWeb.loadAnimation({
    container: muteIconContainer,
    path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: "Mute Animation",
  })
  
  const expandAnimation = lottieWeb.loadAnimation({
    container: expandIconContainer,
    path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/expand/expand.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: 'Expand Animation'
  })

  ///////////////
  // Variables //
  ///////////////

  let playState   = 'play'
  let muteState   = 'unmute'
  let rAF         = null

  ///////////////
  // Functions //
  ///////////////

  const whilePlaying = () => {
    seekSlider.value = Math.floor(audio.currentTime)
    currentTimeContainer.textContent = calculateTime(seekSlider.value)
    audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`)
    rAF = requestAnimationFrame(whilePlaying)
  }

  const showRangeProgress = (rangeInput) => {
    if(rangeInput === seekSlider) {
      audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%')
    } else {
      audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%')
    }
  }

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${minutes}:${returnedSeconds}`
  }
  
  const displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration)
  }
  
  const setSliderMax = () => {
    seekSlider.max = Math.floor(audio.duration)
  }
  
  const displayBufferedAmount = () => {
    const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1))
    audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`)
  }

  const collapseSection = element => {
    // get the height of the element's inner content, regardless of its actual size
    const sectionHeight = element.scrollHeight
    
    // temporarily disable all css transitions
    const elementTransition = element.style.transition
    element.style.transition = ''
    
    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we 
    // aren't transitioning out of 'auto'
    requestAnimationFrame(() => {
      element.style.height = sectionHeight + 'px'
      element.style.transition = elementTransition
      
      // on the next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0
      requestAnimationFrame(() => {
        element.style.height = 0 + 'px'
      })
    })
    
    // mark the section as "currently collapsed"
    element.setAttribute('data-collapsed', 'true')
  }

  const expandSection = element => {
    // get the height of the element's inner content, regardless of its actual size
    let sectionHeight = element.scrollHeight
    
    // have the element transition to the height of its inner content
    element.style.height = sectionHeight + 'px'

    // when the next css transition finishes (which should be the one we just triggered)
    element.addEventListener('transitionend', function f(e) {
      // remove this event listener so it only gets triggered once
      element.removeEventListener('transitionend', f)
      
      // remove "height" from the element's inline styles, so it can return to its initial value
      element.style.height = null
    })
    
    // mark the section as "currently not collapsed"
    element.setAttribute('data-collapsed', 'false')
    element.style.borderBottom = '1px solid black'
  }

  collapseSection(expandedContentContainer)

  ////////////
  // Events //
  ////////////

  playIconContainer.addEventListener('click', () => {
    if(playState === 'play') {
      audio.play()
        playAnimation.playSegments([14, 27], true)
        requestAnimationFrame(whilePlaying)
        playState = 'pause'
    } else {
      audio.pause()
        playAnimation.playSegments([0, 14], true)
        cancelAnimationFrame(rAF)
        playState = 'play'
    }
  })

  muteIconContainer.addEventListener('click', () => {
    if(muteState === 'unmute') {
      muteAnimation.playSegments([0, 15], true)
      audio.muted = true
      muteState = 'mute'
    } else {
      muteAnimation.playSegments([15, 25], true)
      audio.muted = false
      muteState = 'unmute'
    }
  })

  expandIconContainer.addEventListener('click', () => {
    const isCollapsed = 
      expandedContentContainer.getAttribute('data-collapsed') === 'true'
    
    if (isCollapsed) {
      expandAnimation.playSegments([0, 14], true)
      expandSection(expandedContentContainer)
      expandedContentContainer.setAttribute('data-collapsed', 'false')
    } else {
      expandAnimation.playSegments([14, 27], true)
      collapseSection(expandedContentContainer)
    }
  })

  seekSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target)
    currentTimeContainer.textContent = calculateTime(seekSlider.value)
    if(!audio.paused) {
      cancelAnimationFrame(rAF)
    }
  })
  seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value
    if(!audio.paused) {
      requestAnimationFrame(whilePlaying)
    }
  })

  volumeSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target)
    const value = e.target.value
    volumeOutput.textContent = value
    audio.volume = value / 100
  })

  audio.addEventListener('progress', displayBufferedAmount)
  audio.addEventListener('timeupdate', () => {
    seekSlider.value = Math.floor(audio.currentTime)
  })

  if (audio.readyState > 0) {
    displayDuration()
    setSliderMax()
    displayBufferedAmount()
  } else {
    audio.addEventListener('loadedmetadata', () => {
      displayDuration()
      setSliderMax()
      displayBufferedAmount()
    })
  }

  return songContainer
}

navUl.addEventListener('click', function(e) {
  const itemText = e.target.textContent

  if (itemText === PageState.text) return

  PageState.text = itemText

  if (itemText === 'music') {
    PageState.DOM.classList.toggle('hidden')
    musicSection.classList.toggle('hidden')
    PageState.DOM = musicSection
  }

  if (itemText === 'home') {
    PageState.DOM.classList.toggle('hidden')
    homeSection.classList.toggle('hidden')
    PageState.DOM = homeSection
  }

  if (itemText === 'projects') {
    PageState.DOM.classList.toggle('hidden')
    projectsSection.classList.toggle('hidden')
    PageState.DOM = projectsSection
  }

  if (itemText === 'contact') {
    PageState.DOM.classList.toggle('hidden')
    contactSection.classList.toggle('hidden')
    PageState.DOM = contactSection
  }
})


setTimeout(() => {
  allMusicArr.forEach(song => {
    const songData = song.data()
    if (songData.filepath === undefined) return
    document.querySelector(`[data-genre="${songData.genre}"]`)
      .append(makeSongContainer(songData))
  })
}, 500)