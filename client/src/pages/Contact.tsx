import React, { useState } from "react";

import contactImg from "../assets/imgs/page/contact/img.png";
import newsletterLeft from "../assets/imgs/template/newsletter-left.png";
import newsletterRight from "../assets/imgs/template/newsletter-right.png";

import {
  createContactApi,
  sendContactOtpApi,
  verifyContactOtpApi,
} from "../api/contact/contactApi.ts";
import toast from "../components/SweetAlert/Toast.ts";




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

      toast.error(
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

      toast.error(
        "Please enter a valid email address."
      );

      return false;
    }


    // =====================================
    // Resend Timer
    // =====================================

    if (resendSeconds > 0) {

      toast.warning(
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

      toast.success(
        "A 6-digit OTP has been sent to your email address."
      );


      return true;

    } catch (error: any) {

      console.error(
        "SEND OTP ERROR:",
        error
      );

      toast.error(
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

        toast.error(
          "Please enter the 6-digit OTP."
        );

        return;
      }


      if (
        !/^\d{6}$/.test(
          cleanOtp
        )
      ) {

        toast.error(
          "OTP must be exactly 6 digits."
        );

        return;
      }


      // =====================================
      // Form Validation
      // =====================================

      if (!form.name.trim()) {

        toast.error(
          "Name is required."
        );

        return;
      }


      if (!form.phone.trim()) {

        toast.error(
          "Phone number is required."
        );

        return;
      }


      if (!form.message.trim()) {

        toast.error(
          "Message is required."
        );

        return;
      }


      if (!agree) {

        toast.warning(
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

        toast.success(
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


        toast.error(
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

      toast.error(
        "Name is required."
      );

      return;
    }


    // =====================================
    // Email
    // =====================================

    if (!form.email.trim()) {

      toast.error(
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

      toast.error(
        "Please enter a valid email address."
      );

      return;
    }


    // =====================================
    // Phone
    // =====================================

    if (!form.phone.trim()) {

      toast.error(
        "Phone number is required."
      );

      return;
    }


    // =====================================
    // Message
    // =====================================

    if (!form.message.trim()) {

      toast.error(
        "Message is required."
      );

      return;
    }


    // =====================================
    // Terms
    // =====================================

    if (!agree) {

      toast.warning(
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

      toast.error(
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


        <section className="section-box mt-80">
          <div className="container">
            <div className="box-info-contact">
              <div className="row align-items-stretch">

                {/* Address */}
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="contact-info-item h-100 d-flex align-items-center">
                    <div className="contact-info-icon">
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>

                    <div className="contact-info-content">
                      <h6 className="mb-5">Address</h6>

                      <p className="font-sm color-text-paragraph mb-0">
                        205 North Michigan Avenue, Suite 810
                        <br />
                        Chicago, 60601, USA
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="contact-info-item h-100 d-flex align-items-center">
                    <div className="contact-info-icon">
                      <i className="bi bi-telephone-fill"></i>
                    </div>

                    <div className="contact-info-content">
                      <h6 className="mb-5">Phone</h6>

                      <p className="font-sm color-text-paragraph mb-0">
                        (123) 456-7890
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="contact-info-item h-100 d-flex align-items-center">
                    <div className="contact-info-icon">
                      <i className="bi bi-envelope-fill"></i>
                    </div>

                    <div className="contact-info-content">
                      <h6 className="mb-5">Email</h6>

                      <p className="font-sm color-text-paragraph mb-0">
                        contact@jobbox.com
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* =====================================
            Contact Form + Map
        ===================================== */}

        <section className="section-box mt-70 mb-5">

          <div className="container">


            {/* =====================================
                Contact Map
            ===================================== */}

            <div className="contact-map-box mb-50">

              <div className="mb-20">

                <h3 className="mb-0">
                  Our Location
                </h3>

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


            {/* =====================================
                Contact Form
            ===================================== */}

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
                                    .replace(/\D/g, "")
                                    .slice(0, 6);

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
                            onClick={handleSendOtp}
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
                            setAgree(e.target.checked)
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