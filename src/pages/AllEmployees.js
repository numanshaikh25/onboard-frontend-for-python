import React, { useEffect } from "react";
import EmployeeTable from "../components/EmployeeTable";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function AllEmployees() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (!userInfo) {
      history.push("login");
    }
    if (userInfo && userInfo.is_registered == false) {
      history.push("/addemployee");
    }
  }, [history, userInfo]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <h1 className="my-5">All Employees</h1>
        </div>
        <div className="col-3 mt-2 justify-content-end">
          <Link
            className="ms-auto my-5 btn btn-primary text-right"
            to="/addemployee"
          >
            <i className="fas fa-plus"></i> Add Employee
          </Link>
        </div>
      </div>
      {userInfo && <EmployeeTable />}
    </div>
  );
}

export default AllEmployees;
