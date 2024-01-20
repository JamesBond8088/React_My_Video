import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer"
export default function Layout(props) {
  return (
    <div>
      <MainNavigation search={props.search} handleLogout={props.handleLogout} />
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </div>
  );
}
