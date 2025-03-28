import axios from "axios";

const API_URL = "https://second-brain-9dr6.onrender.com/api/v1/content";

export const fetchBrains = async () => {
  try {
    const response = await axios.get(`${API_URL}/show`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Ensure user is authenticated
      },
    });

    // Extract "contents" from response
    return response.data.contents || [];
  } catch (error: any) {
    console.error("Error fetching content:", error.response?.data || error.message);
    throw new Error("Error fetching content");
  }
};

export const addBrain = async (brainData: { title: string; link: string; type: string }) => {
  try {
    const response = await axios.post(`${API_URL}/add`, brainData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error adding content");
  }
};

export const deleteBrain = async (id: string) => {
  try {
    const token = localStorage.getItem("authToken"); // Ensure correct token usage
    if (!token) throw new Error("No token found");

    await axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    //@ts-ignore
    console.error("Error deleting content:", error.response?.data || error.message);
    throw new Error("Error deleting content");
  }
};
