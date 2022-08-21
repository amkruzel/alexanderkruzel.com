import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
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

function createMusicContainer(title, composer, url) {
  const musicContainer = document.createElement
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

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
});
  