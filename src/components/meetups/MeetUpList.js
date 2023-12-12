import MeetUpItems from "./MeetUpItems";


import Row from 'react-bootstrap/Row';

export default function MeetUpList(props) {
  return (
    <Row xs={2} md={4} className="g-4">
      {props.videos.map((video) => (
        <MeetUpItems
          id={video.id}
          image={video.image}
          title={video.title}
          url={video.address}
          description={video.description}
        />
      ))}
    </Row>
  );
}
