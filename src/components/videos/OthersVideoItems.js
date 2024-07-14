import { db } from "../../firebase";
import { ref, push, child, update } from "firebase/database";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { useEffect, useState } from "react";

export default function OthersVideoItems(props) {
  const [imageURL, setImageURL] = useState("");
  let urlAddress = props.url;
  const username = props.username;
  if (!urlAddress.startsWith("http")) {
    urlAddress = "https://" + urlAddress;
  }

  // Asynchronous function to fetch imageURL
  const setImageURLAsync = async () => {
    if (props.image.length !== 0) {
      return props.image; // Return props.image if it's already available
    } else if (props.imagePath !== undefined && props.imagePath.length !== 0) {
      const storage = getStorage();
      try {
        const url = await getDownloadURL(storageRef(storage, props.imagePath));
        return url; // Return the fetched URL
      } catch (error) {
        console.error("Error fetching image URL:", error);
        return ""; // Handle error gracefully, return empty string or handle error state
      }
    }
    return ""; // Handle other cases or default return
  };

  // Use useEffect to fetch and set imageURL when component mounts or props change
  useEffect(() => {
    const fetchImageURL = async () => {
      const url = await setImageURLAsync();
      setImageURL(url); // Update state with fetched imageURL
    };
    fetchImageURL();
  }, [props.image, props.imagePath]);

  async function addVideo() {
    let path = "";
    // if a image file is uploaded
    if (props.imagePath !== undefined) {
      path = props.imagePath;
    }

    const videoData = {
      title: props.title,
      image: props.image,
      imagePath: path,
      address: props.url,
      description: props.description,
    };

    const videoLocation = "videos/" + username + "/";
    const newPostKey = push(child(ref(db), videoLocation)).key;

    const updates = {};
    updates[newPostKey] = videoData;
    update(ref(db, videoLocation), updates).then(() => {
      alert("video added");
    });
  }

  return (
    <div>
      <Card>
        <a href={urlAddress} rel="noreferrer" target="_blank">
          <Card.Img variant="top" rel="noreferrer" src={imageURL} />
        </a>
        <Card.Body>
          <a
            className="link-dark"
            href={urlAddress}
            rel="noreferrer"
            target="_blank"
          >
            <Card.Title>{props.title}</Card.Title>
          </a>
          <Card.Text>{props.description}</Card.Text>
        </Card.Body>
        <Button variant="link" onClick={addVideo}>
          Add Video
        </Button>{" "}
      </Card>
    </div>
  );
}
