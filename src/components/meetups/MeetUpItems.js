import { useContext, useState } from "react";
import classes from "./MeetUpItems.module.css";
import Card from "../ui/Cards";
import FavourateContext from "../../store/favourate-context";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom"
import { ref, remove } from "firebase/database";

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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

  function deleteVideo() {
    remove(ref(db, `videos/${props.id}`)).then(() => {
      navigate("/");
    });
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are deleting the video!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteVideo}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <li className={classes.item}>
        <Card>
          <div className={classes.deleteButton}>
            <button onClick={handleShow}>
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
