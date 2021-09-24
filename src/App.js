import "./App.css";
import NavBar from "./Components/common/NavBar";
import Homepage from "./Components/HomePage";
import { Redirect, Switch } from "react-router-dom";
import PublicRoutes from "./Components/PublicRoutes";
import Footer from "./Components/common/Footer";
import Register from "./Components/Register";
import {NotificationContainer} from 'react-notifications';
import Login from "./Components/Login";
import PrivateRoutes from "./Components/common/PrivateRoutes";
import Dashboard from "./Components/Dashboard";
import ForgotPassword from "./Components/ForgotPassword";
import viewProfile from "./Components/viewProfile";
import EditProfile from "./Components/EditProfile";

function App() {
  return (
    <>
      <NavBar />
      <div style={{ minHeight: 700 }}>
        <Switch>
          <Redirect from="/login" to="/signin"/>
          <PublicRoutes path="/" component={Homepage} exact />
          <PublicRoutes path="/signup" component={Register} exact />
          <PublicRoutes path="/forgotpassword" component={ForgotPassword} exact/>
          <PublicRoutes path="/signin" component={Login} exact/>
          <PrivateRoutes path="/dashboard" component={Dashboard} exact/>
          <PrivateRoutes path="/viewprofile" component={viewProfile} exact/>
          <PrivateRoutes path="/editprofile" component={EditProfile} exact/>
          <PublicRoutes path="*">
            <h1 className="text-center">404 Error Found</h1>
          </PublicRoutes>
        </Switch>
      </div>
      <NotificationContainer/>
      <Footer />
    </>
  );
}

export default App;
