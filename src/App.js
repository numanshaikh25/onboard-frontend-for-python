import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EmployeeTable from "./components/EmployeeTable";
import AllEmployees from "./pages/AllEmployees";
import AddEmployeeForm from "./components/AddEmployeeForm";
import AddEmployee from "./pages/AddEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import Invite from "./pages/Invite";
import Home from "./pages/Home";
import EmployeeDetail from "./pages/EmployeeDetail";
import { useState } from "react";
import Notifications from "./pages/Notifications";

function App() {
  const [user, setUser] = useState({});
  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login">
          <Login user={user} setUser={setUser} />
        </Route>
        <Route path="/allemployees" component={AllEmployees} />
        <Route path="/addemployee" component={AddEmployee} />
        <Route path="/invite" component={Invite} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/updateemployee/:id" component={UpdateEmployee} />
        <Route path="/employeedetail/:id" component={EmployeeDetail} />
      </Switch>
    </Router>
  );
}

export default App;
