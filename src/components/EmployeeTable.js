import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import SuccessAlert from "./SuccessAlert";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    async function fetchEmployees() {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/api/employee/getemployees/",
        config
      );

      setLoading(false);
      setEmployees(data.employees);
    }
    fetchEmployees();
  }, [success]);
  const deleteHandler = (id) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    if (window.confirm("Are you sure you want to delete this emloyee?")) {
      axios
        .delete(
          `http://127.0.0.1:8000/api/employee/deleteemployee/${id}/`,
          config
        )
        .then((res) => {
          setLoading(false);

          setSuccess(res.data.success);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="container mt-3">
      <button className="btn btn-primary" onClick={goBack}>
        Back
      </button>
      <div className="text-center mx-auto">{loading && <Loading />}</div>
      {success && <SuccessAlert message={success} />}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <th scope="row">{employee.id}</th>
              <td>
                <Link
                  to={`/employeedetail/${employee.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {employee.first_name}
                </Link>
              </td>
              <td>
                <Link
                  to={`/employeedetail/${employee.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {employee.last_name}
                </Link>
              </td>
              <td>
                <Link
                  to={`/employeedetail/${employee.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {employee.email}
                </Link>
              </td>
              <td>{employee.role}</td>
              <td>
                <Link
                  className="btn-sm btn-light"
                  to={`/updateemployee/${employee.id}`}
                >
                  <i className="fas fa-edit"></i>
                </Link>
                <button
                  className="btn-sm btn-danger"
                  onClick={() => deleteHandler(employee.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
