import OthersVideoItems from "./OthersVideoItems";
import Row from "react-bootstrap/Row";

export default function OthersVideoList(props) {
  return (
    <Row xs={2} md={4} className="g-4">
      {props.videos.map((video) => (
        <OthersVideoItems
          id={video.id}
          image={video.image}
          imagePath={video.imagePath}
          title={video.title}
          url={video.address}
          description={video.description}
          username={props.username}
        />
      ))}
    </Row>
  );
}
