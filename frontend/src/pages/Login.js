import { useState } from "react";
import "./Login.css";

function Login({ setIsAuth }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    if (email === "nutan@gmail.com" && password === "1234") {

      localStorage.setItem("auth", "true");
      setIsAuth(true);

    } else {

      alert("Invalid email or password");

    }

  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h2 className="login-title">Student Management Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

        </form>

      </div>

    </div>

  );

}

export default Login;