import React, { useState } from "react";
import { signUpUser } from "../api/auth"; // Assuming your API functions are in this folder
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const userData = { username, password };
      const response = await signUpUser(userData); // Make the sign-up request

      if (response.token) {
        // Save the token in localStorage
        localStorage.setItem("authToken", response.token);

        // Redirect to the dashboard after successful sign-up
        navigate("/dashboard");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (err) {
      setError("Failed to create account. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <h1 className="text-4xl font-bold text-gray-700 leading-tight">
          Join <span className="text-purple-600">Your Digital World</span>.
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          Sign up to start saving and organizing your links—whether they are from YouTube, documents, or websites you love.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center shadow-lg">
        <div className="w-3/4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create an Account 🚀</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <label className="block mb-2 text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg transition duration-300 ${loading ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700"} text-white`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
