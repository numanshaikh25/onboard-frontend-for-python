import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loading from "../components/Loading";
import ErrorAlert from "../components/ErrorAlert";
import { login } from "../actions/userActions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center my-3">Login</h1>
      <div className="form mx-auto" style={{ width: "40vw" }}>
        {loading && <Loading />}
        {error && <ErrorAlert message={error} />}
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div className="mt-5">
          <h6>
            Not having an account?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Signup
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Login;
