import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDThSSSWgaoryuayxTdzfx_66gHhutcvBY",
    authDomain: "react-practice-300a5.firebaseapp.com",
    databaseURL: "https://react-practice-300a5-default-rtdb.firebaseio.com",
    projectId: "react-practice-300a5",
    storageBucket: "react-practice-300a5.appspot.com",
    messagingSenderId: "82115290885",
    appId: "1:82115290885:web:30ada6cb604a24425cf96c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export {
    app,
    db
}