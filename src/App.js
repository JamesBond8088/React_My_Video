import { Route, Routes } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupsPage from "./pages/NewMeetup";
import FavouratesPage from "./pages/Favourate";

import Layout from "./components/layout/Layout";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMeetupsPage />}></Route>
        <Route path="/newMeetup" element={<NewMeetupsPage />}></Route>
        <Route path="/favourates" element={<FavouratesPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
