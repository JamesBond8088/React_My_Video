import { useState } from "react";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom"
import { ref, remove } from "firebase/database";

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

export default function VideoItems(props) {
  let urlAddress = (props.url)
  const username = props.username
  if (!urlAddress.startsWith('http')) {
    urlAddress = "https://" + urlAddress
  }

  const navigate = useNavigate();

  function deleteVideo() {
    // close the modal after delete
    handleClose()

    // remove from the database
    remove(ref(db, `videos/${username}/${props.id}`)).then(() => {
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
        <a href={urlAddress} rel="noreferrer" target="_blank"><Card.Img variant="top" rel="noreferrer" src={props.image} /></a>
        <Card.Body>
          <a className="link-dark" href={urlAddress} rel="noreferrer" target="_blank"><Card.Title>{props.title}</Card.Title></a>
          <Card.Text>
            {props.description}
          </Card.Text>
        </Card.Body>
        <Button variant="link" onClick={handleShow}>Delete</Button>{' '}
      </Card>
    </div>
  );
}
