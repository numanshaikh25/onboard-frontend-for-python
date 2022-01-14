import React, { useState } from "react";
import Loading from "../components/Loading";
import SuccessAlert from "../components/SuccessAlert";
import { Link, useHistory, useLocation } from "react-router-dom";

import ErrorAlert from "../components/ErrorAlert";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
function Invite() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [errormessage, setErrormessage] = useState("");
  const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (email) {
      formData.append("email", email);
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .post("http://127.0.0.1:8000/api/employee/invite/", formData, config)
      .then((res) => {
        // history.push("/allemployees");
        setLoading(false);
        setSuccess(res.data.success);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err.response.data.error);
        setErrormessage(err.response.data.error);
        // console.log(errormessage);
      });
    setTimeout(() => {
      setErrormessage("");
    }, 5000);
    setTimeout(() => {
      setSuccess("");
    }, 15000);
  };
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="container mt-5">
      <h1 className="my-4 text-center">Invite an Employee</h1>
      <button className="btn btn-primary" onClick={goBack}>
        Back
      </button>
      <form
        onSubmit={submitHandler}
        className="mx-auto mt-5"
        style={{ width: "40vw" }}
      >
        <div className="text-center mx-auto">{loading && <Loading />}</div>

        {success && <SuccessAlert message={success} />}
        {errormessage && <ErrorAlert message={errormessage} />}
        <div className="mb-3 row">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            Enter Email
          </label>
          <div className="col-sm-8">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary col-sm-2">
            Invite
          </button>
        </div>
      </form>
    </div>
  );
}

export default Invite;
