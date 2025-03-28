import { Navigate } from "react-router-dom";
//@ts-ignore
function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Replace with actual authentication check

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
