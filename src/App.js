import { Route, Routes } from "react-router-dom";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase"
import { getDatabase } from "firebase/database";

import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupsPage from "./pages/NewMeetup";
import FavouratesPage from "./pages/Favourate";
import LoginPage from "./pages/Login";

import { CookiesProvider, useCookies } from "react-cookie";

import Layout from "./components/layout/Layout";
import { useState } from "react";

function App() {

  const [cookies, setCookie] = useCookies(["user"]);

  // function addVideo(video) {
  //   let videos = []
  //   if (cookies.videos) {
  //     videos = cookies.videos
  //   }
  //   videos.push(video)

  //   setCookie("videos", videos, { path: "/" });
  // }
  const [loggedIn, setLogin] = useState(false)
  const auth = getAuth(app);

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
    signInAnonymously(auth)
      .then(() => {
        console.log("signed in")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        alert("could not sign in")
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid)
      const db = getDatabase(app);
      console.log(db)
      setLogin(true)
    } else {
      console.log("user signed out")
    }
  });

  return (
    <CookiesProvider>
      {loggedIn ? (
        <Layout>
          <Routes>
            <Route path="/" element={<AllMeetupsPage cookies={cookies} />}></Route>
            <Route path="/newMeetup" element={<NewMeetupsPage />}></Route>
            <Route path="/favourates" element={<FavouratesPage />}></Route>
          </Routes>
        </Layout>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </CookiesProvider>
  );
}

export default App;
