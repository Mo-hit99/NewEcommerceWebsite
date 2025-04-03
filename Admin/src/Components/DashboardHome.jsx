import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import ProfileCard from "./ProfileCard";

export default function DashboardHome() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [openTab, setOpenTab] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [currentAdminId, setCurrentAdminId] = useState("");
  const [currentAdminName, setCurrentAdminName] = useState("");

  const AdminEmail = localStorage.getItem("adminEmail");
  const isUserSignedIn = !!localStorage.getItem("adminToken");

  const handleSignOut = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/login");
  };
  useEffect(() => {
    FetchUserData();
  }, [AdminEmail]);

  async function FetchUserData() {
    const response = await axios.get("/api/v1/AdminUsers");
    const CurrentUser = response.data.find(
      (admin) => admin.email === AdminEmail
    );
    if (CurrentUser) {
      setCurrentAdminId(CurrentUser._id);
      setCurrentAdminName(CurrentUser.name);
    }
  }
  return (
    <div className="flex h-screen bg-gray-50">
      {/* <!-- Desktop sidebar --> */}
      <aside className="z-20 hidden shadow w-64 overflow-y-auto bg-white  md:block flex-shrink-0">
        <div className="py-4 text-gray-500">
          <NavLink
            className="ml-6 text-lg font-bold text-gray-800"
            to={"/dashboard/alldata"}
          >
            Admin Panel
          </NavLink>
          <ul className="mt-6">
            <li
              className="relative px-6 py-3 cursor-pointer"
              onClick={() => setActiveMenu("addproducts")}
            >
              {activeMenu === "addproducts" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <NavLink
                className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800"
                to={"/dashboard/addproducts"}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                    fill="#1C274C"
                  />
                </svg>
                <span className="ml-4">Add Products</span>
              </NavLink>
            </li>
          </ul>
          <ul>
            <li
              className="relative px-6 py-3 cursor-pointer"
              onClick={() => setActiveMenu("allproducts")}
            >
              {activeMenu === "allproducts" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <NavLink
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
                to={"/dashboard/allproducts"}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 1024 1024"
                  className="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M862.90625 932.1875H162.96875c-38.71875 0-70.125-31.40625-70.125-70.125V432.5c0-38.71875 31.40625-70.125 70.125-70.125h699.9375c38.71875 0 70.125 31.40625 70.125 70.125v429.5625c0 38.71875-31.40625 70.125-70.125 70.125z"
                    fill="#00AAFF"
                  />
                  <path
                    d="M784.0625 227.5625H239.9375c-32.4375 0-58.78125 26.34375-58.78125 58.78125v45.9375h661.6875v-45.9375c0-32.53125-26.34375-58.78125-58.78125-58.78125z"
                    fill="#FC592D"
                  />
                  <path
                    d="M721.25 91.34375H306.59375c-32.4375 0-58.78125 26.34375-58.78125 58.78125v45.9375H780.125v-45.9375c-0.09375-32.4375-26.34375-58.78125-58.875-58.78125z"
                    fill="#FFCE00"
                  />
                </svg>
                <span className="ml-4">All Products</span>
              </NavLink>
            </li>
            <li
              className="relative px-6 py-3 cursor-pointer"
              onClick={() => setActiveMenu("users")}
            >
              {activeMenu === "users" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <NavLink
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
                to={"/dashboard/allusers"}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 -1 24 24"
                  id="meteor-icon-kit__solid-users"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.99978 -0.000028C11.3134 -0.000028 13.9996 2.68619 13.9996 5.9998C13.9996 9.3134 11.3134 11.9996 7.99978 11.9996C4.68616 11.9996 1.99994 9.3134 1.99994 5.9998C1.99994 2.68619 4.68616 -0.000028 7.99978 -0.000028zM0.999972 22.0984C0.447703 22.0984 0 21.6507 0 21.0984V18.9994C0 16.2381 2.23851 13.9996 4.99986 13.9996H11.0004C13.7617 13.9996 16.0003 16.2381 16.0003 18.9994V21.0984C16.0003 21.6507 15.5526 22.0984 15.0003 22.0984C14.448 22.0984 1.55224 22.0984 0.999972 22.0984zM13.7484 11.563C15.142 10.1233 15.9996 8.16172 15.9996 5.9998C15.9996 3.83789 15.142 1.87627 13.7484 0.43658C14.4436 0.15502 15.2034 -0.000028 15.9996 -0.000028C19.3132 -0.000028 21.9994 2.68619 21.9994 5.9998C21.9994 9.3134 19.3132 11.9996 15.9996 11.9996C15.2034 11.9996 14.4436 11.8446 13.7484 11.563zM15.8992 13.9996H19.0002C21.7615 13.9996 24 16.2381 24 18.9994V21.0984C24 21.6507 23.5523 22.0984 23.0001 22.0984H17.8295C17.94 21.7856 18.0002 21.449 18.0002 21.0984V18.9994C18.0002 17.0408 17.1958 15.2701 15.8992 13.9996z"
                    fill="#758CA3"
                  />
                </svg>
                <span className="ml-4">Users</span>
              </NavLink>
             
            </li>
            <li
              className="relative px-6 py-3 cursor-pointer"
              onClick={() => setActiveMenu("orders")}
            >
              {activeMenu === "orders" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <NavLink
                  className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
                  to={"/dashboard/orders"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 512 389.397"
                    width={26}
                    height={26}
                  >
                    <path
                      fill="#C23F37"
                      d="M465.57 182.896L449.973 379.5c-.422 5.403-4.483 9.897-9.903 9.897H71.927c-5.423 0-9.474-4.473-9.9-9.897L46.421 182.896H465.57z"
                    />
                    <path
                      fill="#333"
                      d="M90.794 114.531L186.151 7.712c8.488-9.505 23.191-10.339 32.692-1.861v.01c9.515 8.481 10.339 23.2 1.858 32.702l-67.803 75.968H90.794zm270.03 0l-67.817-75.968c-8.487-9.502-7.653-24.221 1.851-32.702h.011c9.501-8.488 24.21-7.654 32.701 1.851l95.354 106.819h-62.1z"
                    />
                    <path
                      fill="#721E19"
                      d="M148.969 214.449h43.76v126.523l-43.76.003V214.449zm85.15 0h43.749v126.523l-43.749.003V214.449zm85.146 0h43.759v126.523l-43.759.003V214.449z"
                    />
                    <path
                      fill="#E15240"
                      d="M13.725 114.349h484.55c7.55 0 13.725 6.178 13.725 13.725v41.183c0 7.547-6.178 13.726-13.725 13.726H13.725C6.178 182.983 0 176.808 0 169.257v-41.183c0-7.55 6.175-13.725 13.725-13.725z"
                    />
                  </svg>
                  <span className="ml-4">Orders</span>
                </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      {/* <!-- Mobile sidebar --> */}

      {/* <!-- Backdrop --> */}
      {openTab && (
        <aside className="fixed inset-y-0 z-20 shadow flex-shrink-0 w-64 mt-[4.3rem] overflow-y-auto bg-white md:hidden">
          <div className="py-4 text-gray-500">
            <NavLink
              className="ml-6 text-lg font-bold text-gray-800"
              to={"/dashboard/alldata"}
            >
              Admin Panel
            </NavLink>
            <ul className="mt-6">
              <li
                className="relative px-6 py-3 cursor-pointer"
                onClick={() => setActiveMenu("addproducts")}
              >
                {activeMenu === "addproducts" && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                )}
                <NavLink
                  className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800"
                  to={"/dashboard/addproducts"}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                      fill="#1C274C"
                    />
                  </svg>
                  <span className="ml-4">Add Products</span>
                </NavLink>
              </li>
            </ul>
            <ul>
              <li
                className="relative px-6 py-3 cursor-pointer"
                onClick={() => setActiveMenu("allproducts")}
              >
                {activeMenu === "allproducts" && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                )}
                <NavLink
                  className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
                  to={"/dashboard/allproducts"}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 1024 1024"
                    className="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M862.90625 932.1875H162.96875c-38.71875 0-70.125-31.40625-70.125-70.125V432.5c0-38.71875 31.40625-70.125 70.125-70.125h699.9375c38.71875 0 70.125 31.40625 70.125 70.125v429.5625c0 38.71875-31.40625 70.125-70.125 70.125z"
                      fill="#00AAFF"
                    />
                    <path
                      d="M784.0625 227.5625H239.9375c-32.4375 0-58.78125 26.34375-58.78125 58.78125v45.9375h661.6875v-45.9375c0-32.53125-26.34375-58.78125-58.78125-58.78125z"
                      fill="#FC592D"
                    />
                    <path
                      d="M721.25 91.34375H306.59375c-32.4375 0-58.78125 26.34375-58.78125 58.78125v45.9375H780.125v-45.9375c-0.09375-32.4375-26.34375-58.78125-58.875-58.78125z"
                      fill="#FFCE00"
                    />
                  </svg>
                  <span className="ml-4">All Products</span>
                </NavLink>
              </li>
              <li
                className="relative px-6 py-3 cursor-pointer"
                onClick={() => setActiveMenu("users")}
              >
                {activeMenu === "users" && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                )}
                <NavLink
                  className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
                  to={"/dashboard/allusers"}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 -1 24 24"
                    id="meteor-icon-kit__solid-users"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.99978 -0.000028C11.3134 -0.000028 13.9996 2.68619 13.9996 5.9998C13.9996 9.3134 11.3134 11.9996 7.99978 11.9996C4.68616 11.9996 1.99994 9.3134 1.99994 5.9998C1.99994 2.68619 4.68616 -0.000028 7.99978 -0.000028zM0.999972 22.0984C0.447703 22.0984 0 21.6507 0 21.0984V18.9994C0 16.2381 2.23851 13.9996 4.99986 13.9996H11.0004C13.7617 13.9996 16.0003 16.2381 16.0003 18.9994V21.0984C16.0003 21.6507 15.5526 22.0984 15.0003 22.0984C14.448 22.0984 1.55224 22.0984 0.999972 22.0984zM13.7484 11.563C15.142 10.1233 15.9996 8.16172 15.9996 5.9998C15.9996 3.83789 15.142 1.87627 13.7484 0.43658C14.4436 0.15502 15.2034 -0.000028 15.9996 -0.000028C19.3132 -0.000028 21.9994 2.68619 21.9994 5.9998C21.9994 9.3134 19.3132 11.9996 15.9996 11.9996C15.2034 11.9996 14.4436 11.8446 13.7484 11.563zM15.8992 13.9996H19.0002C21.7615 13.9996 24 16.2381 24 18.9994V21.0984C24 21.6507 23.5523 22.0984 23.0001 22.0984H17.8295C17.94 21.7856 18.0002 21.449 18.0002 21.0984V18.9994C18.0002 17.0408 17.1958 15.2701 15.8992 13.9996z"
                      fill="#758CA3"
                    />
                  </svg>
                  <span className="ml-4">Users</span>
                </NavLink>
              </li>
              <li
              className="relative px-6 py-3 cursor-pointer"
              onClick={() => setActiveMenu("orders")}
            >
              {activeMenu === "orders" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <NavLink
                  className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
                  to={"/dashboard/orders"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 512 389.397"
                    width={28}
                    height={28}
                  >
                    <path
                      fill="#C23F37"
                      d="M465.57 182.896L449.973 379.5c-.422 5.403-4.483 9.897-9.903 9.897H71.927c-5.423 0-9.474-4.473-9.9-9.897L46.421 182.896H465.57z"
                    />
                    <path
                      fill="#333"
                      d="M90.794 114.531L186.151 7.712c8.488-9.505 23.191-10.339 32.692-1.861v.01c9.515 8.481 10.339 23.2 1.858 32.702l-67.803 75.968H90.794zm270.03 0l-67.817-75.968c-8.487-9.502-7.653-24.221 1.851-32.702h.011c9.501-8.488 24.21-7.654 32.701 1.851l95.354 106.819h-62.1z"
                    />
                    <path
                      fill="#721E19"
                      d="M148.969 214.449h43.76v126.523l-43.76.003V214.449zm85.15 0h43.749v126.523l-43.749.003V214.449zm85.146 0h43.759v126.523l-43.759.003V214.449z"
                    />
                    <path
                      fill="#E15240"
                      d="M13.725 114.349h484.55c7.55 0 13.725 6.178 13.725 13.725v41.183c0 7.547-6.178 13.726-13.725 13.726H13.725C6.178 182.983 0 176.808 0 169.257v-41.183c0-7.55 6.175-13.725 13.725-13.725z"
                    />
                  </svg>
                  <span className="ml-4">Orders</span>
                </NavLink>
            </li>
            </ul>
          </div>
        </aside>
      )}
      <>
      <div className="flex flex-col flex-1 w-full">
        <header className="z-10 py-4 bg-white shadow-md">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-gray-600">
            {/* <!-- Mobile hamburger --> */}
            <button
              className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
              onClick={() => setOpenTab(!openTab)}
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {/* <!-- Search input --> */}
            <div className="flex justify-center flex-1 lg:mr-32">
              {/* <div className="relative w-full max-w-xl mr-6 focus-within:text-blue-500">
                <div className="absolute inset-y-0 flex items-center pl-2">
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                      ></path>
                  </svg>
                </div>
                <input
                  className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md  focus:placeholder-gray-500 focus:bg-white focus:border-blue-300 focus:outline-none focus:shadow-outline-purple form-input p-2"
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                />
              </div> */}
            </div>
            <ul className="flex items-center flex-shrink-0 space-x-6">
              {/* <!-- Theme toggler --> */}
              <li className="flex">
                <button
                  className="rounded-md focus:outline-none focus:shadow-outline-purple"
                  aria-label="Toggle color mode"
                  >
                  <template>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                  </template>
                  <template>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </template>
                </button>
              </li>

              {/* <!-- Profile menu --> */}
              {isUserSignedIn ? (
                <li className="relative">
                  <button
                    className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none flex justify-center items-center"
                    onClick={() => setOpenProfile(!openProfile)}
                  >
                    <ProfileCard name={currentAdminName} />
                  </button>
                  {/* Remove the <template> element and render the dropdown directly */}
                  {openProfile && (
                    <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md ">
                      <li className="flex">
                        <div className="mx-1">
                          <h1 className="text-sm font-semibold text-blue-600">
                            👋
                            <span className="text-gray-500 mr-1">
                              Welcome Back
                            </span>
                            {currentAdminName}
                          </h1>
                          <p className="text-sm text-gray-500 ml-3 my-1">
                            {AdminEmail}
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <button
                          className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                          onClick={handleSignOut}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            aria-hidden="true"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                          <span>Log out</span>
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              ) : null}
            </ul>
          </div>
        </header>
        <Outlet />
      </div>
    </>
    </div>
  );
}
