import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/api/v1/users/forgotpassword", { email });
      toast.success("Email Sent Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  }
  return (
    <div className="w-full h-screen p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Forgot Password
      </h2>
      <p className="text-center p-5 text-sm text-gray-600">
        {" "}
        Please checked the Email and also checked Spam folder for Forgot
        Password Process.
      </p>

      <form onSubmit={handleSubmit} className="max-w-[50%] mx-auto">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
