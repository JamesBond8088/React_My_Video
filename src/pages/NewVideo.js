import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ref, child, push, update } from "firebase/database";

import NewVideoForm from "../components/videos/NewVideoForm";

export default function NewVideosPage(props) {
  const username = props["user"]["username"];

  const navigate = useNavigate();

  function writeUserData(videoData) {
    const videoLocation = "videos/" + username + "/";
    const newPostKey = push(child(ref(db), videoLocation)).key;

    const updates = {};
    updates[newPostKey] = videoData;
    update(ref(db, videoLocation), updates).then(() => {
      navigate("/home");
    });
  }
  return (
    <section>
      <h1>New video link</h1>
      <NewVideoForm addNewVideo={writeUserData} username={username} />
    </section>
  );
}
