import React, { useState } from "react";
import axios from "axios";
import HomePage from "./HomePage";
import "./App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [view, setView] = useState("login");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/", {
        emailId: email,
      });
      setView("home");
      setError(null);
    } catch (error) {
      setError(
        error?.data?.data || "Some Error Occurred while starting the test"
      );
    }
  };
  return (
    <>
      {view === "login" ? (
        <div className="login-container">
          <div className="email-label">Please enter valid email Id</div>       
           {" "}
          <form onSubmit={handleSubmit}>
                       {" "}
            <input
              type="email"
              value={email}
              placeholder="Enter Valid Email"
              onChange={({ target }) => setEmail(target.value)}
            />
                       {" "}
            <div className="email-label">
                           {" "}
              <button disabled={email ? false : true} type="submit">
                                Start Test              {" "}
              </button>
                         {" "}
            </div>
                     
            {error && (
              <p class="error-message">                {error}              </p>
            )}
          </form>
                 {" "}
        </div>
      ) : (
        <HomePage email={email}></HomePage>
      )}
         {" "}
    </>
  );
};

export default Login;
