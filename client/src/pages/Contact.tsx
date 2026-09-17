import React, { useState } from "react";
import Swal from "sweetalert2";

import logo from "../assets/imgs/page/contact/logo.svg";
import contactImg from "../assets/imgs/page/contact/img.png";
import newsletterLeft from "../assets/imgs/template/newsletter-left.png";
import newsletterRight from "../assets/imgs/template/newsletter-right.png";

import {
  createContactApi,
  sendContactOtpApi,
  verifyContactOtpApi,
} from "../api/contact/contactApi.ts";


// =====================================
// Contact Form Interface
// =====================================

interface ContactForm {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

// =====================================
// Initial Form
// =====================================

const initialForm: ContactForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

// =====================================
// Contact Component
// =====================================

function Contact() {
  // =====================================
  // Form State
  // =====================================

  const [form, setForm] =
    useState<ContactForm>(initialForm);

  // =====================================
  // Terms State
  // =====================================

  const [agree, setAgree] =
    useState(false);

  // =====================================
  // Loading State
  // =====================================

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // OTP States
  // =====================================

  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [emailVerified, setEmailVerified] =
    useState(false);

  const [verificationToken, setVerificationToken] =
    useState("");

  const [resendSeconds, setResendSeconds] =
    useState(0);

  const [showMap, setShowMap] = useState(false);

  // =====================================
  // SweetAlert Success Toast
  // =====================================

  const showSuccess = (message: string) => {
    Swal.fire({
      toast: true,
      position: "top-end",

      icon: "success",

      title: message,

      showConfirmButton: false,

      timer: 5000,

      timerProgressBar: true,

      background: "#a5dc86",

      color: "#ffffff",

      customClass: {
        popup: "custom-success-toast",
        title: "custom-success-title",
        icon: "custom-success-icon",
      },
    });
  };

  // =====================================
  // SweetAlert Error Toast
  // =====================================

  const showError = (message: string) => {
    Swal.fire({
      toast: true,
      position: "top-end",

      icon: "error",

      title: message,

      showConfirmButton: false,

      timer: 5000,

      timerProgressBar: true,

      customClass: {
        popup: "custom-error-toast",
        title: "custom-error-title",
      },
    });
  };

  // =====================================
  // SweetAlert Warning Toast
  // =====================================

  const showWarning = (message: string) => {
    Swal.fire({
      toast: true,
      position: "top-end",

      icon: "warning",

      title: message,

      showConfirmButton: false,

      timer: 5000,

      timerProgressBar: true,

      customClass: {
        popup: "custom-warning-toast",
        title: "custom-warning-title",
      },
    });
  };

  // =====================================
  // Reset Form
  // =====================================

  const resetContactForm = () => {
    setForm(initialForm);

    setAgree(false);

    setLoading(false);

    setOtp("");

    setOtpSent(false);

    setEmailVerified(false);

    setVerificationToken("");

    setResendSeconds(0);
  };

  // =====================================
  // Handle Form Change
  // =====================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // =====================================
    // If Email Changes
    // Previous OTP becomes invalid
    // =====================================

    if (name === "email") {
      setOtp("");

      setOtpSent(false);

      setEmailVerified(false);

      setVerificationToken("");

      setResendSeconds(0);
    }
  };

  // =====================================
  // Start Resend Timer
  // =====================================

  const beginResendTimer = () => {
    setResendSeconds(60);

    const countdown = () => {
      setResendSeconds((prev) => {
        if (prev <= 1) {
          return 0;
        }

        window.setTimeout(
          countdown,
          1000
        );

        return prev - 1;
      });
    };

    window.setTimeout(
      countdown,
      1000
    );
  };

  // =====================================
  // Send OTP
  // =====================================

  const handleSendOtp = async () => {
    const email =
      form.email
        .trim()
        .toLowerCase();

    // =====================================
    // Email Required
    // =====================================

    if (!email) {
      showError(
        "Email is required."
      );

      return false;
    }

    // =====================================
    // Email Validation
    // =====================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showError(
        "Please enter a valid email address."
      );

