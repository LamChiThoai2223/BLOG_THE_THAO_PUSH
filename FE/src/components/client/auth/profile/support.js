import React from "react";
import ProfileSidebar from "../../../../components/client/auth/profile/sidebar";
import { Helmet } from "react-helmet";

const Support = () => {
  return (
    <div className="container mt-5">
      <Helmet>
        <title>Account Support</title>
      </Helmet>
      <div className="author-client user-profile">
        <div className="row">
          <ProfileSidebar />
          <div className="col-md-8 backG-proflie">
            <span className="profile-info-author-title">Account Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
