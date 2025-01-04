import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <main>
      <Helmet>
        <title>Privacy Policy | Sports Blog</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="breadcrumbs mb-4">
                <Link to="/">Home</Link>
                <span className="mx-1">/</span>
                <Link to="#!">Privacy Policy</Link>
              </div>
            </div>
            <div className="col-lg-8 mx-auto mb-5 mb-lg-0">
              <h1 className="mb-4">Privacy Policy</h1>
              <div className="content">
                <h4 id="responsibility-of-contributors">
                  Responsibility of Contributors
                </h4>
                <p>
                  We value contributions to our platform. Contributors must
                  adhere to ethical standards, ensuring all submissions are
                  accurate and respectful. Content that violates intellectual
                  property rights or harms the reputation of others is strictly
                  prohibited.
                </p>
                <p>
                  Contributors are responsible for ensuring that their content
                  does not contain malicious code, harmful language, or
                  defamatory material. Violations may result in removal of
                  content and potential account suspension.
                </p>
                <h4 id="gathering-of-personal-information">
                  Gathering of Personal Information
                </h4>
                <p>
                  We collect personal information such as names, email
                  addresses, and browsing behavior to improve our services. All
                  data is gathered in compliance with relevant legal frameworks
                  and with user consent.
                </p>
                <p>
                  Your information helps us personalize your experience,
                  enhance site performance, and provide targeted content. We
                  maintain strict confidentiality and never share personal data
                  without your explicit permission.
                </p>
                <h4 id="protection-of-personal-information">
                  Protection of Personal Information
                </h4>
                <p>
                  Protecting your personal information is a priority. We
                  implement advanced security measures to safeguard data
                  against unauthorized access, alteration, or disclosure.
                </p>
                <p>
                  Regular audits and updates are conducted to ensure
                  high-security standards. In case of data breaches, affected
                  users will be notified promptly.
                </p>
                <h4 id="privacy-policy-changes">Privacy Policy Changes</h4>
                <ol>
                  <li>
                    Updates to the Privacy Policy will be posted on this page
                    with the updated revision date. Major changes will be
                    communicated through email notifications.
                  </li>
                  <li>
                    Users are encouraged to review the Privacy Policy regularly
                    to stay informed of any updates.
                  </li>
                  <li>
                    Continued use of our services after policy changes implies
                    acceptance of the updated terms.
                  </li>
                  <li>
                    For any questions about the Privacy Policy, feel free to
                    contact us through our support channels.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
