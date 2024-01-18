import { useState, useEffect } from "react";
import VideoList from "../components/videos/VideoList";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

export default function AllVideosPage(props) {
  const username = props["user"]["username"]

  const [isLoading, setIsLoading] = useState(true);

  const [hasContent, setHasContent] = useState(true);

  const [loadedVideos, setVideos] = useState([]);

  const videoSearch = props.videoSearch;

  // GET the videos from database
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
            // search if key word is in title or address
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
      < VideoList videos={loadedVideos} username={username} />
    </div>
  );
}