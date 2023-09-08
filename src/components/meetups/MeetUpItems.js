import { useContext } from "react";
import classes from "./MeetUpItems.module.css";
import Card from "../ui/Cards";
import FavourateContext from "../../store/favourate-context";

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

  function deleteVideo() {
    fetch(`https://react-practice-300a5-default-rtdb.firebaseio.com/meetups/${props.id}.json`, { method: 'DELETE' })
      .then(() => {
        alert("The video has been deleted.\nRefresh the page to see the change")
      });
  }

  return (
    <li className={classes.item}>
      <Card>
        {/* <div className={classes.deleteButton}>
          <button onClick={deleteVideo}>
            {"X"}
          </button>
        </div> */}
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
  );
}
