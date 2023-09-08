import classes from "./Footer.module.css";
export default function Footer(props) {
    return (
        <div className={classes.footer}>
            <footer>
                <ul className={classes.list_inline}>
                    <li><a href="https://www.linkedin.com/in/james-zheng-0b6956219">LinkedIn</a></li>
                </ul>
                <p className={classes.copyright}>Created by James © 2023</p>
            </footer>
        </div>
    );
    // <!-- footer credit to https://epicbootstrap.com/snippets/footer-basic -->
}
