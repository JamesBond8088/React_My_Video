import { useState, useEffect } from "react";
import MeetUpList from "../components/meetups/MeetUpList";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

export default function AllVideosPage(props) {
  const username = props["user"]["username"]

  const [isLoading, setIsLoading] = useState(true);

  const [hasContent, setHasContent] = useState(true);

  const [loadedVideos, setVideos] = useState([]);

  const videoSearch = props.videoSearch;

  useEffect(() => {
    const videoLocation = "videos/" + username + "/";
    const query = ref(db, videoLocation);
    return onValue(query, (snapshot) => {
      const data = snapshot.toJSON();

      if (!data) {
        setIsLoading(false)
        setHasContent(false)
      }

      if (snapshot.exists() && videoSearch === "") {
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
      else if (snapshot.exists()) {
        const videos = [];
        for (const key in data) {
          if (data[key]["title"].includes(videoSearch) || data[key]["address"].includes(videoSearch)) {
            const video = {
              id: key,
              ...data[key],
            };

            videos.push(video);
          }
        }
        setIsLoading(false);
        setVideos(videos)
      }
    });
  }, [username, videoSearch]);

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
      < MeetUpList videos={loadedVideos} username={username} />
    </div>
  );
}