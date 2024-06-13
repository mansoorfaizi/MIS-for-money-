import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import SaveMoney from "./pages/SaveMoney";
import SignIn from "./pages/SignIn";
import Persons from "./pages/Persons";

const RouteList = () => {
  const user = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home/"
          element={user ? <Layout /> : <Navigate to={"/"} />}
        >
          <Route
            path="dashboard/"
            element={user ? <Dashboard /> : <Navigate to={"/"} />}
          />
          <Route
            path="/home/save-money/"
            element={user ? <SaveMoney /> : <Navigate to={"/"} />}
          />
          <Route
            path="/home/person/"
            element={user ? <Persons /> : <Navigate to={"/"} />}
          />
        </Route>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteList;
