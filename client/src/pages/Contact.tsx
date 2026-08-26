import logo from "../assets/imgs/page/contact/logo.svg";
import contactImg from "../assets/imgs/page/contact/img.png";
import newsletterLeft from "../assets/imgs/template/newsletter-left.png";
import newsletterRight from "../assets/imgs/template/newsletter-right.png";

function Contact() {
  return (
    <>
      <main className="main">
        <section className="section-box">
          <div className="breacrumb-cover bg-img-about">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="mb-10">Contact Us</h2>
                  <p className="font-lg color-text-paragraph-2">
                    Get the latest news, updates and tips
                  </p>
                </div>
                <div className="col-lg-6 text-lg-end">
                  <ul className="breadcrumbs mt-40">
                    <li>
                      <a href="/" className="home-icon">
                        Home
                      </a>
                    </li>
                    <li>Contact Us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box mt-80">
          <div className="container">
            <div className="box-info-contact">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                  <a href="#">
                    <img src={logo} alt="joxBox" />
                  </a>
                  <div className="font-sm color-text-paragraph">
                    205 North Michigan Avenue, Suite 810 Chicago, 60601, USA
                    <br />
                    Phone: (123) 456-7890
                    <br />
                    Email: contact@jobbox.com
                  </div>
                  <a className="text-uppercase color-brand-2 link-map" href="#">
                    View map
                  </a>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                  <h6>London</h6>
                  <p className="font-sm color-text-paragraph mb-20">
                    2118 Thornridge Cir. Syracuse,
                    <br className="d-none d-lg-block" />
                    Connecticut 35624
                  </p>
                  <h6>New York</h6>
                  <p className="font-sm color-text-paragraph mb-20">
                    4517 Washington Ave.
                    <br className="d-none d-lg-block" />
                    Manchester, Kentucky 39495
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                  <h6>Chicago</h6>
                  <p className="font-sm color-text-paragraph mb-20">
                    3891 Ranchview Dr. Richardson,
                    <br className="d-none d-lg-block" />
                    California 62639
                  </p>
                  <h6>San Francisco</h6>
                  <p className="font-sm color-text-paragraph mb-20">
                    4140 Parker Rd. Allentown,
                    <br className="d-none d-lg-block" />
                    New Mexico 31134
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                  <h6>Sysney</h6>
                  <p className="font-sm color-text-paragraph mb-20">
                    3891 Ranchview Dr. Richardson,
                    <br className="d-none d-lg-block" />
                    California 62639
                  </p>
                  <h6>Singapore</h6>
                  <p className="font-sm color-text-paragraph mb-20">
                    4140 Parker Rd. Allentown,
                    <br className="d-none d-lg-block" />
                    New Mexico 31134
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box mt-70 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mb-40">
                <span className="font-md color-brand-2 mt-20 d-inline-block">
                  Contact us
                </span>
                <h2 className="mt-5 mb-10">Get in touch</h2>
                <p className="font-md color-text-paragraph-2">
                  The right move at the right time saves your investment. live
                  <br className="d-none d-lg-block" />
                  the dream of expanding your business.
                </p>
                <form
                  className="contact-form-style mt-30"
                  id="contact-form"
                  action="#"
                  method="post"
                >
                  <div
                    className="row wow animate__animated animate__fadeInUp"
                    data-wow-delay=".1s"
                  >
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="name"
                          placeholder="Enter your name"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="company"
                          placeholder="Comapy (optioanl)"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="email"
                          placeholder="Your email"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="phone"
                          placeholder="Phone number"
                          type="tel"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="textarea-style mb-30">
                        <textarea
                          className="font-sm color-text-paragraph-2"
                          name="message"
                          placeholder="Tell us about yourself"
                        ></textarea>
                      </div>
                      <button
                        className="submit btn btn-send-message"
                        type="submit"
                      >
                        Send message
                      </button>
                      <label className="ml-20">
                        <input
                          className="float-start mr-5 mt-6"
                          type="checkbox"
                        />{" "}
                        By clicking contact us button, you agree our terms and
                        policy,
                      </label>
                    </div>
                  </div>
                </form>
                <p className="form-messege"></p>
              </div>
              <div className="col-lg-4 text-center d-none d-lg-block">
                <img src={contactImg} alt="joxBox" />
              </div>
            </div>
          </div>
        </section>

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
                    <br />
                    Update Regularly
                  </h2>
                  <div className="box-form-newsletter mt-40">
                    <form className="form-newsletter">
                      <input
                        className="input-newsletter"
                        type="text"
                        value=""
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

export default Contact;
