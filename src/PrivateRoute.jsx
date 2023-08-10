import React, { useEffect } from 'react'
// import { authToken } from './Pages/Login'
import {useNavigate, useParams } from 'react-router-dom'
import MainList from './MainList';

const PrivateRoute = () => {
  const {username} = useParams();
  const isAuthenticated = localStorage.getItem("token") !== null ;
  const isUser = localStorage.getItem("name") === username;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || !isUser) {
      localStorage.removeItem("token")
      localStorage.removeItem("name")
      return navigate("/Todo-React-App/");
    }
  }, []);
  return <MainList/>
}

export default PrivateRoute
