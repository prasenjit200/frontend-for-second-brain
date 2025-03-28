import axios from "axios";

const API_URL = "https://second-brain-9dr6.onrender.com/api/v1/user";

export const signUpUser = async (userData: { username: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // This should return the data, e.g., token, from the server
  } catch (error) {
    //@ts-ignore
    throw new Error("Error during sign-up: " + error.response?.data?.message || error.message);
  }
};

export const signInUser = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/signin`, userData);
  return response.data;
};

export const logoutUser = async () => {
  try {
    // Remove JWT token from localStorage
    localStorage.removeItem("authToken");

    // Optional: If you're using axios interceptors to add the token to requests, you can reset it
    delete axios.defaults.headers.common["Authorization"];

    return { message: "Logged out successfully" };
  } catch (error) {
    //@ts-ignore
    throw new Error("Error during logout: " + error.response?.data?.message || error.message);
  }
};
