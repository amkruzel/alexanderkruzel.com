
/* Firebase Function Imports */

// Complete documentation here - https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp }                     from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js'
import { getStorage, getDownloadURL, ref }   from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js'
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js'

// Other imports from local js files

import { newElement } from './helperFunctions.js'

// This app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCquEX_gZWRdC2wriLApLM8BA83MzLV8YE',
  authDomain: 'personal-site-a4587.firebaseapp.com',
  projectId: 'personal-site-a4587',
  storageBucket: 'personal-site-a4587.appspot.com',
  messagingSenderId: '937088829561',
  appId: '1:937088829561:web:82c552ada29fdb3f436ca8'
}

// Constants
const AudioDir = 'music'
const Content  = document.querySelector('.content')

// Initialize Firebase variables
const app     = initializeApp(firebaseConfig)
const db      = getFirestore(app)
const storage = getStorage(app)

const allMusicArr = await getDocs(collection(db, AudioDir))

const makeSongContainer = song => {
  const musicContainer    = newElement('div', 'music-container')
  const titleContainer    = newElement('div', 'title')
  const composerContainer = newElement('div', 'composer')
  const miscContainer     = newElement('div')
  const audioContainer    = newElement('div', 'details')

  const audioEl = newElement('audio')
  
  audioEl.controls = true

  const songData = song.data()

  getDownloadURL(ref(storage, `${AudioDir}/${songData.filepath}`))
    .then(url => {
      audioEl.setAttribute('src', url)
    })
    .catch(err => {
      console.log(err) // TODO
    })
  
  titleContainer.textContent    = songData.title
  composerContainer.textContent = songData.composer

  audioContainer.append(audioEl)
  musicContainer.append(
    titleContainer,
    composerContainer,
    miscContainer,
    audioContainer
  )

  Content.appendChild(musicContainer)
}

// grid in music container is all messed up - not even using media div?

allMusicArr.forEach(song => { makeSongContainer(song) })