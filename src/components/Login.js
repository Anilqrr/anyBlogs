import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import CreateContext from "../context/userBlog/createcontext";

export default function Login() {
  // redrice
  const navigate = useNavigate();

  // get user data
  const UserValue = useContext(CreateContext);
  const { email, password } = UserValue.data;

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // login http require send
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // get all data by useState Through
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (json.success) {
      console.log(json);
      UserValue.setData({
        username: "",
        email: "",
        gender: "",
        birthadate: "",
        password: "",
      });
      localStorage.setItem("token", json.token);
      UserValue.ShowAlert(
        `SuccessFully Login!Now Use Blog Web app`,
        "rgb(111, 243, 129)"
      );
      navigate('/')
      // document.getElementById("submit").disabled = true;
    } else {
      UserValue.ShowAlert("Invalid Credentials", "rgb(243, 111, 111)");
    }
  };

  return (
    <>
      <div className="info">
        <h2>Login</h2>
      </div>
      <div className="login">
        <form
          action=""
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="form-control">
            <input
              type="email"
              className="text"
              value={UserValue.data.email}
              onChange={UserValue.handleOnChange}
              placeholder="Email..."
              name="email"
              id="email"
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              className="text"
              value={UserValue.data.password}
              onChange={UserValue.handleOnChange}
              placeholder="password..."
              name="password"
              id="password"
            />
          </div>

          <div className="form-control-btn">
            <button type="submit" id="submit">
              Login
            </button>
          </div>
          <div className="link">
          <Link to="/signup">Create New Account</Link>
          </div>
        </form>
      </div>
    </>
  );
}
