import { useRef } from "react";

import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function MainNavigation(props) {
  const video_url = useRef();

  function submitHandle(event) {
    event.preventDefault();

    const videoSearch = video_url.current.value;
    props.search(videoSearch);
  }

  // clear the search value when refreshing the home page
  function showAllVideos() {
    props.search("")
  }

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>My Videos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link> <Link to="/home" color="white" onClick={showAllVideos}>All Videos</Link> </Nav.Link>
            <Nav.Link> <Link to="/newVideo" background="yellow">New Video</Link> </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={submitHandle}>
            <Form.Control
              type="search"
              placeholder="Video Name/Link"
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
