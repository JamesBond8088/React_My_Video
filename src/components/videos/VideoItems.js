import { useCallback, useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ref as databaseRef, remove, set } from "firebase/database";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { fetchImageURL, uploadImageFile } from "../../helper";

export default function VideoItems(props) {
  const navigate = useNavigate();
  const titleRef = useRef("");
  const imageRef = useRef("");
  const imageFileRef = useRef("");
  const addressRef = useRef("");
  const descriptionRef = useRef("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let urlAddress = props.urlAddress;
  const username = props.username;
  if (!urlAddress.startsWith("http")) {
    urlAddress = "https://" + urlAddress;
  }

  // Asynchronous function to fetch imageURL
  const setImageURLAsync = useCallback(async () => {
    if (props.image.length !== 0) {
      return props.image;
    } else if (props.imagePath !== undefined) {
      return fetchImageURL(props.imagePath);
    }
    return "";
  }, [props.image, props.imagePath]);

  // Use useEffect to fetch and set imageURL when component mounts or props change
  useEffect(() => {
    const fetchImageURL = async () => {
      const url = await setImageURLAsync();
      setImageURL(url); // Update state with fetched imageURL
    };
    fetchImageURL();
  }, [props.image, props.imagePath]);

  const deleteVideo = async () => {
    // remove from the database
    await remove(databaseRef(db, `videos/${username}/${props.id}`)).then(() => {
      handleDeleteClose();
      navigate("/home");
    });
  };

  const editVideo = async () => {
    const title = titleRef.current.value;
    const image = imageRef.current.value;
    const imageFile = imageFileRef.current.files[0];
    const address = addressRef.current.value;
    const description = descriptionRef.current.querySelector("textarea").value;

    let postData = {
      title,
      image,
      address,
      description,
      imagePath: "",
    };

    if (imageFile !== undefined) {
      // if image file exist, upload image
      setIsLoading(true);
      const imagePath = `images/${props.username}/${imageFile.name}`;
      await uploadImageFile(imagePath, imageFile);
      postData = { ...postData, imagePath };
      setIsLoading(false);
    } else if (props.imagePath !== undefined) {
      postData = { ...postData, imagePath: props.imagePath };
    }

    set(databaseRef(db, `videos/${username}/${props.id}`), postData).then(
      () => {
        handleEditClose();
        navigate("/home");
      }
    );
  };

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
            <Form.Group className="mb-3" controlId="video-image">
              <Form.Label>Image File</Form.Label>
              <Form.Control type="file" ref={imageFileRef} />
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
          {isLoading ? (
            <Button variant="secondary" disabled>
              <Spinner
                variant="light"
                as="span"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Updating...
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={handleEditClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={editVideo}>
                Save
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>

      <Card>
        <a href={urlAddress} rel="noreferrer" target="_blank">
          <Card.Img variant="top" rel="noreferrer" src={imageURL} />
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
