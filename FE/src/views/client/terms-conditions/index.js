import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const TermsConditions = () => {
  return (
    <main>
      <Helmet>
        <title> Terms and Conditions | Sports Blog</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="breadcrumbs mb-4">
                <Link to="/">Home</Link>
                <span className="mx-1">/</span>
                <a
                  href="https://reporter-hugo.netlify.app/terms-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </a>
              </div>
            </div>
            <div className="col-lg-8 mx-auto mb-5 mb-lg-0">
              <h1 className="mb-4">Terms and Conditions</h1>
              <div className="content">
                <h4 id="responsibility-of-contributors">
                  Responsibility of Contributors
                </h4>
                <p>
                  Contributors to this platform are expected to adhere to high
                  ethical standards. Submissions must be accurate, original, and
                  free from defamatory or harmful content. We reserve the right
                  to review and remove any contributions that do not meet these
                  guidelines.
                </p>
                <p>
                  Contributors should ensure their work complies with all
                  applicable laws and does not infringe upon intellectual
                  property rights. Violations may result in the removal of
                  content and potential suspension of accounts.
                </p>
                <h4 id="gathering-of-personal-information">
                  Gathering of Personal Information
                </h4>
                <p>
                  We collect personal information such as names, email
                  addresses, and usage data to improve our services. All
                  information is collected in compliance with legal frameworks
                  and with the consent of users.
                </p>
                <p>
                  This information helps us provide personalized experiences and
                  better services. We do not share your personal data with third
                  parties without your explicit consent.
                </p>
                <h4 id="protection-of-personal-information">
                  Protection of Personal Information
                </h4>
                <p>
                  Protecting your personal information is a priority. We use
                  advanced security measures to safeguard your data against
                  unauthorized access, alteration, or misuse.
                </p>
                <p>
                  Regular updates and audits ensure our security practices
                  remain effective. In the event of a data breach, affected
                  users will be notified promptly.
                </p>
                <h4 id="privacy-policy-changes">
                  Changes to Terms and Conditions
                </h4>
                <ol>
                  <li>
                    All products are designed to receive the latest updates, and
                    we ensure thorough testing to maintain quality.
                  </li>
                  <li>
                    Comments or content that threaten or harm the reputation of
                    any individual or organization will not be tolerated.
                  </li>
                  <li>
                    Personal information, including but not limited to email
                    addresses and phone numbers, will be handled with strict
                    confidentiality.
                  </li>
                  <li>
                    Users will be automatically notified of major updates or
                    changes to the terms.
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

export default TermsConditions;
