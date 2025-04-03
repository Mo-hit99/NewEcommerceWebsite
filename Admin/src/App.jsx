import React, { lazy, Suspense} from "react";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./Components/ProtectedRoute";
import './index.css'
import LoaderSpine from "./Components/LoaderSpine";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const CreateAccount = lazy(() => import("./Components/CreateAccount"));
const Login = lazy(() => import("./Components/Login"));
const ForgotPassword = lazy(() => import("./Components/ForgotPassword"));
const AddProductsPage = lazy(() => import("./pages/AddProductsPage"));
const AllProductsPage = lazy(() => import("./pages/AllProductsPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const MainPage = lazy(() => import("./pages/MainPage"));
const ResetPassword = lazy(() => import("./Components/ResetPassword"));
const OtpVerification = lazy(() => import("./Components/AdminOtpVerification"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));

function App() {
  return (
    <section>
      <Suspense fallback={<LoaderSpine/>}>
        <Routes>
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpVerification" element={<OtpVerification />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route
              path="addproducts"
              element={
                <ProtectedRoute>
                  <AddProductsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="allproducts"
              element={
                <ProtectedRoute>
                  <AllProductsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="alldata"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="allusers"
              element={
                <ProtectedRoute>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </section>
  );
}

export default App;
