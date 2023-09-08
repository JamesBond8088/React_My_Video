import classes from "./LoginForm.module.css";
export default function LoginForm(props) {
    return (
        <div className={classes.container}>
            <div className={classes.bg}></div>
            <form className={classes.form} onSubmit={props.handleSubmit}>
                <div className={classes.form_field}>
                    <input type="text" placeholder="Email / Username" required onChange={(e) => props.setUsername(e.target.value)} />
                </div>
                <div className={classes.form_field}>
                    <input type="password" placeholder="Password" required onChange={(e) => props.setPassword(e.target.value)} />
                </div>
                <div className={classes.form_field}>
                    <button class={classes.btn} type="submit">Log in</button>
                </div>
            </form>
        </div>
    );
}
