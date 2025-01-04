import React from "react";
import IMAGES_CLEINT from "../../../assets/styles/client/images";
import IMAGES_CLEINT_POST from "../../../assets/styles/client/images/post";

const ClientView = () => {
  console.log(navigator)

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="row no-gutters-lg">
            <div className="col-12">
              <h2 className="section-title">Bài Viết Mới Nhất</h2>
            </div>
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="row">
                
                <div className="col-md-6 mb-4">
                  <article className="card article-card article-card-sm h-100">
                    <a href="article.html">
                      <div className="card-image">
                        <div className="post-info">
                          <span className="text-uppercase">03 Tháng 6 2021</span>
                          <span className="text-uppercase">2 Phút Trước</span>
                        </div>
                        <img
                          loading="lazy"
                          decoding="async"
                          src={IMAGES_CLEINT_POST.img_post2}
                          alt="Post Thumbnail"
                          className="w-100"
                        />
                      </div>
                    </a>
                    <div className="card-body px-0 pb-0">
                      <ul className="post-meta mb-2">
                        <li>
                          <a href="#!">du lịch</a>
                        </li>
                      </ul>
                      <h2>
                        <a className="post-title" href="article.html">
                          Hướng dẫn trải nghiệm để khám phá Vương quốc này
                        </a>
                      </h2>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna …
                      </p>
                      <div className="content">
                        <a className="read-more-btn" href="article.html">
                          Xem Đầy Đủ
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="col-md-6 mb-4">
                  <article className="card article-card article-card-sm h-100">
                    <a href="article.html">
                      <div className="card-image">
                        <div className="post-info">
                          <span className="text-uppercase">02 Tháng 6 2021</span>
                          <span className="text-uppercase">2 Phút Trước</span>
                        </div>
                        <img
                          loading="lazy"
                          decoding="async"
                          src={IMAGES_CLEINT_POST.img_ls2}
                          alt="Post Thumbnail"
                          className="w-100"
                        />
                      </div>
                    </a>
                    <div className="card-body px-0 pb-0">
                      <ul className="post-meta mb-2">
                        <li>
                          <a href="#!">Phong Cách</a>
                        </li>
                      </ul>
                      <h2>
                        <a className="post-title" href="article.html">
                          What to Do in Houston: Ideas for Your Visit
                        </a>
                      </h2>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna …
                      </p>
                      <div className="content">
                        <a className="read-more-btn" href="article.html">
                          Read Full Article
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="col-md-6 mb-4">
                  <article className="card article-card article-card-sm h-100">
                    <a href="article.html">
                      <div className="card-image">
                        <div className="post-info">
                          <span className="text-uppercase">01 Jun 2021</span>
                          <span className="text-uppercase">3 minutes read</span>
                        </div>
                        <img
                          loading="lazy"
                          decoding="async"
                          src={IMAGES_CLEINT_POST.img_cr1}
                          alt="Post Thumbnail"
                          className="w-100"
                        />
                      </div>
                    </a>
                    <div className="card-body px-0 pb-0">
                      <ul className="post-meta mb-2">
                        <li>
                          <a href="#!">cruises</a>
                          <a href="#!">news</a>
                        </li>
                      </ul>
                      <h2>
                        <a className="post-title" href="article.html">
                          Alaska Cruises Will Restart as Biden Signs New Tourism
                          Law
                        </a>
                      </h2>
                      <p className="card-text">
                        Heading Here is example of hedings. You can use this
                        heading by following markdownify rules. For example: use
                        # for …
                      </p>
                      <div className="content">
                        <a className="read-more-btn" href="article.html">
                          Read Full Article
                        </a>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="col-md-6 mb-4">
                  <article className="card article-card article-card-sm h-100">
                    <a href="article.html">
                      <div className="card-image">
                        <div className="post-info">
                          <span className="text-uppercase">30 May 2021</span>
                          <span className="text-uppercase">3 minutes read</span>
                        </div>
                        <img
                          loading="lazy"
                          decoding="async"
                          src={IMAGES_CLEINT_POST.img_cr2}
                          alt="Post Thumbnail"
                          className="w-100"
                        />
                      </div>
                    </a>
                    <div className="card-body px-0 pb-0">
                      <ul className="post-meta mb-2">
                        <li>
                          <a href="#!">cruises</a>
                          <a href="#!">news</a>
                        </li>
                      </ul>
                      <h2>
                        <a className="post-title" href="article.html">
                          U.S. Travel Association Calls on CDC to Remove Cruise
                          Restrictions
                        </a>
                      </h2>
                      <p className="card-text">
                        Heading Here is example of hedings. You can use this
                        heading by following markdownify rules. For example: use
                        # for …
                      </p>
                      <div className="content">
                        <a className="read-more-btn" href="article.html">
                          Read Full Article
                        </a>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="col-md-6 mb-4">
                  <article className="card article-card article-card-sm h-100">
                    <a href="article.html">
                      <div className="card-image">
                        <div className="post-info">
                          <span className="text-uppercase">29 May 2021</span>
                          <span className="text-uppercase">3 minutes read</span>
                        </div>
                        <img
                          loading="lazy"
                          decoding="async"
                          src={IMAGES_CLEINT_POST.img_post4}
                          alt="Post Thumbnail"
                          className="w-100"
                        />
                      </div>
                    </a>
                    <div className="card-body px-0 pb-0">
                      <ul className="post-meta mb-2">
                        <li>
                          <a href="#!">destination</a>
                        </li>
                      </ul>
                      <h2>
                        <a className="post-title" href="article.html">
                          Top 7 Reasons to Visit Denver This Summer
                        </a>
                      </h2>
                      <p className="card-text">
                        Heading Here is example of hedings. You can use this
                        heading by following markdownify rules. For example: use
                        # for …
                      </p>
                      <div className="content">
                        <a className="read-more-btn" href="article.html">
                          Read Full Article
                        </a>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="col-md-6 mb-4">
                  <article className="card article-card article-card-sm h-100">
                    <a href="article.html">
                      <div className="card-image">
                        <div className="post-info">
                          <span className="text-uppercase">28 May 2021</span>
                          <span className="text-uppercase">2 Phút Trước</span>
                        </div>
                        <img
                          loading="lazy"
                          decoding="async"
                          src={IMAGES_CLEINT_POST.img_post8}
                          alt="Post Thumbnail"
                          className="w-100"
                        />
                      </div>
                    </a>
                    <div className="card-body px-0 pb-0">
                      <ul className="post-meta mb-2">
                        <li>
                          <a href="#!">news</a>
                          <a href="#!">tips</a>
                        </li>
                      </ul>
                      <h2>
                        <a className="post-title" href="article.html">
                          An Experiential Guide to Explore This Kingdom
                        </a>
                      </h2>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna …
                      </p>
                      <div className="content">
                        <a className="read-more-btn" href="article.html">
                          Read Full Article
                        </a>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <nav className="mt-4">
                        {/* pagination */}
                        <nav className="mb-md-50">
                          <ul className="pagination justify-content-center">
                            <li className="page-item">
                              <a
                                className="page-link"
                                href="#!"
                                aria-label="Pagination Arrow"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="26"
                                  height="26"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                                  />
                                </svg>
                              </a>
                            </li>
                            <li className="page-item active ">
                              <a href="index.html" className="page-link">
                                1
                              </a>
                            </li>
                            <li className="page-item">
                              <a href="#!" className="page-link">
                                2
                              </a>
                            </li>
                            <li className="page-item">
                              <a
                                className="page-link"
                                href="#!"
                                aria-label="Pagination Arrow"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="26"
                                  height="26"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                                  />
                                </svg>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </nav>
                    </div>
                  </div>
                </div>
                {/* Continue adding more articles as needed */}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="widget-blocks">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="widget">
                      <div className="widget-body">
                        <img
                          loading="lazy"
                          decoding="async"
                          src={IMAGES_CLEINT.img_author}
                          alt="About Me"
                          className="w-100 author-thumb-sm d-block"
                        />
                        <h2 className="widget-title my-3">Hootan Safiyari</h2>
                        <p className="mb-3 pb-2">
                          Hello, I’m Hootan Safiyari. A Content writer,
                          Developer, and Storyteller. Working as a Content
                          writer at CoolTech Agency. Quam nihil …
                        </p>
                        <a
                          href="about.html"
                          className="btn btn-sm btn-outline-primary"
                        >
                          Know More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="widget">
                      <h2 className="section-title mb-3">Recommended</h2>
                      <div className="widget-body">
                        <div className="widget-list">
                          <article className="card mb-4">
                            <div className="card-image">
                              <div className="post-info">
                                <span className="text-uppercase">
                                  1 minutes read
                                </span>
                              </div>
                              <img
                                loading="lazy"
                                decoding="async"
                                src={IMAGES_CLEINT_POST.img_post9}
                                alt="Post Thumbnail"
                                className="w-100"
                              />
                            </div>
                            <div className="card-body px-0 pb-1">
                              <h3>
                                <a
                                  className="post-title post-title-sm"
                                  href="article.html"
                                >
                                  Portugal and France Now Allow Unvaccinated
                                  Tourists
                                </a>
                              </h3>
                              <p className="card-text">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor …
                              </p>
                              <div className="content">
                                <a
                                  className="read-more-btn"
                                  href="article.html"
                                >
                                  Read Full Article
                                </a>
                              </div>
                            </div>
                          </article>
                          <a
                            className="media align-items-center"
                            href="article.html"
                          >
                            <img
                              loading="lazy"
                              decoding="async"
                              src={IMAGES_CLEINT_POST.img_post2}
                              alt="Post Thumbnail"
                              className="w-100"
                            />
                            <div className="media-body ml-3">
                              <h3 style={{ marginTop: "-5px" }}>
                                These Are Making It Easier To Visit
                              </h3>
                              <p className="mb-0 small">
                                Heading Here is example of hedings. You can use
                                …
                              </p>
                            </div>
                          </a>
                          <hr className="my-4" />

                          <a
                            className="media align-items-center"
                            href="article.html"
                          >
                            <span className="image-fallback image-fallback-xs">
                              No Image Specified
                            </span>
                            <div className="media-body ml-3">
                              <h3 style={{ marginTop: "-5px" }}>
                                No Image specified
                              </h3>
                              <p className="mb-0 small">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing …
                              </p>
                            </div>
                          </a>
                          <hr className="my-4" />

                          <a
                            className="media align-items-center"
                            href="article.html"
                          >
                            <img
                              loading="lazy"
                              decoding="async"
                              src={IMAGES_CLEINT_POST.img_post5}
                              alt="Post Thumbnail"
                              className="w-100"
                            />
                            <div className="media-body ml-3">
                              <h3 style={{ marginTop: "-5px" }}>
                                Perfect For Fashion
                              </h3>
                              <p className="mb-0 small">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing …
                              </p>
                            </div>
                          </a>
                          <hr className="my-4" />

                          <a
                            className="media align-items-center"
                            href="article.html"
                          >
                            <img
                              loading="lazy"
                              decoding="async"
                              src={IMAGES_CLEINT_POST.img_post9}
                              alt="Post Thumbnail"
                              className="w-100"
                            />
                            <div className="media-body ml-3">
                              <h3 style={{ marginTop: "-5px" }}>
                                Record Utra Smooth Video
                              </h3>
                              <p className="mb-0 small">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing …
                              </p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-6">
                    <div className="widget">
                      <h2 className="section-title mb-3">Categories</h2>
                      <div className="widget-body">
                        <ul className="widget-list">
                          <li>
                            <a href="#!">
                              computer<span className="ml-auto">(3)</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              cruises<span className="ml-auto">(2)</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              destination<span className="ml-auto">(1)</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              internet<span className="ml-auto">(4)</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              Phong Cách<span className="ml-auto">(2)</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              news<span className="ml-auto">(5)</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              telephone<span className="ml-auto">(1)</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              tips<span className="ml-auto">(1)</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              travel<span className="ml-auto">(3)</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              website<span className="ml-auto">(4)</span>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              hugo<span className="ml-auto">(2)</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ClientView;
