import { db } from "../../firebase";
import { ref, push, child, update } from "firebase/database";

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function OthersVideoItems(props) {
    let urlAddress = (props.url)
    const username = props.username
    if (!urlAddress.startsWith('http')) {
        urlAddress = "https://" + urlAddress
    }

    function addVideo() {
        const videoData = {
            title: props.title,
            image: props.image,
            address: props.url,
            description: props.description,
        }

        const videoLocation = "videos/" + username + "/"
        const newPostKey = push(child(ref(db), videoLocation)).key;

        const updates = {};
        updates[newPostKey] = videoData;
        update(ref(db, videoLocation), updates).then(() => {
            alert("video added")
        });
    }

    return (
        <div>
            <Card>
                <a href={urlAddress} rel="noreferrer" target="_blank"><Card.Img variant="top" rel="noreferrer" src={props.image} /></a>
                <Card.Body>
                    <a className="link-dark" href={urlAddress} rel="noreferrer" target="_blank"><Card.Title>{props.title}</Card.Title></a>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                </Card.Body>
                <Button variant="link" onClick={addVideo}>Add Video</Button>{' '}
            </Card>
        </div>
    );
}
