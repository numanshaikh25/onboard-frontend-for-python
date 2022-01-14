import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

function Navbar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Onboard
          </Link>
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              {userInfo ? (
                <li className="nav-item active dropdown">
                  <a
                    className="nav-link active dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo.name}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        onClick={logoutHandler}
                        className="dropdown-item"
                        aria-current="page"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Login
                  </Link>
                </li>
              )}
              {userInfo && (
                <li className="nav-item">
                  <Link
                    to="/allemployees"
                    className="nav-link active"
                    aria-current="page"
                  >
                    All Employees
                  </Link>
                </li>
              )}
              {/* <li className="nav-item">
                <Link
                  to="/allemployees"
                  className="nav-link active"
                  aria-current="page"
                >
                  All Employees
                </Link>
              </li> */}
              {userInfo && userInfo.isAdmin && (
                <li className="nav-item">
                  <Link
                    to="/invite"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Invite Employee
                  </Link>
                </li>
              )}
              {userInfo && userInfo.isAdmin && (
                <li className="nav-item">
                  <Link
                    to="/notifications"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Notifications
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
