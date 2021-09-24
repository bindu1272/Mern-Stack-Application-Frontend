import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import Validation from "../utilities/Validation";
import { signin } from "../redux/actions/authAction";
import { saveLocalStrorage } from "../utilities/authorization";
import { LoaderContainer } from "../utilities/loader";

function Login({ signin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, forceUpdate] = useState(false);
  const [isLoading, setloading] = useState(false);
  let validator = Validation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      setloading(true);
      let user = { email: username, password };
      signin(user)
        .then((response) => {
          setloading(false);
          console.log(response);
          saveLocalStrorage("email", username);
          saveLocalStrorage("token", response.token);
          setIsLoggedIn(true);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((error) => {
          setloading(false);
          console.log(error);
        });
    } else {
      validator.current.showMessages();
      forceUpdate(true);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center text-center m-4">
      <div className="text-center bg-dark col-lg-6 col-md-12 col-sm-12 col-xs-12 rounded text-white">
        <i className="fa fa-user text-warning" style={{ fontSize: 200 }} />
        <h1>Login</h1>
        <form className="m-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {validator.current.message("Username", username, "required|email")}
          <br />
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validator.current.message("Password", password, "required|password")}
          <br />
          {!isLoading ? (
            <input
              type="submit"
              value="login"
              className="btn btn-primary w-50"
            />
          ) : (
            <LoaderContainer  />
          )}
          <br />
          <br />
          <Link to="/forgotpassword">
            <input
              type="submit"
              value="Forget Password"
              className="btn btn-danger w-50"
            />
          </Link>
          <br />
          <br />
          <span>Don't have an Account</span> &nbsp;
          <Link to="/signup">
            <button className="btn btn-outline-info">Register</button>
          </Link>
        </form>
      </div>
      {isLoggedIn && <Redirect to="/dashboard" />}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signin,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Login);
