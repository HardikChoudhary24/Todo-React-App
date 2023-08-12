import React from "react";
import image from "./assets/images/bg-desktop-dark.jpg";
import "./index.css";
import MainList from "./MainList";
import { createBrowserRouter ,RouterProvider} from "react-router-dom";
import Signup, { action as signupAction } from "./Pages/Signup";
import Login, { action as loginAction } from "./Pages/Login";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/Todo-React-App/:username",
    element: <PrivateRoute />,
  },
  {
    path: "/Todo-React-App/",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/Todo-React-App/signup",
    element: <Signup />,
    action: signupAction,
  },
]);
const App = () => {
  return <RouterProvider router={router}/>
};

export default App;
