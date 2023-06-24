import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/registerPage.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassInstr, setShowPassInstr] = useState(false);
    const [type, setType] = useState("");

    const validator = (event) => {
        if (username === "" || password === "" || type === "") {
            alert("Registration failed: Empty fields");
            return;
        }
        if (!new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$").test(password)) {
            alert("Password entry does not meet criteria");
            return;
        }
        alert("Account created successfully");
        navigate("/")
    }

    return <div class="container">
        <h1>RIDESHARE</h1>
        <form class="login-container" action='/'>
            <div><div class="key">Username</div><div><input value={username} onChange={e => setUsername(e.target.value)}></input></div></div>
            <div><div class="key">Password</div><div><input value={password} onChange={e => setPassword(e.target.value)}
                onFocus={e => setShowPassInstr(true)} onBlur={e => setShowPassInstr(false)}></input></div></div>
            <div class="instructions" style={{ display: showPassInstr ? 'block' : 'none' }}>
                <div>Minimum eight characters</div>
                <div>Atleast one letter</div>
                <div>Atleast one number</div>
                <div>Atleast one special character</div>
            </div>
            <div class="radio-container">
                <input type="radio" id="user" name="type" value="user" onChange={e => setType(e.target.value)} />
                <label for="user">User</label>
                <div class="width-spacer"></div>
                <input type="radio" id="driver" name="type" value="driver" onChange={e => setType(e.target.value)} />
                <label for="driver">Driver</label>
            </div>
            <div>
                <a href="/" id="registerLink" style={{marginRight: '15px'}}>Already have an account?</a>
                <button onClick={validator} type='button'>Register</button>
            </div>
        </form>
    </div>;
};

export default RegisterPage;