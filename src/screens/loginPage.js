import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/loginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userDetails = [
    {
      username: "abc@xyz.com",
      password: "bits123",
    },
  ];

  const handleSubmit = (event) => {
    for (let i = 0; i < userDetails.length; i++) {
      if (
        userDetails[i].username === username &&
        userDetails[i].password === password
      ) {
        navigate("/dashboard");
        return;
      }
    }
    alert(
      "Login failed\n\nTry with:\nusername: abc@xyz.com,\npassword: bits123"
    );
  };

  return (
    <div class="container">
      <h1>RIDESHARE</h1>
      <form class="login-container" action="/dashboard">
        <div>
          <div class="key">Username</div>
          <div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <div class="key">Password</div>
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <a href="/register" id="registerLink" style={{ marginRight: "15px" }}>
            Don't have an account?
          </a>
          <button onClick={handleSubmit} type="button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
