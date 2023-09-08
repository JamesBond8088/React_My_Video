import React, { useState } from "react";
import LoginForm from "../components/meetups/LoginForm"

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        onLogin({ username, password });
    }

    return (
        <LoginForm setUsername={setUsername} setPassword={setPassword} handleSubmit={handleSubmit} />
    );
}

export default LoginPage;