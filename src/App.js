import Layout from "./Layout/Layout";
import Content from "./Containers/Content";
import Wallet from "./Containers/Wallet";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { authActions } from "./store/auth-slice";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const localId = localStorage.getItem("localId");
    dispatch(authActions.checkAuth({ token, localId }));
  }, [dispatch]);
  let routes = (
    <Routes>
      <Route path="/home" element={<Content />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate replace to="/home" />} />
    </Routes>
  );

  if (isAuth) {
    routes = (
      <Routes>
        <Route path="/home" element={<Content />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
    );
  }
  return <Layout>{routes}</Layout>;
}

export default App;
