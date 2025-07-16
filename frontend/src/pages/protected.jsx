import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(UserContext);
// console.log("protected" , token )
// console.log("protected" , role )
  if (!token) return <Navigate to="/login" />;

  if (!role) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;









// import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../context/userContext";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { token, role } = useContext(UserContext);
// console.log("protected" , token )
// console.log("protected" , role )

//   // if (!token) return <Navigate to="/login" />;

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return children;
// };

// export default ProtectedRoute;
