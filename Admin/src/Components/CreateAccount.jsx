import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerImage from "../assets/login-registerImages/3d-illustration-smartphone-with-products-coming-out-screen-online-shopping-e-commerce-concept-min.jpg";
export default function CreateAccount() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [adminFormData, setAdminFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  async function submitForm(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/v1/adminUsers/register`, {
        name: adminFormData.name,
        email: adminFormData.email,
        password: adminFormData.password,
      });
      if (response.status === 201) {
        toast.error("");
        setAdminFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
        });
      }
      toast.success("Admin Registered Successfully");
      setTimeout(() => {
        navigate("/otpVerification");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  }
  // input handler
  function inputHandler(e) {
    const { name, value } = e.target;
    setAdminFormData({
      ...adminFormData,
      [name]: value,
    });
  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <ToastContainer />
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <form
          className="flex flex-col overflow-y-auto md:flex-row"
          onSubmitCapture={submitForm}
        >
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-center w-full h-full"
              src={registerImage}
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700">
                Create account
              </h1>
              <label className="block text-sm">
                <span className="text-gray-700">Name</span>
                <input
                  name="name"
                  className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input p-2"
                  placeholder="Enter Your Name"
                  type="text"
                  onChange={inputHandler}
                  value={adminFormData.name}
                />
              </label>
              <label className="block text-sm">
                <span className="text-gray-700">Email</span>
                <input
                  className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input p-2"
                  placeholder="example@abc.com"
                  type="email"
                  name="email"
                  onChange={inputHandler}
                  value={adminFormData.email}
                />
              </label>
              <label className="block mt-4 text-sm">
                <span className="text-gray-700">Password</span>
                <input
                  className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple  form-input p-2"
                  placeholder="enter your password"
                  type={showPassword ? "password" : "text"}
                  name="password"
                  onChange={inputHandler}
                  value={adminFormData.password}
                />
              </label>
              <div className="my-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  onClick={() => setShowPassword(!showPassword)}
                />
                <label className="text-sm ml-1" htmlFor="showPassword">
                  Show Password
                </label>
              </div>

              {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
              <button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Create account
              </button>

              <hr className="my-8" />

              <p className="mt-4">
                <NavLink
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to={"/login"}
                >
                  Already have an account? Login
                </NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
