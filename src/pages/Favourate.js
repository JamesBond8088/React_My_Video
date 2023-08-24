import {useContext} from "react";
import FavourateContext from "../store/favourate-context";
import MeetupList from "../components/meetups/MeetUpList"
function FavouratesPage() {
  const favouratesCtx = useContext(FavourateContext);

  let content;

  if (favouratesCtx.totalFavourates === 0) {
    content = <p>You Got no Favourates!</p>
  } else {
    content = <MeetupList meetups={favouratesCtx.favourates} />
  }
  return (
    <section>
      <h1>My Favourates</h1>
      {content}
    </section>
  );
}

export default FavouratesPage;
