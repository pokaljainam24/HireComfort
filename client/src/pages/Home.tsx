import location1 from "../assets/imgs/page/homepage1/location1.png";
import location2 from "../assets/imgs/page/homepage1/location2.png";
import location3 from "../assets/imgs/page/homepage1/location3.png";
import location4 from "../assets/imgs/page/homepage1/location4.png";
import location5 from "../assets/imgs/page/homepage1/location5.png";
import location6 from "../assets/imgs/page/homepage1/location6.png";
import banner1 from "../assets/imgs/page/homepage1/banner1.png";
import banner2 from "../assets/imgs/page/homepage1/banner2.png";
import iconTopBanner from "../assets/imgs/page/homepage1/icon-top-banner.png";
import iconBottomBanner from "../assets/imgs/page/homepage1/icon-bottom-banner.png";
import HomePageSearchForm from "../components/HomePageSearchForm";
import CategoryCarousel from "../components/HomeSlider";
import { useEffect } from "react";
import Counter from "../components/Counter";
import TopRecruitersCarousel from "../components/TopRecruitersCarousel";
import NewsBlogCarousel from "../components/NewsBlogCarousel";
import brand1 from "../assets/imgs/brands/brand-1.png";
import brand2 from "../assets/imgs/brands/brand-2.png";
import brand3 from "../assets/imgs/brands/brand-3.png";
import brand4 from "../assets/imgs/brands/brand-4.png";
import brand5 from "../assets/imgs/brands/brand-5.png";
import brand6 from "../assets/imgs/brands/brand-6.png";
import brand7 from "../assets/imgs/brands/brand-7.png";
import brand8 from "../assets/imgs/brands/brand-8.png";
import management from "../assets/imgs/page/homepage1/management.svg";
import finance from "../assets/imgs/page/homepage1/finance.svg";
import customers from "../assets/imgs/page/homepage1/human.svg";
import retail from "../assets/imgs/page/homepage1/retail.svg";
import marketing from "../assets/imgs/page/homepage1/marketing.svg";
import newsletterLeft from "../assets/imgs/template/newsletter-left.png";
import newsletterRight from "../assets/imgs/template/newsletter-right.png";
import content from "../assets/imgs/page/homepage1/content.svg";
import imgChart from "../assets/imgs/page/homepage1/img-chart.png";
import controlCard from "../assets/imgs/page/homepage1/controlcard.png";
import img1 from "../assets/imgs/page/homepage1/img1.png";

