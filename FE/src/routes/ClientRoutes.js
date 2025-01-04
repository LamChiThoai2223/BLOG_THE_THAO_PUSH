import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import ClientView from "../views/client/main_page/home";
import Header from "../views/@theme/client/header";
import Footer from "../views/@theme/client/footer";
import About from "../views/client/about";
import Contact from "../views/client/contact";
import PrivacyPolicy from "../views/client/privacy-policy";
import TermsConditions from "../views/client/terms-conditions";
import PageNotFound from "../views/client/404";
import ForgotPass from "../views/client/auth/forgot_password/forgot-password";
import OtpEmail from "../views/client/auth/email_otp/otp_email";
import LoginForm from "../components/client/auth/login/login";
import RegisterForm from "../views/client/auth/register/register";
import ForgotPasswordForm from "../views/client/auth/send_email/send-email";
import Author from "../views/client/author/index";
import Profile from "../views/client/auth/profile/index";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "../assets/styles/client/css/style.css";
import BlogView from "../views/client/blog";
import BlogList from "../components/client/Blog/list_blog";
import { RecoveryProvider } from "../views/client/auth/send_email/RecoveryContext";
import VerifiedEmail from "../views/client/verified-email";

const ClientRoutes = () => {
  const [cookies] = useCookies(["token"]); // Lấy token từ cookie
  const isAuthenticated = Boolean(cookies.token); // Kiểm tra nếu token tồn tại

  return (
    <>
      <Header />
      <RecoveryProvider>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog/*" element={<BlogView />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/verified" element={<VerifiedEmail />} />
          <Route path="/email" element={<ForgotPasswordForm />} />
          <Route path="/email-otp" element={<OtpEmail />} />
          <Route path="/forgot-pass" element={<ForgotPass />} />
  
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/author/*" element={<Author />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </RecoveryProvider>
      <Footer />
    </>
  );
  
};

export default ClientRoutes;
