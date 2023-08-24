import { useContext } from "react";
import FavourateContext from "../../store/favourate-context"

import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
export default function MainNavigation() {
  const favouratesCtx = useContext(FavourateContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>My Videos</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Videos</Link>
          </li>
          <li>
            <Link to="/newMeetup">New Video</Link>
          </li>
          <li>
            <Link to="/favourates">Favourates
              <span className={classes.badge}>{favouratesCtx.totalFavourates}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
