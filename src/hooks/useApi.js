import { useState, useEffect } from "react";
import axios from "axios";

// Read the address from our .env file
const API_URL = import.meta.env.VITE_API_URL;

// Allow any component to easily talk to the backend
export function useApi(endpoint, token) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to attach ID badge (token) to every request
  const getHeaders = () => ({
    headers: { "x-auth-token": token }
  });

  // Function to get data (Read)
  const refresh = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}${endpoint}`, getHeaders());
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [endpoint, token]);

  // Function to post data (Create)
  const create = async (newItem) => {
    try {
      const res = await axios.post(`${API_URL}${endpoint}`, newItem, getHeaders());
      setData(prev => [...prev, res.data]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Function to delete data (Remove)
  const remove = async (id) => {
    try {
      await axios.delete(`${API_URL}${endpoint}/${id}`, getHeaders());
      setData(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return { data, loading, error, create, remove, refresh };
};