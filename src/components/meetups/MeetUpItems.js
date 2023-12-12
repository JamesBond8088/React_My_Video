import { useContext, useState } from "react";
import classes from "./MeetUpItems.module.css";
import FavourateContext from "../../store/favourate-context";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom"
import { ref, remove } from "firebase/database";

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

export default function MeetUpItems(props) {
  let urlAddress = (props.url)
  if (!urlAddress.startsWith('https')) {
    urlAddress = "https://" + urlAddress
  }
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
      navigate("/home");
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

      <Card>
        <a href={props.url}><Card.Img variant="top" src={props.image} /></a>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {props.description}
          </Card.Text>
        </Card.Body>
        <Button variant="link" onClick={handleShow}>Delete</Button>{' '}
      </Card>
    </div>
  );
}
