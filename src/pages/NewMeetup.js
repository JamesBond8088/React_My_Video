import { useNavigate } from "react-router-dom"
import { db } from "../firebase";
import { ref, child, push, update } from "firebase/database";


import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupsPage(props) {
  const navigate = useNavigate();

  function writeUserData(videoData) {
    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'videos')).key;

    const updates = {};
    updates[newPostKey] = videoData;
    update(ref(db, 'videos/'), updates).then(() => {
      navigate("/home");
    });
  }
  return (
    <section>
      <h1>New video link</h1>
      <NewMeetupForm addNewMeetup={writeUserData} />
    </section>
  );
}
export default NewMeetupsPage;
