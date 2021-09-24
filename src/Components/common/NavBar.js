import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getUser } from "../../redux/actions/authAction";
import { isAuthenticated } from "../../redux/actions/authAction";
import {
  getLocalStrorage,
  logout,
  saveLocalStrorage,
} from "../../utilities/authorization";
import { connect } from "react-redux";
function NavBar({ getUser }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    getLocalStrorage("token") != null ? true : false
  );
  const [username, setUsername] = useState(
    getLocalStrorage("username") != null ? true : false
  );
  const [roll,setRoll] = useState(getLocalStrorage("roll")!= null ? true: false);
  useEffect(() => {
    if (isLoggedIn) {
      getUser()
        .then((response) => {
          if (response.success) {
            console.log(response);
            saveLocalStrorage("username", response.data[0].name);
            saveLocalStrorage("roll",response.data[0].roll);
            setUsername(response.data[0].name);
            setRoll(response.data[0].roll);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/#">
            <b className="text-success">MERN</b> stack Application
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  activeClassName="text-warning"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  Link1
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  Link2
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  Link3
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              {!isLoggedIn ? (
                <>
                  <Link to="/signin">
                    <button className="btn btn-outline-primary me-2">
                      <i className="fa fa-user" />
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn btn-outline-success">
                      <i className="fa fa-user-plus" />
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <span className="nav-item dropdown me-5">
                  <a
                    className="nav-link text-white dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {username}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                      {roll==="admin" &&  <li>
                      <NavLink
                        className="dropdown-item"
                        activeClassName="bg-primary text-white"
                        to="/createuser"
                      >
                          Create User
                      </NavLink>
                    </li>}
                    <li>
                      <NavLink
                        className="dropdown-item"
                        activeClassName="bg-primary text-white"
                        to="/dashboard"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        activeClassName="bg-primary text-white"
                        to="/viewprofile"
                      >
                        ViewProfile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        activeClassName="bg-primary text-white"
                        to="/editprofile"
                      >
                        EditProfile
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <span
                        className="dropdown-item cursor-pointer"
                        onClick={() => logout()}
                      >
                        Logout
                      </span>
                    </li>
                  </ul>
                </span>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
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
export default connect(null, mapDispatchToProps)(NavBar);
