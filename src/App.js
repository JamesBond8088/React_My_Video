import { Route, Routes, useNavigate } from "react-router-dom";
import { getAuth, signInAnonymously } from "firebase/auth";
import { app, db } from "./firebase";
import { ref, update, get } from "firebase/database";

import AllVideosPage from "./pages/AllVideos";
import LoginForm from "./pages/LoginForm";

import Layout from "./components/layout/Layout";
import { useState, useEffect } from "react";

import { CookiesProvider, useCookies } from "react-cookie";
import NewVideosPage from "./pages/NewVideo";
import OthersVideoPage from "./pages/OthersVideo";
import Hashes from "jshashes";

export default function App() {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["user"]);

  const [loggedIn, setLogin] = useState(false);

  const auth = getAuth(app);

  // persistant login, check if user cookie exist when page loads
  useEffect(() => {
    const webCookie = document.cookie;
    if (webCookie.includes("username") && webCookie.includes("password")) {
      setLogin(true);
    }

    // if (cookies.user) {
    //   // security for cookie checking, disabled for efficiency

    //   // const username = cookies.user["username"]
    //   // const password = cookies.user["password"]
    //   // const query = ref(db, "accounts")

    //   // get(query)
    //   //   .then((snapshot) => {
    //   //     const data = snapshot.toJSON()
    //   //     if (!(username in data)) {
    //   //       alert("something went wrong")
    //   //     }
    //   //     else {
    //   //       const accountPassword = data[username]
    //   //       if (accountPassword !== password) {
    //   //         alert("something went wrong")
    //   //       }
    //   //       else {
    //   //         setLogin(true)
    //   //       }
    //   //     }
    //   //   });
    // }
  }, []);

  // if sign up has no error, store the user information
  function SignUpSuccess(userInfo) {
    const username = userInfo["username"];
    const password = userInfo["password"];

    signInAnonymously(auth)
      .then(() => {
        var passwordSHA256 = new Hashes.SHA256().b64(password);
        const updates = {};
        updates[username] = passwordSHA256;
        update(ref(db, "accounts/"), updates).then(() => {
          navigate("/home");
        });

        // set cookie value
        const cookieValue = {
          username: username,
          password: passwordSHA256,
        };
        setCookie("user", cookieValue, { path: "/" });
        setLogin(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("could not sign in");
      });
  }

  // user sign up
  function handleSignUp(userInfo) {
    const username = userInfo["username"];

    const query = ref(db, "accounts");
    get(query)
      .then((snapshot) => {
        const data = snapshot.toJSON();
        if (username in data) {
          alert("username already taken");
        } else {
          SignUpSuccess(userInfo);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("could not get user data");
      });
  }

  // user login
  function handleLogin(userInfo) {
    const username = userInfo["username"];
    const password = userInfo["password"];

    const query = ref(db, "accounts");
    get(query).then((snapshot) => {
      const data = snapshot.toJSON();
      if (!(username in data)) {
        alert("username and password incorrect");
      } else {
        const accountPassword = data[username];
        var passwordSHA256 = new Hashes.SHA256().b64(password);
        if (accountPassword !== passwordSHA256) {
          alert("username and password incorrect");
        } else {
          signInAnonymously(auth).then(() => {
            // set cookie value
            const cookieValue = {
              username: username,
              password: passwordSHA256,
            };
            setCookie("user", cookieValue, { path: "/" });
            setLogin(true);
            navigate("/home");
          });
        }
      }
    });
  }

  function handleLogout() {
    setCookie("user", "", { path: "/" });
    setLogin(false);
  }

  // passing the video search keys
  const [videoSearch, setVideoSearch] = useState("");
  function onSearch(videoSearch) {
    setVideoSearch(videoSearch);
  }

  return (
    <CookiesProvider>
      {loggedIn ? (
        <Layout search={onSearch} handleLogout={handleLogout}>
          <Routes>
            <Route
              path="/home"
              element={
                <AllVideosPage user={cookies.user} videoSearch={videoSearch} />
              }
            ></Route>
            <Route
              path="/newVideo"
              element={<NewVideosPage user={cookies.user} />}
            ></Route>
            <Route
              path="/othersVideo"
              element={<OthersVideoPage user={cookies.user} />}
            ></Route>
          </Routes>
        </Layout>
      ) : (
        <LoginForm handleSignUp={handleSignUp} handleLogin={handleLogin} />
      )}
    </CookiesProvider>
  );
}
