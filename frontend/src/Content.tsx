import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignInPage from "./pages/SigninPage";
import SignUpPage from "./pages/SignupPage";
import Brain from "./pages/BrainPage";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import { AuthProvider } from "./components/AuthContext"; // Import the AuthProvider

function Content() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route 
            path="/dashboard" 
            element={<PrivateRoute><Dashboard /></PrivateRoute>} 
          />
          <Route 
            path="/brain" 
            element={<PrivateRoute><Brain /></PrivateRoute>} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Content;
