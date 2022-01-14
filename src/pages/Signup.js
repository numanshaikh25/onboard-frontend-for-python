import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import axios from "axios";
import Loading from "../components/Loading";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
function Signup({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(name, email, password));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center my-3">Signup</h1>
      <div className="form mx-auto" style={{ width: "40vw" }}>
        {loading && <Loading />}
        {error && <ErrorAlert message={error} />}

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            Signup
          </button>
        </form>
        <div className="mt-5">
          <h6>
            Already having an account?
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Signup;
