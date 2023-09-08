import { useState, useEffect } from "react";
import MeetUpList from "../components/meetups/MeetUpList";
import { instanceOf } from 'prop-types';

function AllMeetupsPage(props) {
  const username = (props.cookies.user.username)

  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    // setIsLoading(true);
    // fetch(
    //   "https://react-practice-300a5-default-rtdb.firebaseio.com/meetups.json"
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     const meetups = [];

    //     for (const key in data) {
    //       const meetup = {
    //         id: key,
    //         ...data[key],
    //       };

    //       meetups.push(meetup);
    //     }
    //     setIsLoading(false);
    //     setLoadedMeetups(meetups);
    //   });
    const videos = (props.cookies.videos)
    const meetups = []
    for (const key in videos) {
      const meetup = {
        id: key,
        ...videos[key]
      }
      meetups.push(meetup)
    }
    setLoadedMeetups(meetups)
    setIsLoading(false);
    console.log(loadedMeetups)

  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All videos for {username}</h1>
      <MeetUpList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
