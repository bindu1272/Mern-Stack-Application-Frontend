import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Validation from "../utilities/Validation";
import { getUser,updateProfile } from "../redux/actions/authAction";
import { LoaderContainer } from "../utilities/loader";
import { getLocalStrorage, saveLocalStrorage } from "../utilities/authorization";

function EditProfile({ getUser,updateProfile }) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [isloading, setloading] = useState(false);
  const [, forceUpdate] = useState(false);
  let validator = Validation();
  useEffect(() => {
    getUserData();
  }, []);
  const handleSubmit = (e) => {
      e.preventDefault();
    setloading(true);
    let email=getLocalStrorage("email");
    let user={email,name:fullname}
    updateProfile(user)
      .then((response) => {
        setloading(false);
        console.log(response);
        saveLocalStrorage("username",fullname);
        setTimeout(()=>{
            window.location.reload();
        },500)
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
      });
  };
  const getUserData = () => {
    setloading(true);
    getUser()
      .then((response) => {
        setloading(false);
        console.log(response);
        setFullname(response.data[0].name);
        setUsername(response.data[0].email);
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center text-center m-4">
      <div className="text-center bg-dark col-lg-6 col-md-12 col-sm-12 col-xs-12 rounded text-white">
        <i className="fa fa-user text-warning" style={{ fontSize: 200 }} />
        <h1>Edit Profile</h1>
        <form className="m-3" onSubmit={handleSubmit}>
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
            disabled
            type="text"
            className="form-control"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <br />
          {!isloading ? (
            <input type="submit" value="update" className="btn btn-primary" />
          ) : (
            <LoaderContainer />
          )}
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
      getUser,
      updateProfile
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(EditProfile);
