import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Spin } from "antd";

const RequireRole = ( {children, allowedRoles}) => {
  

    const {currentUserRole, loading:roleLoading}= useSelector((state) => state.role);
    const {user, loading:userLoading}= useSelector((state) => state.auth);


  if(roleLoading || userLoading){
    return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
  }

  if(!user) {
    
      return <Navigate to="/login" replace/>
  };

  if(!allowedRoles.includes(currentUserRole)){
    return <Navigate to="/"  replace/>;
  }

    return children;
  
}

RequireRole.propTypes = {
  children: PropTypes.node,
  allowedRoles: PropTypes.array,
};

export default RequireRole