      return false;
    }

    // =====================================
    // Resend Timer
    // =====================================

    if (resendSeconds > 0) {
      showWarning(
        `Please wait ${resendSeconds} seconds before requesting another OTP.`
      );

      return false;
    }

    try {
      setLoading(true);

      // =====================================
      // API Call
      // =====================================

      const response =
        await sendContactOtpApi(
          email
        );

      console.log(
        "SEND OTP RESPONSE:",
        response
      );

      // =====================================
      // OTP State
      // =====================================

      setOtpSent(true);

      setEmailVerified(false);

      setVerificationToken("");

      setOtp("");

      // =====================================
      // Start 60 Seconds Timer
      // =====================================

      beginResendTimer();

      // =====================================
      // Success Toast
      // =====================================

      showSuccess(
        "A 6-digit OTP has been sent to your email address."
      );

      return true;
    } catch (error: any) {
      console.error(
        "SEND OTP ERROR:",
        error
      );

      showError(
        error?.response?.data?.message ||
        "Failed to send OTP. Please try again."
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Verify OTP + Send Message
  // =====================================

  const handleVerifyAndSubmit =
    async () => {
      const email =
        form.email
          .trim()
          .toLowerCase();

      const cleanOtp =
        otp.trim();

      // =====================================
      // OTP Validation
      // =====================================

      if (!cleanOtp) {
        showError(
          "Please enter the 6-digit OTP."
        );

        return;
      }

      if (
        !/^\d{6}$/.test(
          cleanOtp
        )
      ) {
        showError(
          "OTP must be exactly 6 digits."
        );

        return;
      }

      // =====================================
      // Form Validation
      // =====================================

      if (!form.name.trim()) {
        showError(
          "Name is required."
        );

        return;
      }

      if (!form.phone.trim()) {
        showError(
          "Phone number is required."
        );

        return;
      }

      if (!form.message.trim()) {
        showError(
          "Message is required."
        );

        return;
      }

      if (!agree) {
        showWarning(
          "Please agree to our terms and policy."
        );

        return;
      }

      try {
        setLoading(true);

        // =====================================
        // STEP 1
        // Verify OTP
        // =====================================

        const verifyResponse =
          await verifyContactOtpApi(
            email,
            cleanOtp
          );

        console.log(
          "VERIFY OTP RESPONSE:",
          verifyResponse
        );

        // =====================================
        // Get Verification Token
        // =====================================

        const token =
          verifyResponse?.verificationToken ||
          verifyResponse?.token;

        if (!token) {
          throw new Error(
            "Verification token was not returned by server."
          );
        }

        // =====================================
        // Email Verified
        // =====================================

        setVerificationToken(
          token
        );

        setEmailVerified(
          true
        );

        // =====================================
        // STEP 2
        // Send Contact Message
        // =====================================

        const contactResponse =
          await createContactApi({
            name:
              form.name.trim(),

            company:
              form.company.trim(),

            email,

            phone:
              form.phone.trim(),

            subject:
              form.message.trim(),

            verificationToken:
              token,
          });

        console.log(
          "CONTACT CREATE RESPONSE:",
          contactResponse
        );

        // =====================================
        // Success Toast
        // =====================================

        showSuccess(
          "Your message has been sent successfully. Thank you for contacting us!"
        );

        // =====================================
        // Reset Form
        // =====================================

        resetContactForm();
      } catch (error: any) {
        console.error(
          "VERIFY / CONTACT ERROR:",
          error
        );

        setEmailVerified(
          false
        );

        setVerificationToken(
          ""
        );

        showError(
          error?.response?.data?.message ||
          error?.message ||
          "Invalid or expired OTP. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

  // =====================================
  // Main Submit
  // =====================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // =====================================
    // Name
    // =====================================

    if (!form.name.trim()) {
      showError(
        "Name is required."
      );

      return;
    }

    // =====================================
    // Email
    // =====================================

    if (!form.email.trim()) {
      showError(
        "Email is required."
      );

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        form.email.trim()
      )
    ) {
      showError(
        "Please enter a valid email address."
      );

      return;
    }

    // =====================================
    // Phone
    // =====================================

    if (!form.phone.trim()) {
      showError(
        "Phone number is required."
      );

      return;
    }

    // =====================================
    // Message
    // =====================================

    if (!form.message.trim()) {
      showError(
        "Message is required."
      );

      return;
    }

    // =====================================
    // Terms
    // =====================================

    if (!agree) {
      showWarning(
        "Please agree to our terms and policy."
      );

      return;
    }

    // =====================================
    // FIRST CLICK
    // Send OTP
    // =====================================

    if (!otpSent) {
      await handleSendOtp();

      return;
    }

    // =====================================
    // SECOND CLICK
    // Verify OTP + Send Message
    // =====================================

    if (!emailVerified) {
      await handleVerifyAndSubmit();

      return;
    }

    // =====================================
    // Safety
    // =====================================

    if (!verificationToken) {
      showError(
        "Please verify your email with OTP."
      );

      return;
    }
  };

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

                  <h2 className="mb-10">
                    Contact Us
                  </h2>

                  <p className="font-lg color-text-paragraph-2">
                    Get the latest news, updates and tips
                  </p>

                </div>

                <div className="col-lg-6 text-lg-end">

                  <ul className="breadcrumbs mt-40">

                    <li>
                      <a
                        href="/"
                        className="home-icon"
                      >
                        Home
                      </a>
                    </li>

                    <li>
                      Contact Us
                    </li>

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

                {/* =====================================
                    Main Office
                ===================================== */}

                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">

                  <a href="/">
                    <img
                      src={logo}
                      alt="HireComfort"
                    />
                  </a>

                  <div className="font-sm color-text-paragraph mt-20">

                    <strong>
                      HireComfort
                    </strong>

                    <br />

                    205 North Michigan Avenue,
                    Suite 810

                    <br />

                    Chicago, 60601, USA

                    <br />
                    <br />

                    <strong>
                      Phone:
                    </strong>{" "}
                    (123) 456-7890

                    <br />

                    <strong>
                      Email:
                    </strong>{" "}
                    contact@jobbox.com

                  </div>

                  <button
                    type="button"
                    className="btn btn-link fw-bold fs-6 text-uppercase color-brand-2 link-map mt-15 d-inline-block p-0 text-decoration-none"
                    onClick={() => setShowMap(true)}
                  >
                    View map
                  </button>

                </div>

                {/* =====================================
                    London / New York
                ===================================== */}

                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">

                  <h6>
                    London
                  </h6>

                  <p className="font-sm color-text-paragraph mb-20">
                    2118 Thornridge Cir.
                    Syracuse,

                    <br />

                    Connecticut 35624
                  </p>

                  <h6>
                    New York
                  </h6>

                  <p className="font-sm color-text-paragraph mb-20">
                    4517 Washington Ave.

                    <br />

                    Manchester,
                    Kentucky 39495
                  </p>

                </div>

                {/* =====================================
                    Chicago / San Francisco
                ===================================== */}

                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">

                  <h6>
                    Chicago
                  </h6>

                  <p className="font-sm color-text-paragraph mb-20">
                    3891 Ranchview Dr.
                    Richardson,

                    <br />

                    California 62639
                  </p>

                  <h6>
                    San Francisco
                  </h6>

                  <p className="font-sm color-text-paragraph mb-20">
                    4140 Parker Rd.
                    Allentown,

                    <br />

                    New Mexico 31134
                  </p>

                </div>

                {/* =====================================
                    Sydney / Singapore
                ===================================== */}

                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">

                  <h6>
                    Sydney
                  </h6>

                  <p className="font-sm color-text-paragraph mb-20">
                    3891 Ranchview Dr.
                    Richardson,

                    <br />

                    California 62639
                  </p>

                  <h6>
                    Singapore
                  </h6>

                  <p className="font-sm color-text-paragraph mb-20">
                    4140 Parker Rd.
                    Allentown,

                    <br />

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
            {showMap && (
              <div className="contact-map-box mb-50">
                <div className="d-flex justify-content-between align-items-center mb-20">
                  <h3 className="mb-0">Our Location</h3>

                  <button
                    type="button"
                    className="btn contact-map-close"
                    onClick={() => setShowMap(false)}
                    aria-label="Close map"
                    title="Close map"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>

                <div
                  className="ratio ratio-21x9"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps?q=205+North+Michigan+Avenue+Suite+810+Chicago+60601+USA&output=embed"
                    style={{
                      border: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="HireComfort Location"
                  ></iframe>
                </div>
              </div>
            )}

            <div className="row">

              {/* =====================================
                  Form
              ===================================== */}

              <div className="col-lg-8 mb-40">

                <span className="font-md color-brand-2 mt-20 d-inline-block">
                  Contact us
                </span>

                <h2 className="mt-5 mb-10">
                  Get in touch
                </h2>

                <p className="font-md color-text-paragraph-2">
                  The right move at the right time saves
                  your investment.

                  <br className="d-none d-lg-block" />

                  Live the dream of expanding your business.
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

                    {/* =====================================
                        Name
                    ===================================== */}

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

                    {/* =====================================
                        Company
                    ===================================== */}

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

                    {/* =====================================
                        Email
                    ===================================== */}

                    <div className="col-lg-6 col-md-6">

                      <div className="input-style mb-20">

                        <input
                          className="font-sm color-text-paragraph-2"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          type="email"
                          disabled={
                            loading ||
                            emailVerified
                          }
                        />

                      </div>

                    </div>

                    {/* =====================================
                        Phone
                    ===================================== */}

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

                    {/* =====================================
                        Message
                    ===================================== */}

                    <div className="col-lg-12">

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

                    </div>

                    {/* =====================================
                        OTP
                    ===================================== */}

                    {otpSent &&
                      !emailVerified && (
                        <div className="col-lg-6 col-md-6">

                          <div className="input-style mb-20">

                            <input
                              className="font-sm color-text-paragraph-2 contact-otp-input"
                              name="otp"
                              value={otp}
                              onChange={(e) => {

                                const value =
                                  e.target.value
                                    .replace(
                                      /\D/g,
                                      ""
                                    )
                                    .slice(
                                      0,
                                      6
                                    );

                                setOtp(value);

                              }}
                              placeholder="Enter 6-digit OTP"
                              type="text"
                              inputMode="numeric"
                              maxLength={6}
                              disabled={loading}
                            />

                          </div>

                        </div>
                      )}

                    {/* =====================================
                        OTP Information
                    ===================================== */}

                    {otpSent &&
                      !emailVerified && (
                        <div className="col-lg-6 col-md-6">

                          <div className="contact-otp-info mb-20">

                            <strong>
                              OTP sent successfully
                            </strong>

                            <br />

                            <span>
                              Check your email and
                              enter the 6-digit OTP.
                            </span>

                            {resendSeconds > 0 && (
                              <>
                                <br />

                                <small>
                                  Resend available in{" "}
                                  {resendSeconds}s
                                </small>
                              </>
                            )}

                          </div>

                        </div>
                      )}

                    {/* =====================================
                        Email Verified
                    ===================================== */}

                    {emailVerified && (
                      <div className="col-lg-12">

                        <div className="contact-email-verified mb-20">

                          <span className="contact-check-icon">
                            ✓
                          </span>

                          Email verified successfully.
                          Your message will be sent now.

                        </div>

                      </div>
                    )}

                    {/* =====================================
                        Submit Button
                    ===================================== */}

                    <div className="col-lg-12">

                      <button
                        className="submit btn btn-send-message"
                        type="submit"
                        disabled={
                          loading ||
                          (
                            otpSent &&
                            !emailVerified &&
                            otp.length !== 6
                          )
                        }
                      >

                        {loading
                          ? otpSent
                            ? "Verifying & Sending..."
                            : "Sending OTP..."
                          : !otpSent
                            ? "Send OTP"
                            : "Verify OTP & Send Message"}

                      </button>

                      {/* =====================================
                          Resend OTP
                      ===================================== */}

                      {otpSent &&
                        !emailVerified &&
                        resendSeconds === 0 && (

                          <button
                            type="button"
                            className="btn contact-resend-btn ms-3"
                            onClick={
                              handleSendOtp
                            }
                            disabled={loading}
                          >
                            Resend OTP
                          </button>

                        )}

                      {/* =====================================
                          Terms
                      ===================================== */}

                      <label className="ml-20">

                        <input
                          className="float-start mr-5 mt-6"
                          type="checkbox"
                          checked={agree}
                          onChange={(e) =>
                            setAgree(
                              e.target.checked
                            )
                          }
                          disabled={loading}
                        />{" "}

                        By clicking contact us button,
                        you agree our terms and policy.

                      </label>

                    </div>

                  </div>

                </form>

              </div>

              {/* =====================================
                  Contact Image
              ===================================== */}

              <div className="col-lg-4 text-center d-none d-lg-block">

                <img
                  src={contactImg}
                  alt="HireComfort"
                />

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

                {/* =====================================
                    Left Image
                ===================================== */}

                <div className="col-xl-3 col-12 text-center d-none d-xl-block">

                  <img
                    src={newsletterLeft}
                    alt="HireComfort"
                  />

                </div>

                {/* =====================================
                    Newsletter
                ===================================== */}

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

                {/* =====================================
                    Right Image
                ===================================== */}

                <div className="col-xl-3 col-12 text-center d-none d-xl-block">

                  <img
                    src={newsletterRight}
                    alt="HireComfort"
                  />

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
