import React, { useState, useEffect } from "react";
import AddEmployeeForm from "../components/AddEmployeeForm";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

import SuccessAlert from "../components/SuccessAlert";

function AddEmployee() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(true);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);
  return (
    <div className="container my-4">
      <h1 className="my-3 text-center">Add Details</h1>
      {userInfo && (
        <AddEmployeeForm setSuccess={setSuccess} success={success} />
      )}
    </div>
  );
}

export default AddEmployee;
