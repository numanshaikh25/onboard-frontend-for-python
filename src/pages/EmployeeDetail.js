import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Loading from "../components/Loading";
import SuccessAlert from "../components/SuccessAlert";

import axios from "axios";

function EmployeeDetail({ match, location, history }) {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const id = match.params.id;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    async function fetchEmployee() {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/employee/getemployee/${id}`,
        config
      );
      // console.log(data);
      setLoading(false);
      setEmployee(data.employee);
    }
    fetchEmployee();

    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="container my-5">
      <div className="addform mx-auto" style={{ width: "60vw" }}>
        <button className="btn btn-primary" onClick={goBack}>
          Back
        </button>
        <div className="text-center mx-auto">{loading && <Loading />}</div>
        <h2 className="my-4" style={{ borderBottom: "2px solid black" }}>
          Personal Details
        </h2>
        <div className="mb-3 row">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            First Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={employee.first_name}
              readOnly
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={employee.last_name}
              readOnly
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="Email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              value={employee.email}
              readOnly
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="gender" className="col-sm-2 col-form-label">
            Gender
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              value={employee.gender}
              readOnly
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="Age" className="col-sm-2 col-form-label">
            Age
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="Age"
              value={employee.age}
              readOnly
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="MobileNumber" className="col-sm-2 col-form-label">
            Mobile Number
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="MobileNumber"
              value={employee.mobile_number}
              readOnly
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="Address" className="col-sm-2 col-form-label">
            Address
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="Address"
              value={employee.address}
              readOnly
            />
          </div>
        </div>
        <h2 className="my-4" style={{ borderBottom: "2px solid black" }}>
          Role of Employee
        </h2>
        <div className="mb-3 row">
          <label htmlFor="Role" className="col-sm-2 col-form-label">
            Role
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="Role"
              value={employee.role}
              readOnly
            />
          </div>
        </div>
        <h2 className="my-4" style={{ borderBottom: "2px solid black" }}>
          Bank Details
        </h2>
        <div className="mb-3 row">
          <label htmlFor="BankName" className="col-sm-2 col-form-label">
            Bank Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="BankName"
              value={employee.bank_name}
              readOnly
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="AccountNumber" className="col-sm-2 col-form-label">
            Account Number
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="AccountNumber"
              value={employee.account_no}
              readOnly
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="IfscCode" className="col-sm-2 col-form-label">
            Ifsc Code
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="IfscCode"
              value={employee.ifsc_code}
              readOnly
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="BranchName" className="col-sm-2 col-form-label">
            Branch Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="BranchName"
              value={employee.bank_branch_location}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
