import React, { useEffect, useState } from "react";

import logo from "../assets/imgs/page/contact/logo.svg";
import contactImg from "../assets/imgs/page/contact/img.png";
import newsletterLeft from "../assets/imgs/template/newsletter-left.png";
import newsletterRight from "../assets/imgs/template/newsletter-right.png";
import { createContactApi } from "../api/contact/contactApi.ts";



interface ContactForm {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const initialForm: ContactForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);

  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // =====================================
  // Initialize Contact Form
  // =====================================

  const initializeContactForm = () => {
    setForm(initialForm);

    setAgree(false);

    setSuccessMessage("");

    setErrorMessage("");
  };

  // =====================================
  // Handle Change
  // =====================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");

    setSuccessMessage("");
  };

  // =====================================
  // Submit Contact
  // =====================================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccessMessage("");

    setErrorMessage("");

    // =====================================
    // Validation
    // =====================================

    if (!form.name.trim()) {
      setErrorMessage("Name is required");
      return;
    }

    if (!form.email.trim()) {
      setErrorMessage("Email is required");
      return;
    }

    if (!form.phone.trim()) {
      setErrorMessage("Phone number is required");
      return;
    }

    if (!form.message.trim()) {
      setErrorMessage("Message is required");
      return;
    }

    if (!agree) {
      setErrorMessage("Please agree to our terms and policy");
      return;
    }

    try {
      setLoading(true);

      const response = await createContactApi({
        name: form.name.trim(),

        company: form.company.trim(),

        email: form.email.trim(),

        phone: form.phone.trim(),

        subject: form.message.trim(),
      });

      console.log("CONTACT CREATE RESPONSE:", response);

      setSuccessMessage(
        "Thank you! Your enquiry has been submitted successfully.",
      );

      setForm(initialForm);

      setAgree(false);
    } catch (error: any) {
      console.error("CONTACT SUBMIT ERROR:", error);

      setErrorMessage(
        error?.response?.data?.message ||
          "Failed to submit your enquiry. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // useEffect
  // =====================================

  useEffect(() => {
    initializeContactForm();
  }, []);

  return (
    <>
      <main className="main">
        {/* =====================================
            Contact Header
        ===================================== */}

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

        {/* =====================================
            Contact Information
        ===================================== */}

        <section className="section-box mt-80">
          <div className="container">
            <div className="box-info-contact">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                  <a href="#">
                    <img src={logo} alt="HireComfort" />
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

        {/* =====================================
            Contact Form
        ===================================== */}

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
                  onSubmit={handleSubmit}
                >
                  <div
                    className="row wow animate__animated animate__fadeInUp"
                    data-wow-delay=".1s"
                  >
                    {/* Name */}

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          type="text"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Company */}

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Company (optional)"
                          type="text"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Email */}

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          type="email"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Phone */}

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Phone number"
                          type="tel"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Message */}

                    <div className="col-lg-12 col-md-12">
                      <div className="textarea-style mb-30">
                        <textarea
                          className="font-sm color-text-paragraph-2"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about yourself"
                          disabled={loading}
                        />
                      </div>

                      {/* Success */}

                      {successMessage && (
                        <div className="alert alert-success mb-20">
                          {successMessage}
                        </div>
                      )}

                      {/* Error */}

                      {errorMessage && (
                        <div className="alert alert-danger mb-20">
                          {errorMessage}
                        </div>
                      )}

                      {/* Submit */}

                      <button
                        className="submit btn btn-send-message"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send message"}
                      </button>

                      {/* Terms */}

                      <label className="ml-20">
                        <input
                          className="float-start mr-5 mt-6"
                          type="checkbox"
                          checked={agree}
                          onChange={(e) => setAgree(e.target.checked)}
                          disabled={loading}
                        />{" "}
                        By clicking contact us button, you agree our terms and
                        policy.
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-lg-4 text-center d-none d-lg-block">
                <img src={contactImg} alt="HireComfort" />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================
            Newsletter
        ===================================== */}

        <section className="section-box mt-50 mb-20">
          <div className="container">
            <div className="box-newsletter">
              <div className="row">
                <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                  <img src={newsletterLeft} alt="HireComfort" />
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
                        placeholder="Enter your email here"
                      />

                      <button
                        className="btn btn-default font-heading icon-send-letter"
                        type="submit"
                      >
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>

                <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                  <img src={newsletterRight} alt="HireComfort" />
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
