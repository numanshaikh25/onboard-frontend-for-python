import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Home() {
  const userLogin = useSelector((state) => state.userLogin);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { userInfo } = userLogin;
  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `https://onboard-backend-crinitis.herokuapp.com/api/employee/getnotifications/`,
        config
      );
      // console.log(data);
      setLoading(false);
      setNotifications(data.notifications);
      // console.log(notifications);
    }
    if (userInfo && userInfo.isAdmin) {
      fetchNotifications();
    }
    if (userInfo && userInfo.is_registered == false) {
      history.push("/addemployee");
    }
  }, [history, userInfo]);
  return (
    <div className="container">
      {userInfo && userInfo.isAdmin && notifications != "" && (
        <div
          className="alert alert-primary my-3 alert-dismissible fade show"
          role="alert"
        >
          You have {notifications.length} notification(s){" "}
          <Link to="/notifications">check it out!</Link>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <div
        // style={{  }}
        style={{
          height: "78vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>
          Welcome to Onboard and Employee management platform
        </h1>
      </div>
    </div>
  );
}

export default Home;
