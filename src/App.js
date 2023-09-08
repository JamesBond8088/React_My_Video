import { Route, Routes } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupsPage from "./pages/NewMeetup";
import FavouratesPage from "./pages/Favourate";
import LoginPage from "./pages/Login";

import { CookiesProvider, useCookies } from "react-cookie";

import Layout from "./components/layout/Layout";
function App() {

  const [cookies, setCookie] = useCookies(["user", "videos"]);

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }

  function addVideo(video) {
    let videos = []
    if (cookies.videos) {
      videos = cookies.videos
    }
    // console.log("cookie video")
    // console.log(cookies.videos)
    console.log(videos)
    videos.push(video)

    setCookie("videos", videos, { path: "/" });
  }

  return (
    <CookiesProvider>
      {cookies.user ? (
        <Layout>
          <Routes>
            <Route path="/" element={<AllMeetupsPage cookies={cookies} />}></Route>
            <Route path="/newMeetup" element={<NewMeetupsPage addVideo={addVideo} />}></Route>
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
