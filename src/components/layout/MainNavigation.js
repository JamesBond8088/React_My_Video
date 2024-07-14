import { useRef } from "react";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function MainNavigation(props) {
  const video_url = useRef();

  function submitHandle(event) {
    event.preventDefault();

    const videoSearch = video_url.current.value;
    props.search(videoSearch);
  }

  // clear the search value when refreshing the home page
  function showAllVideos() {
    props.search("");
  }

  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand>MV</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/home"
              color="white"
              onClick={showAllVideos}
            >
              All Videos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/newVideo"
              color="white"
              onClick={showAllVideos}
            >
              New Video
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/othersVideo"
              color="white"
              onClick={showAllVideos}
            >
              Others Video
            </Nav.Link>
          </Nav>
          <Form className="m-auto d-flex" onSubmit={submitHandle}>
            <Form.Control
              type="search"
              placeholder="Video Name/Link"
              aria-label="Search"
              ref={video_url}
            />
            <Button variant="outline-success" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </Button>
          </Form>
          <Button variant="outline-primary" onClick={props.handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
