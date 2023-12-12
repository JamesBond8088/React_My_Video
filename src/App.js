import { Route, Routes, useNavigate } from "react-router-dom";
import { getAuth, signInAnonymously } from "firebase/auth";
import { app } from "./firebase"

import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupsPage from "./pages/NewMeetup";
import FavouratesPage from "./pages/Favourate";
import LoginPage from "./pages/Login";

import Layout from "./components/layout/Layout";
import { useState } from "react";

import { CookiesProvider, useCookies } from "react-cookie";

function App() {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["user"]);

  const [loggedIn, setLogin] = useState(true)

  const auth = getAuth(app);

  function handleLogin(userInfo) {
    setCookie("user", userInfo, { path: "/" });

    signInAnonymously(auth)
      .then(() => {
        console.log("signed in")
        setLogin(true)
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        alert("could not sign in")
      });
  }

  return (
    <CookiesProvider>
      {loggedIn ? (
        <Layout>
          <Routes>
            <Route path="/home" element={<AllMeetupsPage user={cookies.user} />}></Route>
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
