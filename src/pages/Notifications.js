import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    async function fetchNotifications() {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/employee/getnotifications/`,
        config
      );
      console.log(data);
      setLoading(false);
      setNotifications(data.notifications);
      console.log(notifications);
    }
    fetchNotifications();
  }, []);
  const readHandler = (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    setLoading(true);
    async function readNotifications() {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/employee/readnotifications/${id}/`,
        config
      );
      console.log(data);
      setLoading(false);
      setTimeout(() => {
        setNotifications(data.notifications);
      }, 500);
    }
    readNotifications();
  };
  return (
    <div className="container my-5">
      <h1 className="my-3">Notifications</h1>
      <div className="text-center mx-auto">{loading && <Loading />}</div>

      {notifications != "" ? (
        <table class="table">
          <thead>
            <tr>
              <th scope="col-9">Notifications</th>
              <th scope="col-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id}>
                <td>{notification.message}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => readHandler(notification.id)}
                  >
                    Mark as Read
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className="mt-5 text-center">No new notifications</h3>
      )}
    </div>
  );
}

export default Notifications;
