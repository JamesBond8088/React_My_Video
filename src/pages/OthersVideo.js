import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useRef, useState } from "react";
import { db } from '../firebase';
import { ref, get, onValue } from "firebase/database";
import OthersVideoList from '../components/videos/OthersVideoList';


export default function OthersVideoPage(props) {
    // my username
    const username = props["user"]["username"]

    const [hasContent, setHasContent] = useState(true);

    const [loadedVideos, setVideos] = useState([]);

    // username for searching
    const [usernameSearch, setUsernameSearch] = useState("")

    const usernameRef = useRef();

    function getUserVideos(username) {
        const searchLocation = "videos/" + username + "/";
        const query = ref(db, searchLocation);
        return onValue(query, (snapshot) => {
            const data = snapshot.toJSON();

            if (!data) {
                setHasContent(false)
            }

            if (snapshot.exists()) {
                const videos = [];
                for (const key in data) {
                    const video = {
                        id: key,
                        ...data[key],
                    };

                    videos.push(video);
                }
                setVideos(videos)
                setHasContent(true)
                setUsernameSearch(username)
            }
        });
    }

    function searchHandle(event) {
        event.preventDefault();

        const usernameRefValue = usernameRef.current.value;
        const searchLocation = "accounts/";
        const query = ref(db, searchLocation);
        get(query)
            .then((snapshot) => {
                const data = snapshot.toJSON()
                if (usernameRefValue in data) {
                    getUserVideos(usernameRefValue)
                }
                else {
                    alert("invalid username")
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                alert("could not get user data")
            });
    }

    if (!hasContent) {
        return (
            <section>
                <p>The User Does Not Have Any Videos!</p>
                <Form className="d-flex" onSubmit={searchHandle}>
                    <Form.Control
                        type="search"
                        placeholder="Username"
                        className="me-2"
                        aria-label="Search"
                        ref={usernameRef}
                    />
                    <Button variant="primary" type="submit">Search</Button>
                </Form>
            </section>
        );
    }

    return (
        <div>
            <Form className="d-flex" onSubmit={searchHandle}>
                <Form.Control
                    type="search"
                    placeholder="Username"
                    className="me-2"
                    aria-label="Search"
                    ref={usernameRef}
                />
                <Button variant="primary" type="submit">Search</Button>
            </Form>
            {
                loadedVideos ? (
                    <div>
                        <h2>All videos from {usernameSearch}</h2>
                        <OthersVideoList videos={loadedVideos} username={username} />
                    </div>
                ) : (
                    <div>
                    </div>
                )
            }
        </div >
    );
}