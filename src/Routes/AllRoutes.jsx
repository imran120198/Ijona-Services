import React from "react";
import { Routes, Route } from "react-router-dom";
import UserTable from "../Pages/UserTable";
import Login from "../Pages/Login";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<UserTable />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
