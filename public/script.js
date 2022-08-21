import { 
  getDownloadURL,
  getStorage, 
  ref,  
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getFirestore, collection, doc, getDocs, documentId }  from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCquEX_gZWRdC2wriLApLM8BA83MzLV8YE",
  authDomain: "personal-site-a4587.firebaseapp.com",
  projectId: "personal-site-a4587",
  storageBucket: "personal-site-a4587.appspot.com",
  messagingSenderId: "937088829561",
  appId: "1:937088829561:web:82c552ada29fdb3f436ca8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const query = await getDocs(collection(db, "music"))
const storage = getStorage(app)

const content = document.querySelector('.content')

getDownloadURL(ref(storage, 'music/Nachtwanderer (Mendelssohn Hensel).wav'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // Or inserted into an <img> element
    const img = document.getElementById('mendelssohn');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
});

getDownloadURL(ref(storage, 'music/Lang (an die Entfernte).mp3'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // Or inserted into an <img> element
    const img = document.getElementById('lang');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
});

getDownloadURL(ref(storage, 'music/2018DebussyQuartet.mp3'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // Or inserted into an <img> element
    const img = document.getElementById('debussy');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
})

function newElement(type, ...classes) {
  let el = document.createElement(type)
  classes.forEach(cl => {
    el.classList.add(cl)
  })
  return el
}

// grid in music container is all messed up - not even using media div?

function makeMusicBox(doc) {
  let musicContainer = newElement('div', 'music-container')
  let titleContainer = newElement('div', 'title')
  let composerContainer = newElement('div', 'composer')
  let miscContainer = newElement('div')
  let audioContainer = newElement('div', 'details')

  let audioEl = newElement('audio')
  
  audioEl.controls = true
  // audioEl.dataset.id = doc.id

  let docData = doc.data()

  getDownloadURL(ref(storage, `music/${docData.filepath}`))
    .then(url => {
      audioEl.setAttribute('src', url)
    })
    .catch(err => {
      console.log(err)
    })
  
  titleContainer.textContent = docData.title
  composerContainer.textContent = docData.composer

  audioContainer.append(audioEl)

  musicContainer.append(
    titleContainer,
    composerContainer,
    miscContainer,
    audioContainer
  )

  content.appendChild(musicContainer)
}

query.forEach(doc => {
  makeMusicBox(doc)
})