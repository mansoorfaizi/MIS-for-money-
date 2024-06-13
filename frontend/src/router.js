import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import SaveMoney from "./pages/SaveMoney";
import SignIn from "./pages/SignIn";
import Persons from "./pages/Persons";
import { useAuth } from "./AuthContext";

const RouteList = () => {
  const auth = useAuth();
  const user = auth?.user;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={user ? <Layout /> : <Navigate to={"/"} />}>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to={"/"} />}
          />
          <Route
            path="/save-money/"
            element={user ? <SaveMoney /> : <Navigate to={"/"} />}
          />
          <Route
            path="/person/"
            element={user ? <Persons /> : <Navigate to={"/"} />}
          />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteList;