function Home() {
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>(".count");

    const animateCounter = (element: HTMLElement) => {
      const target = parseInt(element.textContent || "0", 10);

      const duration = 400;
      const delay = 10;
      const steps = Math.ceil(duration / delay);
      const increment = target / steps;

      let current = 0;

      const updateCounter = () => {
        current += increment;

        if (current < target) {
          element.textContent = Math.floor(current).toString();
          setTimeout(updateCounter, delay);
        } else {
          element.textContent = target.toString();
        }
      };

      element.textContent = "0";
      setTimeout(updateCounter, delay);
    };

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);

            // Same behavior as triggerOnce: true
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    counters.forEach((counter) => {
      observer.observe(counter);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <main className="main">
        <div className="bg-homepage1"></div>
        <section className="section-box">
          <div className="banner-hero hero-1">
            <div className="banner-inner">
              <div className="row">
                <div className="col-xl-8 col-lg-12">
                  <div className="block-banner">
                    <h1 className="heading-banner wow animate__animated animate__fadeInUp">
                      The <span className="color-brand-2">Easiest Way</span>
                      <br className="d-none d-lg-block" />
                      to Get Your New Job
                    </h1>
                    <div
                      className="banner-description mt-20 wow animate__animated animate__fadeInUp"
                      data-wow-delay=".1s"
                    >
                      Each month, more than 3 million job seekers turn to
                      <br className="d-none d-lg-block" />
                      website in their search for work, making over 140,000
                      <br className="d-none d-lg-block" />
                      applications every single day
                    </div>
                    <div
                      className="form-find mt-40 wow animate__animated animate__fadeIn"
                      data-wow-delay=".2s"
                    >
                      <HomePageSearchForm />
                    </div>
                    <div
                      className="list-tags-banner mt-60 wow animate__animated animate__fadeInUp"
                      data-wow-delay=".3s"
                    >
                      <strong>Popular Searches:</strong>
                      <a href="#">Designer</a>,<a href="#">Web</a>,{" "}
                      <a href="#">IOS</a>,<a href="#">Developer</a>,{" "}
                      <a href="#">PHP</a>,<a href="#">Senior</a>,{" "}
                      <a href="#">Engineer</a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-12 d-none d-xl-block col-md-6">
                  <div className="banner-imgs">
                    <div className="block-1 shape-1">
                      <img
                        className="img-responsive"
                        alt="jobBox"
                        src={banner1}
                      />
                    </div>

                    <div className="block-2 shape-2">
                      <img
                        className="img-responsive"
                        alt="jobBox"
                        src={banner2}
                      />
                    </div>

                    <div className="block-3 shape-3">
                      <img
                        className="img-responsive"
                        alt="jobBox"
                        src={iconTopBanner}
                      />
                    </div>

                    <div className="block-4 shape-3">
                      <img
                        className="img-responsive"
                        alt="jobBox"
                        src={iconBottomBanner}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-100"></div>
        <section className="section-box mt-80">
          <div className="section-box wow animate__animated animate__fadeIn">
            <div className="container">
              <div className="text-center">
                <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                  Browse by category
                </h2>
                <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                  Find the job that&rsquo;s perfect for you. about 800+ new jobs
                  everyday
                </p>
              </div>
              <CategoryCarousel />
            </div>
          </div>
        </section>
        <div className="section-box mb-30">
          <div className="container">
            <div className="box-we-hiring">
              <div className="text-1">
                <span className="text-we-are">We are</span>
                <span className="text-hiring">Hiring</span>
              </div>
              <div className="text-2">
                Let&rsquo;s <span className="color-brand-1">Work</span> Together
                <br />
                &amp; <span className="color-brand-1">Explore</span>{" "}
                Opportunities
              </div>
              <div className="text-3">
                <div
                  className="btn btn-apply btn-apply-icon"
                  data-bs-toggle="modal"
                  data-bs-target="#ModalApplyJobForm"
                >
                  Apply now
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="section-box mt-50">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                Jobs of the day
              </h2>
              <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                Search and connect with the right candidates faster.
              </p>
              <div className="list-tabs mt-40">
                <ul className="nav nav-tabs" role="tablist">
                  <li>
                    <a
                      className="active"
                      id="nav-tab-job-1"
                      href="#tab-job-1"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="tab-job-1"
                      aria-selected="true"
                    >
                      <img src={management} alt="jobBox" />
                      Management
                    </a>
                  </li>
                  <li>
                    <a
                      id="nav-tab-job-2"
                      href="#tab-job-2"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="tab-job-2"
                      aria-selected="false"
                    >
                      <img src={marketing} alt="jobBox" />
                      Marketing &amp; Sale
                    </a>
                  </li>
                  <li>
                    <a
                      id="nav-tab-job-3"
                      href="#tab-job-3"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="tab-job-3"
                      aria-selected="false"
                    >
                      <img src={finance} alt="jobBox" />
                      Finance
                    </a>
                  </li>
                  <li>
                    <a
                      id="nav-tab-job-4"
                      href="#tab-job-4"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="tab-job-4"
                      aria-selected="false"
                    >
                      <img src={customers} alt="jobBox" />
                      Human Resource
                    </a>
                  </li>
                  <li>
                    <a
                      id="nav-tab-job-5"
                      href="#tab-job-5"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="tab-job-5"
                      aria-selected="false"
                    >
                      <img src={retail} alt="jobBox" />
                      Retail &amp; Products
                    </a>
                  </li>
                  <li>
                    <a
                      id="nav-tab-job-6"
                      href="#tab-job-6"
                      data-bs-toggle="tab"
                      role="tab"
                      aria-controls="tab-job-6"
                      aria-selected="false"
                    >
                      <img src={content} alt="jobBox" />
                      Content Writer
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-70">
              <div className="tab-content" id="myTabContent-1">
                <div
                  className="tab-pane fade show active"
                  id="tab-job-1"
                  role="tabpanel"
                  aria-labelledby="tab-job-1"
                >
                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand1} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              LinkedIn
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">UI / UX Designer fulltime</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Fulltime</span>
                            <span className="card-time">
                              4<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Adobe XD
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Figma
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Photoshop
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$500</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand2} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Adobe Ilustrator
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Full Stack Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Part time</span>
                            <span className="card-time">
                              5<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              React
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              NodeJS
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$800</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand3} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Bing Search
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Java Software Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Python
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              AWS
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Photoshop
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand4} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Dailymotion
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Frontend Developer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Typescript
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Java
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand5} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Linkedin
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">React Native Web Developer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Fulltime</span>
                            <span className="card-time">
                              4<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Angular
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$500</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand6} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Quora JSC
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Senior System Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Part time</span>
                            <span className="card-time">
                              5<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              PHP
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Android
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$800</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand7} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Nintendo
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Products Manager</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              ASP .Net
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Figma
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand8} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Periscope
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Lead Quality Control QA</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              iOS
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Laravel
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Golang
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tab-job-2"
                  role="tabpanel"
                  aria-labelledby="tab-job-2"
                >
                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand6} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Quora JSC
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Senior System Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Part time</span>
                            <span className="card-time">
                              5<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              PHP
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Android
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$800</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand7} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Nintendo
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Products Manager</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              ASP .Net
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Figma
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand4} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Dailymotion
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Frontend Developer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Typescript
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Java
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand5} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Linkedin
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">React Native Web Developer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Fulltime</span>
                            <span className="card-time">
                              4<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Angular
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$500</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand8} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Periscope
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Lead Quality Control QA</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              iOS
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Laravel
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Golang
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand1} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              LinkedIn
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">UI / UX Designer fulltime</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Fulltime</span>
                            <span className="card-time">
                              4<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Adobe XD
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Figma
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Photoshop
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$500</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand2} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Adobe Ilustrator
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Full Stack Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Part time</span>
                            <span className="card-time">
                              5<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              React
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              NodeJS
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$800</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand3} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Bing Search
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Java Software Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Python
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              AWS
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Photoshop
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tab-job-3"
                  role="tabpanel"
                  aria-labelledby="tab-job-3"
                >
                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand4} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Dailymotion
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Frontend Developer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Typescript
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Java
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand5} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Linkedin
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">React Native Web Developer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Fulltime</span>
                            <span className="card-time">
                              4<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Angular
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$500</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand6} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Quora JSC
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Senior System Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Part time</span>
                            <span className="card-time">
                              5<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              PHP
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Android
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$800</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand7} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Nintendo
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Products Manager</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              ASP .Net
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Figma
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand8} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Periscope
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Lead Quality Control QA</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              iOS
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Laravel
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Golang
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand1} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              LinkedIn
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">UI / UX Designer fulltime</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Fulltime</span>
                            <span className="card-time">
                              4<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Adobe XD
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Figma
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Photoshop
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$500</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand2} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Adobe Ilustrator
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Full Stack Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Part time</span>
                            <span className="card-time">
                              5<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              React
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              NodeJS
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$800</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand3} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Bing Search
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Java Software Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Python
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              AWS
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Photoshop
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tab-job-4"
                  role="tabpanel"
                  aria-labelledby="tab-job-4"
                >
                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand7} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Nintendo
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Products Manager</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              ASP .Net
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Figma
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand8} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Periscope
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Lead Quality Control QA</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              iOS
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Laravel
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Golang
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand4} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Dailymotion
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Frontend Developer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Typescript
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Java
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand5} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Linkedin
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">React Native Web Developer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Fulltime</span>
                            <span className="card-time">
                              4<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Angular
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$500</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand6} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Quora JSC
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Senior System Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Part time</span>
                            <span className="card-time">
                              5<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              PHP
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Android
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$800</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand1} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              LinkedIn
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">UI / UX Designer fulltime</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Fulltime</span>
                            <span className="card-time">
                              4<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Adobe XD
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Figma
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Photoshop
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$500</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand2} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Adobe Ilustrator
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Full Stack Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Part time</span>
                            <span className="card-time">
                              5<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              React
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              NodeJS
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$800</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand3} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Bing Search
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Java Software Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Python
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              AWS
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Photoshop
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tab-job-5"
                  role="tabpanel"
                  aria-labelledby="tab-job-5"
                >
                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand8} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Periscope
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Lead Quality Control QA</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              iOS
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Laravel
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Golang
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand1} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              LinkedIn
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">UI / UX Designer fulltime</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Fulltime</span>
                            <span className="card-time">
                              4<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Adobe XD
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Figma
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Photoshop
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$500</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand4} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Dailymotion
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Frontend Developer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Typescript
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Java
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand5} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Linkedin
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">React Native Web Developer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Fulltime</span>
                            <span className="card-time">
                              4<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Angular
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$500</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand6} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Quora JSC
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Senior System Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Part time</span>
                            <span className="card-time">
                              5<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              PHP
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Android
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$800</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand7} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Nintendo
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Products Manager</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              ASP .Net
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Figma
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand2} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Adobe Ilustrator
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Full Stack Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Part time</span>
                            <span className="card-time">
                              5<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              React
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              NodeJS
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$800</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand3} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Bing Search
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Java Software Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Python
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              AWS
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Photoshop
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tab-job-6"
                  role="tabpanel"
                  aria-labelledby="tab-job-6"
                >
                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand8} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Periscope
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Lead Quality Control QA</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              iOS
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Laravel
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Golang
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand1} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              LinkedIn
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">UI / UX Designer fulltime</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Fulltime</span>
                            <span className="card-time">
                              4<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Adobe XD
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Figma
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Photoshop
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$500</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand2} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Adobe Ilustrator
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Full Stack Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Part time</span>
                            <span className="card-time">
                              5<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              React
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              NodeJS
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$800</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand3} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Bing Search
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Java Software Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Python
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              AWS
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Photoshop
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand4} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Dailymotion
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Frontend Developer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Typescript
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Java
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand5} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Linkedin
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">React Native Web Developer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Fulltime</span>
                            <span className="card-time">
                              4<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="jobs-grid"
                            >
                              Angular
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$500</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand6} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Quora JSC
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Senior System Engineer</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Part time</span>
                            <span className="card-time">
                              5<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              PHP
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Android
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$800</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="card-grid-2 hover-up">
                        <div className="card-grid-2-image-left">
                          <span className="flash"></span>
                          <div className="image-box">
                            <img src={brand7} alt="jobBox" />
                          </div>
                          <div className="right-info">
                            <a className="name-job" href="company-details">
                              Nintendo
                            </a>
                            <span className="location-small">New York, US</span>
                          </div>
                        </div>
                        <div className="card-block-info">
                          <h6>
                            <a href="job-details">Products Manager</a>
                          </h6>
                          <div className="mt-5">
                            <span className="card-briefcase">Full time</span>
                            <span className="card-time">
                              6<span> minutes ago</span>
                            </span>
                          </div>
                          <p className="font-sm color-text-paragraph mt-15">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Recusandae architecto eveniet, dolor quo
                            repellendus pariatur.
                          </p>
                          <div className="mt-30">
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              ASP .Net
                            </a>
                            <a
                              className="btn btn-grey-small mr-5"
                              href="job-details"
                            >
                              Figma
                            </a>
                          </div>
                          <div className="card-2-bottom mt-30">
                            <div className="row">
                              <div className="col-lg-7 col-7">
                                <span className="card-text-price">$250</span>
                                <span className="text-muted">/Hour</span>
                              </div>
                              <div className="col-lg-5 col-5 text-end">
                                <div
                                  className="btn btn-apply-now"
                                  data-bs-toggle="modal"
                                  data-bs-target="#ModalApplyJobForm"
                                >
                                  Apply now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box overflow-visible mt-100 mb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="box-image-job">
                  <img className="img-job-1" alt="jobBox" src={imgChart} />
                  <img className="img-job-2" alt="jobBox" src={controlCard} />
                  <figure className="wow animate__animated animate__fadeIn">
                    <img alt="jobBox" src={img1} />
                  </figure>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="content-job-inner">
                  <span className="color-text-mutted text-32">
                    Millions Of Jobs.
                  </span>
                  <h2 className="text-52 wow animate__animated animate__fadeInUp">
                    Find The One That&rsquo;s
                    <span className="color-brand-2">Right</span> For You
                  </h2>
                  <div className="mt-40 pr-50 text-md-lh28 wow animate__animated animate__fadeInUp">
                    Search all the open positions on the web. Get your own
                    personalized salary estimate. Read reviews on over 600,000
                    companies worldwide. The right job is out there.
                  </div>
                  <div className="mt-40">
                    <div className="wow animate__animated animate__fadeInUp">
                      <a className="btn btn-default" href="jobs-grid">
                        Search Jobs
                      </a>
                      <a className="btn btn-link" href="page-about">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box overflow-visible mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="text-center">
                  <h1 className="color-brand-2">
                    <Counter value={25} />
                    <span> K+</span>
                  </h1>

                  <h5>Completed Cases</h5>

                  <p className="font-sm color-text-paragraph mt-10">
                    We always provide people a
                    <br className="d-none d-lg-block" />
                    complete solution upon focused of
                    <br className="d-none d-lg-block" />
                    any business
                  </p>
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="text-center">
                  <h1 className="color-brand-2">
                    <Counter value={17} />
                    <span> +</span>
                  </h1>

                  <h5>Our Office</h5>

                  <p className="font-sm color-text-paragraph mt-10">
                    We always provide people a
                    <br className="d-none d-lg-block" />
                    complete solution upon focused of{" "}
                    <br className="d-none d-lg-block" />
                    any business
                  </p>
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="text-center">
                  <h1 className="color-brand-2">
                    <Counter value={86} />
                    <span> +</span>
                  </h1>

                  <h5>Skilled People</h5>

                  <p className="font-sm color-text-paragraph mt-10">
                    We always provide people a
                    <br className="d-none d-lg-block" />
                    complete solution upon focused of{" "}
                    <br className="d-none d-lg-block" />
                    any business
                  </p>
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="text-center">
                  <h1 className="color-brand-2">
                    <Counter value={28} />
                    <span> +</span>
                  </h1>

                  <h5>CHappy Clients</h5>

                  <p className="font-sm color-text-paragraph mt-10">
                    We always provide people a
                    <br className="d-none d-lg-block" />
                    complete solution upon focused of
                    <br className="d-none d-lg-block" />
                    any business
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box mt-50">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                Top Recruiters
              </h2>
              <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                Discover your next career move, freelance gig, or internship
              </p>
            </div>
          </div>
          <div className="container">
            <TopRecruitersCarousel></TopRecruitersCarousel>
          </div>
        </section>

        <section className="section-box mt-50">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                Jobs by Location
              </h2>
              <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                Find your favourite jobs and get the benefits of yourself
              </p>
            </div>
          </div>
          <div className="container">
            <div className="row mt-50">
              <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                <div className="card-image-top hover-up">
                  <a href="jobs-grid">
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${location1})`,
                      }}
                    >
                      <span className="lbl-hot">Hot</span>
                    </div>
                  </a>
                  <div className="informations">
                    <a href="jobs-grid">
                      <h5>Paris, France</h5>
                    </a>
                    <div className="row">
                      <div className="col-lg-6 col-6">
                        <span className="text-14 color-text-paragraph-2">
                          5 Vacancy
                        </span>
                      </div>
                      <div className="col-lg-6 col-6 text-end">
                        <span className="color-text-paragraph-2 text-14">
                          120 companies
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-7 col-sm-12 col-12">
                <div className="card-image-top hover-up">
                  <a href="jobs-grid">
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${location2})`,
                      }}
                    >
                      <span className="lbl-hot">Trending</span>
                    </div>
                  </a>
                  <div className="informations">
                    <a href="jobs-grid">
                      <h5>London, England</h5>
                    </a>
                    <div className="row">
                      <div className="col-lg-6 col-6">
                        <span className="text-14 color-text-paragraph-2">
                          7 Vacancy
                        </span>
                      </div>
                      <div className="col-lg-6 col-6 text-end">
                        <span className="color-text-paragraph-2 text-14">
                          68 companies
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-7 col-sm-12 col-12">
                <div className="card-image-top hover-up">
                  <a href="jobs-grid">
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${location3})`,
                      }}
                    >
                      <span className="lbl-hot">Hot</span>
                    </div>
                  </a>
                  <div className="informations">
                    <a href="jobs-grid">
                      <h5>New York, USA</h5>
                    </a>
                    <div className="row">
                      <div className="col-lg-6 col-6">
                        <span className="text-14 color-text-paragraph-2">
                          9 Vacancy
                        </span>
                      </div>
                      <div className="col-lg-6 col-6 text-end">
                        <span className="color-text-paragraph-2 text-14">
                          80 companies
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12">
                <div className="card-image-top hover-up">
                  <a href="jobs-grid">
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${location4})`,
                      }}
                    ></div>
                  </a>
                  <div className="informations">
                    <a href="jobs-grid">
                      <h5>Amsterdam, Holland</h5>
                    </a>
                    <div className="row">
                      <div className="col-lg-6 col-6">
                        <span className="text-14 color-text-paragraph-2">
                          16 Vacancy
                        </span>
                      </div>
                      <div className="col-lg-6 col-6 text-end">
                        <span className="color-text-paragraph-2 text-14">
                          86 companies
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-7 col-sm-12 col-12">
                <div className="card-image-top hover-up">
                  <a href="jobs-grid">
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${location5})`,
                      }}
                    ></div>
                  </a>
                  <div className="informations">
                    <a href="jobs-grid">
                      <h5>Copenhagen, Denmark</h5>
                    </a>
                    <div className="row">
                      <div className="col-lg-6 col-6">
                        <span className="text-14 color-text-paragraph-2">
                          39 Vacancy
                        </span>
                      </div>
                      <div className="col-lg-6 col-6 text-end">
                        <span className="color-text-paragraph-2 text-14">
                          186 companies
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                <div className="card-image-top hover-up">
                  <a href="jobs-grid">
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${location6})`,
                      }}
                    ></div>
                  </a>
                  <div className="informations">
                    <a href="jobs-grid">
                      <h5>Berlin, Germany</h5>
                    </a>
                    <div className="row">
                      <div className="col-lg-6 col-6">
                        <span className="text-14 color-text-paragraph-2">
                          15 Vacancy
                        </span>
                      </div>
                      <div className="col-lg-6 col-6 text-end">
                        <span className="color-text-paragraph-2 text-14">
                          632 companies
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <NewsBlogCarousel></NewsBlogCarousel>
        <section className="section-box mt-50 mb-20">
          <div className="container">
            <div className="box-newsletter">
              <div className="row">
                <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                  <img src={newsletterLeft} alt="joxBox" />
                </div>
                <div className="col-lg-12 col-xl-6 col-12">
                  <h2 className="text-md-newsletter text-center">
                    New Things Will Always
                    <br /> Update Regularly
                  </h2>
                  <div className="box-form-newsletter mt-40">
                    <form className="form-newsletter">
                      <input
                        className="input-newsletter"
                        type="text"
                        defaultValue=""
                        placeholder="Enter your email here"
                      />
                      <button className="btn btn-default font-heading icon-send-letter">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                  <img src={newsletterRight} alt="joxBox" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
