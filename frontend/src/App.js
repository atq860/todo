import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DashboardScreen from "./screens/DashboardScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoCreateScreen from "./screens/TodoCreateScreen";
import TodoEditScreen from "./screens/TodoEditScreen";
import TodoScreen from "./screens/TodoScreen";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <BrowserRouter>
      <Header />
      <main className="py-4">
        <Container>
          <Routes>
            <Route
              path="/"
              element={userInfo ? <DashboardScreen /> : <LoginScreen />}
            />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/todo/create" element={<TodoCreateScreen />} />
            <Route path="/todo/:id/edit" element={<TodoEditScreen />} />
            <Route path="/todo/:id" element={<TodoScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
