import classes from "./LoginForm.module.css";
import { useState, useRef } from "react";

export default function LoginForm(props) {

    const [signup, setsignup] = useState(false);

    const usernameRef = useRef();
    const passwordRef = useRef();
    const repeated_passwordRef = useRef();


    function signupPage(event) {
        event.preventDefault();
        setsignup(true)
    }

    function loginPage(event) {
        event.preventDefault();
        setsignup(false)
    }

    function handleSignup(event) {
        event.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const repeated_password = repeated_passwordRef.current.value;

        if (password === repeated_password) {
            console.log({ username, password })
            props.handleSignUp({ username, password })
        }
        else {
            alert("password not matching")
        }
    }

    function handleLogin(event) {
        event.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        props.handleLogin({ username, password })
    }

    // sign up and log in page
    return (
        <div>
            {signup ? (
                <div className={classes.container} >
                    <div className={classes.bg}></div>
                    <form className={classes.form} onSubmit={handleSignup}>
                        <div className={classes.form_field}>
                            <input type="text" placeholder="Email / Username" required ref={usernameRef} />
                        </div>
                        <div className={classes.form_field}>
                            <input type="password" placeholder="Password" required ref={passwordRef} />
                        </div>
                        <div className={classes.form_field}>
                            <input type="password" placeholder="Repeat Password" required ref={repeated_passwordRef} />
                        </div>
                        <div className={classes.form_field}>
                            <button className={classes.loginbtn} type="submit">Sign up</button>
                            <button className={classes.signupbtn} onClick={loginPage}>Log in</button>
                        </div>
                    </form>
                </div >
            ) : (
                <div className={classes.container} >
                    <div className={classes.bg}></div>
                    <form className={classes.form} onSubmit={handleLogin}>
                        <div className={classes.form_field}>
                            <input type="text" placeholder="Email / Username" required ref={usernameRef} />
                        </div>
                        <div className={classes.form_field}>
                            <input type="password" placeholder="Password" required ref={passwordRef} />
                        </div>
                        <div className={classes.form_field}>
                            <button className={classes.loginbtn} type="submit">Log in</button>
                            <button className={classes.signupbtn} onClick={signupPage}>Sign up</button>
                        </div>
                    </form>
                </div >
            )}
        </div >
    );
}
