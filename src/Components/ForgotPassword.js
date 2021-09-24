import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Validation from "../utilities/Validation";
import { signup } from "../redux/actions/authAction";

function ForgotPassword({ signup }) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, forceUpdate] = useState(false);
  let validator = Validation();
  const submitSignUp = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      console.log("success");
      let user = { name: fullname, email: username, password };
      signup(user)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
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
        <i className="fa fa-envelope text-warning" style={{ fontSize: 200 }} />
        <h1>Forgot Password</h1>
        <form className="m-3" onSubmit={submitSignUp}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {validator.current.message("Email", username, "required")}
          <br />
          <br />
          <input type="submit" value="submit" className="btn btn-primary" />
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signup,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ForgotPassword);
