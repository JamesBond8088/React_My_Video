import { useRef, useState } from "react";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ref, remove, set } from "firebase/database";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function VideoItems(props) {
  let urlAddress = props.urlAddress;
  const username = props.username;
  if (!urlAddress.startsWith("http")) {
    urlAddress = "https://" + urlAddress;
  }

  const navigate = useNavigate();
  const titleRef = useRef("");
  const imageRef = useRef("");
  const addressRef = useRef("");
  const descriptionRef = useRef("");

  function deleteVideo() {
    // close the modal after delete

    // remove from the database
    remove(ref(db, `videos/${username}/${props.id}`)).then(() => {
      handleDeleteClose();
      navigate("/home");
    });
  }

  function editVideo() {
    const title = titleRef.current.value;
    const image = imageRef.current.value;
    const address = addressRef.current.value;
    const description = descriptionRef.current.querySelector("textarea").value;
    const postData = {
      title,
      image,
      address,
      description,
    };

    set(ref(db, `videos/${username}/${props.id}`), postData).then(() => {
      handleEditClose();
      navigate("/home");
    });
  }

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleDeleteClose = () => setShowDelete(false);
  const handleEditClose = () => setShowEdit(false);
  const handleDeleteShow = () => setShowDelete(true);
  const handleEditShow = () => setShowEdit(true);

  return (
    <div>
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header>
          <Modal.Title>Deleting Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are deleting the video!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteVideo}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header>
          <Modal.Title>Update Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="video-title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.title}
                ref={titleRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="video-image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.image}
                ref={imageRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="video-url">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.urlAddress}
                ref={addressRef}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="video-description"
              ref={descriptionRef}
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={props.description}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={editVideo}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Card>
        <a href={urlAddress} rel="noreferrer" target="_blank">
          <Card.Img variant="top" rel="noreferrer" src={props.image} />
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
        <DropdownButton
          variant="link"
          id="dropdown-basic-button"
          title=""
          style={{ marginLeft: "83%" }}
        >
          <Dropdown.Item onClick={handleEditShow}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteShow}>Delete</Dropdown.Item>
        </DropdownButton>
      </Card>
    </div>
  );
}
