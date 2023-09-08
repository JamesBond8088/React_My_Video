import { useNavigate } from "react-router-dom"

import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupsPage(props) {
  const navigate = useNavigate();

  function addNewMeetupHandler(meetupData) {
    // fetch(
    //   "https://react-practice-300a5-default-rtdb.firebaseio.com/meetups.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(meetupData),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // ).then(() => {
    //   navigate("/");
    // });

    props.addVideo(meetupData)
    navigate("/");
  }
  return (
    <section>
      <h1>New video link</h1>
      <NewMeetupForm addNewMeetup={addNewMeetupHandler} />
    </section>
  );
}

export default NewMeetupsPage;
