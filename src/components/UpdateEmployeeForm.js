import React from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import { useState, useEffect } from "react";
import axios from "axios";

function UpdateEmployeeForm() {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");
  const [mobile_number, setMobilenumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [bank_name, setBankname] = useState("");
  const [account_no, setAccountno] = useState("");
  const [ifsc_code, setIfsccode] = useState("");
  const [bank_branch_location, setBankbranchlocation] = useState("");
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingdocuments, setLoadingdocuments] = useState(false);
  const [success, setSuccess] = useState("");
  const [successdocuments, setSuccessDocuments] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const params = useParams();
  const id = params.id;
  const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [errormessage, setErrormessage] = useState("");
  const [errormessagedocuments, setErrormessagedocuments] = useState("");
  const [aadhar_card, setAadharcard] = useState(null);
  const [pan_card, setPancard] = useState(null);
  const [passport, setPassport] = useState(null);
  const [driving_license, setDrivinglicense] = useState(null);

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
        `https://onboard-backend-crinitis.herokuapp.com/api/employee/getemployee/${id}/`,
        config
      );
      console.log(data.employee);
      setLoading(false);
      setEmployee(data.employee);
      console.log(employee);
      setFirstname(data.employee.first_name);
      setLastname(data.employee.last_name);
      setEmail(data.employee.email);
      setGender(data.employee.gender);
      setAge(data.employee.age);
      setMobilenumber(data.employee.mobile_number);
      setAddress(data.employee.address);
      setRole(data.employee.role);
      setBankname(data.employee.bank_name);
      setAccountno(data.employee.account_no);
      setIfsccode(data.employee.ifsc_code);
      setBankbranchlocation(data.employee.bank_branch_location);
    }
    fetchEmployee();
  }, []);
  const aadharUpload = (e) => {
    setAadharcard(e.target.files[0]);
  };
  const panUpload = (e) => {
    setPancard(e.target.files[0]);
  };
  const passportUpload = (e) => {
    setPassport(e.target.files[0]);
  };
  const licenseUpload = (e) => {
    setDrivinglicense(e.target.files[0]);
  };
  const submitDetailsHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (first_name) {
      formData.append("first_name", first_name);
    }
    if (last_name) {
      formData.append("last_name", last_name);
    }
    if (email) {
      formData.append("email", email);
    }
    if (gender) {
      formData.append("gender", gender);
    }
    if (age) {
      formData.append("age", age);
    }
    if (mobile_number) {
      formData.append("mobile_number", mobile_number);
    }
    if (address) {
      formData.append("address", address);
    }
    if (role) {
      formData.append("role", role);
    }
    if (bank_name) {
      formData.append("bank_name", bank_name);
    }
    if (account_no) {
      formData.append("account_no", account_no);
    }
    if (ifsc_code) {
      formData.append("ifsc_code", ifsc_code);
    }
    if (bank_branch_location) {
      formData.append("bank_branch_location", bank_branch_location);
    }
    if (aadhar_card) {
      formData.append("aadhar_card", aadhar_card);
    }
    if (pan_card) {
      formData.append("pan_card", pan_card);
    }
    if (passport) {
      formData.append("passport", passport);
    }
    if (driving_license) {
      formData.append("driving_license", driving_license);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .put(
        `https://onboard-backend-crinitis.herokuapp.com/api/employee/updateemployee/${id}/`,
        formData,
        config
      )
      .then((res) => {
        // history.push("/allemployees");
        setSuccess(res.data.success);
        setLoading(false);
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
  const submitDocumentsHandler = (e) => {
    e.preventDefault();
    setLoadingdocuments(true);
    const formData = new FormData();
    if (aadhar_card) {
      formData.append("aadhar_card", aadhar_card);
    }
    if (pan_card) {
      formData.append("pan_card", pan_card);
    }
    if (passport) {
      formData.append("passport", passport);
    }
    if (driving_license) {
      formData.append("driving_license", driving_license);
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    axios
      .put(
        `https://onboard-backend-crinitis.herokuapp.com/api/employee/updateemployeedocuments/${id}/`,
        formData,
        config
      )
      .then((res) => {
        // history.push("/allemployees");
        setSuccessDocuments(res.data.success);
        setLoadingdocuments(false);
      })
      .catch((err) => {
        setLoadingdocuments(false);
        // console.log(err.response.data.error);
        setErrormessagedocuments(err.response.data.error);
        // console.log(errormessagedocuments);
      });
    setTimeout(() => {
      setErrormessagedocuments("");
    }, 5000);
    setTimeout(() => {
      setSuccessDocuments("");
    }, 15000);
  };
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

        <form onSubmit={submitDetailsHandler} className="mb-5">
          {success && <SuccessAlert message={success} />}
          {errormessage && <ErrorAlert message={errormessage} />}
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
                value={first_name}
                onChange={(e) => setFirstname(e.target.value)}
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
                value={last_name}
                onChange={(e) => setLastname(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="gender" className="col-sm-2 col-form-label">
              Gender
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Rather not specify</option>
              </select>
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
                value={age}
                onChange={(e) => setAge(e.target.value)}
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
                value={mobile_number}
                onChange={(e) => setMobilenumber(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
                value={bank_name}
                onChange={(e) => setBankname(e.target.value)}
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
                value={account_no}
                onChange={(e) => setAccountno(e.target.value)}
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
                value={ifsc_code}
                onChange={(e) => setIfsccode(e.target.value)}
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
                value={bank_branch_location}
                onChange={(e) => setBankbranchlocation(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="mt-3 btn btn-primary">
            Update Details
          </button>
        </form>
        <form onSubmit={submitDocumentsHandler} className="my-3">
          <h2 className="my-4" style={{ borderBottom: "2px solid black" }}>
            Upload Documents
          </h2>
          <div className="text-center mx-auto">
            {loadingdocuments && <Loading />}
          </div>

          {successdocuments && <SuccessAlert message={successdocuments} />}
          {errormessagedocuments && (
            <ErrorAlert message={errormessagedocuments} />
          )}
          <div className="mb-3 row">
            <label htmlFor="AadharCard" className="col-sm-2 col-form-label">
              Aadhar Card
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="file"
                id="AadharCard"
                onChange={aadharUpload}
              ></input>
              <label
                htmlFor="pdfFiles"
                className="form-label"
                style={{ color: "red" }}
              >
                * only pdf files allowed.
              </label>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="PanCard" className="col-sm-2 col-form-label">
              Pan Card
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="file"
                id="PanCard"
                onChange={panUpload}
              ></input>
              <label
                htmlFor="pdfFiles"
                className="form-label"
                style={{ color: "red" }}
              >
                * only pdf files allowed.
              </label>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="Passport" className="col-sm-2 col-form-label">
              Passport
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="file"
                id="Passport"
                onChange={passportUpload}
              ></input>
              <label
                htmlFor="pdfFiles"
                className="form-label"
                style={{ color: "red" }}
              >
                * only pdf files allowed.
              </label>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="DrivingLicense" className="col-sm-2 col-form-label">
              Driving License (Optional)
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="file"
                id="DrivingLicense"
                onChange={licenseUpload}
              ></input>
              <label
                htmlFor="pdfFiles"
                className="form-label"
                style={{ color: "red" }}
              >
                * only pdf files allowed.
              </label>
            </div>
          </div>
          <button type="submit" className="mt-3 btn btn-primary">
            Update Documents
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployeeForm;
