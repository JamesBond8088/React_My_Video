import { Route, Routes, useNavigate } from "react-router-dom";
import { getAuth, signInAnonymously } from "firebase/auth";
import { app, db } from "./firebase"
import { ref, update, get } from "firebase/database";

import AllVideosPage from "./pages/AllVideos";
import NewMeetupsPage from "./pages/NewMeetup";
import LoginForm from "./pages/LoginForm";

import Layout from "./components/layout/Layout";
import { useState } from "react";

import { CookiesProvider, useCookies } from "react-cookie";

function App() {
  const navigate = useNavigate();

  const Hashes = require('jshashes')

  const [cookies, setCookie] = useCookies(["user"]);

  const [loggedIn, setLogin] = useState(false)

  const auth = getAuth(app);

  // if sign up has no error, store the user information
  function SignUpSuccess(userInfo) {
    const username = userInfo["username"]
    const password = userInfo["password"]

    setCookie("user", userInfo, { path: "/" });

    signInAnonymously(auth)
      .then(() => {

        var passwordSHA256 = new Hashes.SHA256().b64(password)
        const updates = {};
        updates[username] = passwordSHA256;
        update(ref(db, 'accounts/'), updates).then(() => {
          navigate("/home");
        });

        setLogin(true)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        alert("could not sign in")
      });
  }

  function handleSignUp(userInfo) {
    const username = userInfo["username"]

    const query = ref(db, "accounts")
    get(query)
      .then((snapshot) => {
        const data = snapshot.toJSON()
        if (username in data) {
          alert("username already taken")
        }
        else {
          SignUpSuccess(userInfo)
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        alert("could not get user data")
      });
  }

  function handleLogin(userInfo) {
    const username = userInfo["username"]
    const password = userInfo["password"]

    const query = ref(db, "accounts")
    get(query)
      .then((snapshot) => {
        const data = snapshot.toJSON()
        if (!(username in data)) {
          alert("username and password incorrect")
        }
        else {
          const accountPassword = data[username]
          var passwordSHA256 = new Hashes.SHA256().b64(password)
          if (accountPassword !== passwordSHA256) {
            alert("username and password incorrect")
          }
          else {
            setCookie("user", userInfo, { path: "/" });
            setLogin(true)
          }
        }
      });
  }

  const [videoSearch, setVideoSearch] = useState("")
  function onSearch(videoSearch) {
    setVideoSearch(videoSearch)
  }

  return (
    <CookiesProvider>
      {loggedIn ? (
        <Layout search={onSearch}>
          <Routes>
            <Route path="/home" element={<AllVideosPage user={cookies.user} videoSearch={videoSearch} />}></Route>
            <Route path="/newMeetup" element={<NewMeetupsPage user={cookies.user} />}></Route>
          </Routes>
        </Layout>
      ) : (
        <LoginForm handleSignUp={handleSignUp} handleLogin={handleLogin} />
      )}
    </CookiesProvider>
  );
}

export default App;
