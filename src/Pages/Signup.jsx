import axios from "axios";
import React from "react";
import { Form, Link, useNavigation, redirect } from "react-router-dom";
import fetchData from "../utils";
import { toast, ToastContainer } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await fetchData.post("/signup", data);
    // toast.success(res.data.msg);
    // toast.info("Redirecting to login !");
    return redirect("/Todo-React-App/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};
const Signup = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="auth-container">
      <div className="layer"></div>
      <Form className="login-cont" method="POST">
        <div className="head-container">
          <h2 className="signup-head">SIGN UP</h2>
        </div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
        />
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

        <button className="sign-in" disabled={isSubmitting}>
          Sign in
        </button>
        <p className="redirect-link">
          Do you have a account?{" "}
          <Link to="/Todo-React-App/" className="link">
            {" "}
            Log in
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

export default Signup;
