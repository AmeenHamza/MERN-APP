import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDIOIZA5V7mYJP9WCA6QX_K2aK2g_NpTbA",
    authDomain: "shopper-api-storage.firebaseapp.com",
    projectId: "shopper-api-storage",
    storageBucket: "shopper-api-storage.appspot.com",
    messagingSenderId: "113287626307",
    appId: "1:113287626307:web:649640bbc0d7e6fc3cdef6"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);