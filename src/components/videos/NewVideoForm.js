import { useRef } from "react";
import classes from "./NewVideoForm.module.css";
import Card from "../ui/Cards";
// import { Puppeteer } from "puppeteer-core";

// async function scrapeImages(url) {
//   const browser = await Puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(url);

//   const imageUrls = await page.evaluate(() => {
//     const images = document.querySelectorAll("img");
//     const urls = Array.from(images).map((img) => img.src);
//     console.log(urls);
//     return urls;
//   });

//   await browser.close();
//   return imageUrls;
// }

export default function NewVideoForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    let enteredImage = imageInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    if (enteredImage.length === 0) {
      enteredImage = "";
    }

    // scrapeImages("https://en.wikipedia.org/wiki/Bubble_sort");

    const videoInfo = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    // props.addNewVideo(videoInfo);
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
          <input type="url" id="Image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Video Link</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="Description">Video Description</label>
          <textarea
            id="Description"
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Video</button>
        </div>
      </form>
    </Card>
  );
}
