import { useState, useEffect } from "react";
import MeetUpList from "../components/meetups/MeetUpList";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

function AllMeetupsPage(props) {
  const username = props["user"]["username"]

  const [isLoading, setIsLoading] = useState(true);

  const [hasContent, setHasContent] = useState(true);

  const [loadedVideos, setVideos] = useState([]);

  useEffect(() => {
    const query = ref(db, "videos");
    return onValue(query, (snapshot) => {
      const data = snapshot.toJSON();

      if (!data) {
        setIsLoading(false)
        setHasContent(false)
      }

      if (snapshot.exists()) {
        const videos = [];
        for (const key in data) {
          const video = {
            id: key,
            ...data[key],
          };

          videos.push(video);
        }
        setIsLoading(false);
        setVideos(videos)
      }


    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (!hasContent) {
    return (
      <section>
        <p>No Videos Yet!</p>
        <p>Add Your First Videos in New Video</p>
      </section>
    );
  }

  return (
    <div>
      <h1>All videos for {username}</h1>
      < MeetUpList videos={loadedVideos} />
    </div>
  );
}

export default AllMeetupsPage;
