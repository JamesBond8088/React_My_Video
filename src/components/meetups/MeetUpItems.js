import { useContext } from "react";
import classes from "./MeetUpItems.module.css";
import Card from "../ui/Cards";
import FavourateContext from "../../store/favourate-context";

export default function MeetUpItems(props) {
  const favouratesCtx = useContext(FavourateContext);

  const itemIsFavourate = favouratesCtx.itemIsFavourate(props.id);
  function toggleFavourateHandler(){
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
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavourateHandler}>{itemIsFavourate ? "Remove the Favourate" : "To Favourates"}</button>
        </div>
      </Card>
    </li>
  );
}
