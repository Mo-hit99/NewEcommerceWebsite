import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import LoaderSpine from "./Components/LoaderSpine";

// Lazy-loaded components
const NavBar = lazy(() => import("./Pages/NavBar"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const Footer = lazy(() => import("./Pages/Footer"));
const SetNewPassword = lazy(() => import("./Components/SetNewPassword"));
const AddCartPage = lazy(() => import("./Pages/AddCartPage"));
const ProductsPage = lazy(() => import("./Pages/ProductsPage"));
const TrackOrderStatus = lazy(() => import("./Components/TrackOrderStatus"));
const ForgotPassword = lazy(() => import("./Components/ForgotPassword"));
const OtpVerification = lazy(() => import("./Components/OtpVerification"));
const ProductDetailsPage = lazy(() => import("./Components/ProductDetailsPage"));
const RefundPolicyPage = lazy(() => import("./Pages/RefundPolicyPage"));
const PrivacyPolicyPage = lazy(() => import("./Pages/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(() =>
  import("./Pages/TermsAndConditionsPage")
);

function App() {
  return (
    <Suspense fallback={<LoaderSpine/>}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/addcart" element={<AddCartPage />} />
        <Route path="/Products" element={<ProductsPage />} />
        <Route path="/verification-Otp" element={<OtpVerification />} />
        <Route path="/orderstatus/:id" element={<TrackOrderStatus />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<SetNewPassword />} />
        <Route
          path="/productdetailspage/:id"
          element={<ProductDetailsPage />}
        />
        <Route path="/refundpolicy" element={<RefundPolicyPage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
        <Route path="/termsandconditions" element={<TermsAndConditionsPage />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
