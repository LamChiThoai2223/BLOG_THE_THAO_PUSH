import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  getUserProfile,
  getUserGoogleProfile,
  logout,
} from "../../../../services/Auth";
import { Spinner } from "react-bootstrap";
import Activity from "../../../../components/client/auth/profile/activity";
import Account from "../../../../components/client/auth/profile/account";
import CreateBlog from "../../../../components/client/auth/profile/createBlog";
import ChangePass from "../../../../components/client/auth/profile/changePass";
import NofitiProfile from "../../../../components/client/auth/profile/notification";
import EditBlog from "../../../../components/client/auth/profile/editBlog";
import Message from "../../../../components/client/auth/profile/message";

const ProfileViews = () => {
  const [user, setUser] = useState(null);
  const [cookies, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      let data;
      try {
        data = await getUserProfile(cookies.token);
        setUser(data);
      } catch (e) {
        console.log(
          "Đăng nhập thường không thành công, thử đăng nhập Google..."
        );
        data = await getUserGoogleProfile(cookies.token);
        setUser(data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Activity />} />
        <Route path={"/account"} element={<Account />} />
        <Route
          path={"/blog"}
          element={
            user.role === "admin" || user.role === "author" ? (
              <CreateBlog />
            ) : (
              <Navigate to="/PageNotFound" replace />
            )
          }
        />
        <Route
          path={"/edit_blog/:id"}
          element={
            user.role === "admin" || user.role === "author" ? (
              <EditBlog />
            ) : (
              <Navigate to="/PageNotFound" replace />
            )
          }
        />
        <Route path={"/change-password"} element={<ChangePass />} />
        <Route path={"/nofitications"} element={<NofitiProfile />} />
        <Route path={"/message"} element={<Message />} />
      </Routes>
    </div>
  );
};

export default ProfileViews;