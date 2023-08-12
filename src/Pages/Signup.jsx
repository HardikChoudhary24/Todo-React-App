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
    return redirect("/Todo-React-App/");
  } catch (error) {
    toast.error("Email already in use!");
  }
  return null;
};

const Signup = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="box">
      <div className="mainlogin">
        <Form className="login-box" method="POST">
          <h2 className="signup-box">Sign Up</h2>
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

          <button className="sign-in-btn" disabled={isSubmitting}>
            Sign up
          </button>
          <p className="redirect-link-p">
            Already have an account ?
            <Link to="/Todo-React-App/" className="link">
              {" "}
              Login
            </Link>
          </p>
        </Form>
      </div>
      <div className="background-box"></div>
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
