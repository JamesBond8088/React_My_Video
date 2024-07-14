import { useRef, useState } from "react";
import classes from "./NewVideoForm.module.css";
import Card from "../ui/Cards";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function NewVideoForm(props) {
  const titleInputRef = useRef("");
  const imageInputRef = useRef("");
  const imageFileInputRef = useRef(null);
  const addressInputRef = useRef("");
  const descriptionInputRef = useRef("");

  const [isLoading, setIsLoading] = useState(false);

  // Event handler for url input
  const handleImageUrlInput = (event) => {
    if (event.target.value !== "") {
      imageFileInputRef.current.value = null;
      imageFileInputRef.current.disabled = true;
    } else {
      imageFileInputRef.current.disabled = false;
    }
  };

  // Event handler for file input
  const handleImageFileInput = (event) => {
    if (event.target.value !== "") {
      imageInputRef.current.value = null;
      imageInputRef.current.disabled = true;
    } else {
      imageInputRef.current.disabled = false;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    let enteredImage = imageInputRef.current.value;
    const enteredImageFile = imageFileInputRef.current.files[0];
    const enteredDescription = descriptionInputRef.current.value;

    let path = "";
    // if image url is empty, check for file
    if (enteredImageFile !== undefined) {
      setIsLoading(true);
      const storage = getStorage();
      path = `images/${props.username}/${enteredImageFile.name}`;
      const storageRef = ref(storage, path);
      // wait for file upload to finish
      await uploadBytes(storageRef, enteredImageFile);
      setIsLoading(false);
    }

    // check length is not null
    if (enteredImage.length === 0) {
      enteredImage = "";
    }

    const videoInfo = {
      title: enteredTitle,
      image: enteredImage,
      imagePath: path,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.addNewVideo(videoInfo);
  };
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Image</label>
          <input
            type="url"
            id="image"
            ref={imageInputRef}
            onChange={handleImageUrlInput}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image-file">Or Image File</label>
          <input
            type="file"
            id="image-file"
            ref={imageFileInputRef}
            onChange={handleImageFileInput}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Link</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="Description">Description</label>
          <textarea
            id="Description"
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <Button variant="secondary" disabled>
              <Spinner
                variant="light"
                as="span"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Saving...
            </Button>
          ) : (
            <button>Add Video</button>
          )}
        </div>
      </form>
    </Card>
  );
}
