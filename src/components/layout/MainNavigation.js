import { useContext, useRef } from "react";
import FavourateContext from "../../store/favourate-context"

import { useNavigate } from "react-router-dom"
import { db } from "../../firebase";
import { ref, child, push, update } from "firebase/database";

import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function MainNavigation() {
  const favouratesCtx = useContext(FavourateContext);
  const video_url = useRef();
  const noImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
  const navigate = useNavigate();

  function writeUserData(videoData) {
    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'videos')).key;

    const updates = {};
    updates[newPostKey] = videoData;
    update(ref(db, 'videos/'), updates).then(() => {
      video_url.current.value = ""
      navigate("/home");
    });
  }

  function submitHandle(event) {
    event.preventDefault();

    const url = video_url.current.value;
    if (url === "") {
      alert("Empty URL")
      return
    }
    const meetUpInfo = {
      title: url,
      image: '',
      address: url,
      description: "Testing",
    }
    writeUserData(meetUpInfo)
  }

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>My Videos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link> <Link to="/home" color="white">All Videos</Link> </Nav.Link>
            <Nav.Link> <Link to="/newMeetup" background="yellow">New Video</Link> </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={submitHandle}>
            <Form.Control
              type="search"
              placeholder="Video Link"
              className="me-2"
              aria-label="Search"
              ref={video_url}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
