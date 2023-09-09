import { useContext, useState } from "react";
import classes from "./MeetUpItems.module.css";
import Card from "../ui/Cards";
import FavourateContext from "../../store/favourate-context";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom"
import { ref, remove } from "firebase/database";

export default function MeetUpItems(props) {
  const urlAddress = "https://" + (props.address)
  const favouratesCtx = useContext(FavourateContext);

  const itemIsFavourate = favouratesCtx.itemIsFavourate(props.id);
  function toggleFavourateHandler() {
    if (itemIsFavourate) {
      favouratesCtx.removeFavourate(props.id);
    } else {
      favouratesCtx.addFavourate({
        id: props.id,
        image: props.image,
        address: props.address,
        description: props.description,
        title: props.title
      })
    }
  }
  const navigate = useNavigate();
  const [buttonClicked, setClicked] = useState(false)

  function clickDeleteButton() {
    setClicked(true)
  }
  function clickCancelButton() {
    setClicked(false)
  }

  function deleteVideo() {
    remove(ref(db, `videos/${props.id}`)).then(() => {
      navigate("/");
    });
  }

  return (
    <div>
      {buttonClicked && (
        <div>
          <div>
            Deleting video
          </div>
          <button onClick={deleteVideo}>
            Delete Video
          </button>
          <button onClick={clickCancelButton}>
            Cancel
          </button>
        </div>
      )}
      <li className={classes.item}>
        <Card>
          <div className={classes.deleteButton}>
            <button onClick={clickDeleteButton}>
              {"X"}
            </button>
          </div>
          <div className={classes.image}>
            <img src={props.image} alt={props.title} />
          </div>
          <div className={classes.content}>
            <h3>{props.title}</h3>
            <a href={urlAddress}>{props.address}</a>
            <p>{props.description}</p>
          </div>
          <div className={classes.actions}>
            <button onClick={toggleFavourateHandler}>{itemIsFavourate ? "Remove the Favourate" : "To Favourates"}</button>
          </div>
        </Card>
      </li>
    </div>
  );
}
