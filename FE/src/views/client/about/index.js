import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import LogoAdmin from "../../../assets/images/logo.jpg";

const About = () => {
  return (
    <main>
      <Helmet>
        <title>About Us | Sports Blog</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="breadcrumbs mb-4">
                <Link to="/">Home</Link>
                <span className="mx-1">/</span>
                <Link to="#!">About us</Link>
              </div>
            </div>
            <div className="col-lg-8 mx-auto mb-5 mb-lg-0">
              <div className="text-center">
                <img
                  loading="lazy"
                  decoding="async"
                  src={LogoAdmin}
                  className="img-fluid w-50 mb-4 text-center"
                  alt="Author"
                />
              </div>

              <h1 className="mb-4">Welcome to Our Sports Blog</h1>
              <div className="content">
                <p>
                  At **Sports Blog**, our mission is simple: to celebrate the
                  beauty, passion, and power of sports. Whether it's the roar of
                  the crowd during a football final, the intensity of a
                  basketball playoff, or the finesse of a tennis championship,
                  sports bring people together like nothing else.
                </p>
                <p>
                  Our blog is a hub for sports enthusiasts who want to stay
                  informed, entertained, and inspired. We cover a wide range of
                  topics, including:
                </p>
                <ul>
                  <li>Breaking news and updates from the sports world.</li>
                  <li>In-depth game analyses and post-match reviews.</li>
                  <li>Player profiles and behind-the-scenes stories.</li>
                  <li>Fitness tips and strategies inspired by athletes.</li>
                  <li>Opinion pieces on trends and controversies in sports.</li>
                </ul>
                <blockquote>
                  <p>
                    “Sports has the power to change the world. It has the power
                    to inspire. It has the power to unite people in a way that
                    little else does.” – Nelson Mandela
                  </p>
                </blockquote>
                <p>
                  Whether you're a die-hard fan, an aspiring athlete, or
                  someone who simply enjoys the occasional game, our blog aims
                  to offer something for everyone. We take pride in sharing not
                  just the scores, but the stories – the triumphs, the
                  heartbreaks, the comebacks, and the moments that define sports
                  history.
                </p>
                <p>
                  Our team consists of experienced writers and analysts who
                  share a passion for sports. With years of experience in
                  journalism, content creation, and sports coverage, we strive
                  to bring you articles that are informative, engaging, and
                  thought-provoking. From the biggest global tournaments to
                  grassroots initiatives that foster talent, we aim to shine a
                  spotlight on all levels of the sports ecosystem.
                </p>
                <h2 className="mt-4">Why We Love Sports</h2>
                <p>
                  Sports are more than just games; they are a reflection of
                  humanity's unyielding spirit. They teach us the value of
                  teamwork, discipline, perseverance, and fair play. They show
                  us that failure is a stepping stone to success and that dreams
                  are worth chasing. From witnessing record-breaking
                  performances to feeling the emotional highs and lows of a
                  close match, sports evoke emotions that are hard to put into
                  words.
                </p>
                <p>
                  Every athlete has a story, and every match has moments of
                  brilliance that deserve to be celebrated. At Sports Blog, we
                  are dedicated to capturing these stories and sharing them with
                  you.
                </p>
                <h2 className="mt-4">Join the Conversation</h2>
                <p>
                  We believe that sports are best enjoyed as a community. That's
                  why we encourage our readers to join the conversation. Share
                  your thoughts, engage with fellow fans, and become part of our
                  growing community. Whether you agree with our analysis or have
                  a different perspective, your voice matters here.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
