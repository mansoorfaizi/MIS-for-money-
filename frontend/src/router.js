import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import SaveMoney from "./pages/SaveMoney";
import SignIn from "./pages/SignIn";
import { useAuth } from "./AuthContext";
import Person from "./pages/Person/Person";
import AddPerson from "./pages/Person/Add/AddPerson";
import EditPerson from "./pages/Person/Edit/EditPerson";

const RouteList = () => {
  const auth = useAuth();
  const user = auth?.user;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={user ? <Layout /> : <Navigate to={"/sign-in/"} />}
        >
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to={"/sign-in/"} />}
          />
          <Route
            path="/save-money/"
            element={user ? <SaveMoney /> : <Navigate to={"/sign-in/"} />}
          />
          <Route
            path="/person/"
            element={user ? <Person /> : <Navigate to={"/sign-in/"} />}
          />
          <Route
            path="/person/add/"
            element={user ? <AddPerson /> : <Navigate to={"/sign-in/"} />}
          />
          <Route
            path="/person/edit/"
            element={user ? <EditPerson /> : <Navigate to={"/sign-in/"} />}
          />
        </Route>
        <Route path="/sign-in/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteList;
