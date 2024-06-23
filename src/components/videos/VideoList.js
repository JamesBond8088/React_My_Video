import VideoItems from "./VideoItems";
import Row from "react-bootstrap/Row";

export default function VideoList(props) {
  return (
    <Row xs={2} md={4} className="g-4">
      {props.videos.map((video) => (
        <VideoItems
          key={video.id}
          id={video.id}
          image={video.image}
          imagePath={video.imagePath}
          title={video.title}
          urlAddress={video.address}
          description={video.description}
          username={props.username}
        />
      ))}
    </Row>
  );
}
