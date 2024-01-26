import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://json-server-zzk4.onrender.com/userData"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = async (newUser) => {
    try {
      setLoading(true); // Set loading to true before adding user
      const response = await axios.post(
        "https://json-server-zzk4.onrender.com/userData",
        newUser
      );

      if (response.status === 201) {
        // If the addition is successful, fetch updated data
        fetchData();
      } else {
        console.error("Error adding user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false); // Set loading to false after adding user
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      await axios.put(
        `https://json-server-zzk4.onrender.com/userData/${id}`,
        updatedData
      );
      fetchData(); // Refetch data after editing
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://json-server-zzk4.onrender.com/userData/${id}`
      );
      fetchData(); // Refetch data after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const value = {
    data,
    handleEdit,
    handleDelete,
    handleAddUser,
    currentPage,
    itemsPerPage,
    handlePageChange,
    loading,
  };

  return (
    <AppContext.Provider value={value}>
      {loading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            zIndex: "9999",
            transform: "translate(-50%, -50%)",
          }}
        >
          <PacmanLoader color={"#d63636"} loading={loading} size={35} />
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
