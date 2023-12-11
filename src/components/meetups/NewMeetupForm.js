import { useRef } from "react";
import classes from "./NewMeetupForm.module.css";
import Card from "../ui/Cards";
export default function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  const noImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    let enteredImage = imageInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    if (enteredImage.length === 0) {
      enteredImage = noImage
    }

    const meetUpInfo = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    }

    props.addNewMeetup(meetUpInfo);
  }
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Video Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="Image">Video Image</label>
          <input type="url" placeholder="image" id="Image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Video Link</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="Description">Video Description</label>
          <textarea id="Description" rows="5" ref={descriptionInputRef} ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Video</button>
        </div>
      </form>
    </Card>
  );
}
