import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Validation from "../utilities/Validation";
import { signup } from "../redux/actions/authAction";
import { LoaderContainer } from "../utilities/loader";

function Register({signup}) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isloading,setloading] = useState(false);
  const [, forceUpdate] = useState(false);
  let validator = Validation();
  const submitSignUp = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      setloading(true);
      let user = {name:fullname,email:username,password}; 
      signup(user).then(response=>{
        setloading(false);
        console.log(response);
      }).catch((error)=>{
        setloading(false);
        console.log(error);
      })
    } else {
      validator.current.showMessages();
      forceUpdate(true);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center text-center m-4">
      <div className="text-center bg-dark col-lg-6 col-md-12 col-sm-12 col-xs-12 rounded text-white">
        <i className="fa fa-user text-warning" style={{ fontSize: 200 }} />
        <h1>Register</h1>
        <form className="m-3" onSubmit={submitSignUp}>
          <input
            type="text"
            className="form-control"
            placeholder="fullName"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          {validator.current.message("Full name", fullname, "required")}
          <br />
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
          {password.length > 0 &&
          confirmPassword.length > 0 &&
          password !== confirmPassword ? (
            <span className="text-danger">Passwords must match</span>
          ) : (
            ""
          )}
          <br />
          <input
            type="password"
            className="form-control"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {validator.current.message(
            "Confirm Password",
            confirmPassword,
            "required|password"
          )}
          <br />
          {!isloading ?<input type="submit" value="submit" className="btn btn-primary" />:<LoaderContainer/>}
          <br />
          <br />
          <span>Already have an Account</span> &nbsp;
          <Link to="/signin">
            <button className="btn btn-outline-info">Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signup
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Register);
