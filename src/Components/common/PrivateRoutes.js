import React,{useState,useEffect} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getLocalStrorage } from "../../utilities/authorization";
import {connect} from "react-redux";
import {isAuthenticated} from "../../redux/actions/authAction";

function PrivateRoutes(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(getLocalStrorage("token")!=null ? true:false);
  useEffect(() => {
      let token = getLocalStrorage("token");
      if(token!=null){
          setIsLoggedIn(true);
      }else{
          setIsLoggedIn(false);
      }
      props.isAuthenticated().then(response=>{
        if(response.message==="unauthorized"){
          setIsLoggedIn(false);
        }else{
          setIsLoggedIn(true);
        }
      })
  }, [])

  return (
    <Switch>
      {isLoggedIn ? <Route {...props} /> : <Redirect to="/signin" />}
    </Switch>
  );
}

const mapDispatchToProps =(dispatch)=>{
    return bindActionCreators({
        isAuthenticated,
    },
    dispatch
    );
}
export default connect(null,mapDispatchToProps)(PrivateRoutes);
