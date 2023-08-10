import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import fetchData from "../utils";
import { toast,ToastContainer } from "react-toastify";
// export const authToken = {token:null};
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await fetchData.post("/login", data);
    localStorage.setItem("token",res.data.token);
    localStorage.setItem("name",res.data.name);
    // authToken.token = res.data.token;
    return redirect(`/Todo-React-App/${res.data.name}`);
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return null;
};
const Login = () => {
  return (
    <div className="auth-container">
      <div className="layer"></div>
      <Form className="login-cont" method="POST">
        <h2 className="signup-head">Welcome Back!</h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />

        <button className="sign-in">Log in</button>
        <p className="redirect-link">
          Don't have a account ?
          <Link to="/Todo-React-App/signup" className="link">
            {" "}
            Sign up
          </Link>
        </p>
      </Form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
