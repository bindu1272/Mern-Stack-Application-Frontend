import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Validation from "../utilities/Validation";
import { getUser } from "../redux/actions/authAction";
import { LoaderContainer } from "../utilities/loader";
import { logout } from "../utilities/authorization";

function ViewProfile({ getUser }) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [isloading, setloading] = useState(false);
  const [, forceUpdate] = useState(false);
  useEffect(() => {
    handleSubmit();
  }, []);
  const handleSubmit = () => {
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
        <h1>view Profile</h1>
        {isloading ? (
          <LoaderContainer />
        ) : (
          <div>
            <p>Full Name : {fullname}</p>
            <p>Email Address : {username}</p>
            <br />
            <button className="btn btn-outline-danger" onClick={() => logout()}>
              Logout
            </button>
            <br/>
          </div>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUser,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ViewProfile);
