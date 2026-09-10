
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import loginImg4 from "../assets/imgs/page/login-register/img-4.svg";
import loginImg3 from "../assets/imgs/page/login-register/img-3.svg";

import { signupApi } from "../api/SignUpApi/SignUpApi.ts";

type AccountType = "Applicant" | "Recruiter";

function Signup() {
  const navigate = useNavigate();

  const [accountType, setAccountType] =
    useState<AccountType>("Applicant");

  const [loading, setLoading] = useState(false);

  // =====================================
  // PASSWORD STATE
  // =====================================

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  // =====================================
  // PASSWORD VALIDATION
  // =====================================

  const passwordRules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special:
      /[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=;'`~]/.test(
        password,
      ),
    match:
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword,
  };

  const isPasswordValid =
    passwordRules.minLength &&
    passwordRules.uppercase &&
    passwordRules.lowercase &&
    passwordRules.number &&
    passwordRules.special &&
    passwordRules.match;

  // =====================================
  // HANDLE SIGNUP
  // =====================================

  const handleSignup = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // =====================================
    // PASSWORD VALIDATION
    // =====================================

    if (!isPasswordValid) {
      return;
    }

    try {
      setLoading(true);

      // =====================================
      // GET FORM DATA
      // =====================================

      const firstName = String(
        formData.get("FirstName") || "",
      ).trim();

      const lastName = String(
        formData.get("LastName") || "",
      ).trim();

      const email = String(
        formData.get("Email") || "",
      ).trim();

      const mobileNumber = String(
        formData.get("MobileNumber") || "",
      ).trim();

      const username = String(
        formData.get("Username") || "",
      ).trim();

      const companyName = String(
        formData.get("CompanyName") || "",
      ).trim();

      // =====================================
      // ACCOUNT TYPE
      // =====================================

      const selectedAccountType:
        | "recruiter"
        | "applicant" =
        accountType === "Recruiter"
          ? "recruiter"
          : "applicant";

      // =====================================
      // SIGNUP DATA
      // =====================================

      const signupData = {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
        confirmPassword,
        accountType: selectedAccountType,
        username,
        companyName,
      };

      console.log("SIGNUP DATA:", signupData);

      // =====================================
      // CALL SIGNUP API
      // =====================================

      const data = await signupApi(signupData);

      console.log("SIGNUP RESPONSE:", data);

      // =====================================
      // SUCCESS
      // =====================================

      window.alert(
        data.message ||
          "Account created successfully",
      );

      navigate("/login");
    } catch (error: any) {
      console.error(
        "Signup request failed:",
        error,
      );

      // =====================================
      // ERROR MESSAGE
      // =====================================

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Signup failed";

      window.alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <section className="pt-100 pb-100 login-register">
        <div className="container">
          <div className="row login-register-cover">

            <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">

              <div className="text-center">
                <p className="font-sm text-brand-2">
                  Get started
                </p>

                <h2 className="mt-10 mb-5 text-brand-1">
                  Create your Account
                </h2>

                <p className="font-sm text-muted mb-30">
                  Join HireComfort and start your
                  hiring journey.
                </p>
              </div>

              <form
                className="login-register text-start mt-20"
                method="post"
                onSubmit={handleSignup}
              >

                {/* =====================================
                    ACCOUNT TYPE
                ===================================== */}

                <div className="form-group">
                  <label className="form-label mb-2">
                    Register As
                  </label>

                  <div className="d-flex">

                    <label className="cb-container me-4">
                      <input
                        type="radio"
                        name="AccountType"
                        value="Applicant"
                        checked={
                          accountType === "Applicant"
                        }
                        onChange={() =>
                          setAccountType("Applicant")
                        }
                      />

                      <span className="text-small">
                        Job Seeker
                      </span>

                      <span className="checkmark"></span>
                    </label>

                    <label className="cb-container">
                      <input
                        type="radio"
                        name="AccountType"
                        value="Recruiter"
                        checked={
                          accountType === "Recruiter"
                        }
                        onChange={() =>
                          setAccountType("Recruiter")
                        }
                      />

                      <span className="text-small">
                        Recruiter / Employer
                      </span>

                      <span className="checkmark"></span>
                    </label>

                  </div>
                </div>

                {/* =====================================
                    FIRST NAME + LAST NAME
                ===================================== */}

                <div className="row">

                  <div className="col-md-6 form-group">
                    <label
                      className="form-label"
                      htmlFor="regFirstName"
                    >
                      First Name *
                    </label>

                    <input
                      className="form-control"
                      id="regFirstName"
                      type="text"
                      name="FirstName"
                      required
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label
                      className="form-label"
                      htmlFor="regLastName"
                    >
                      Last Name *
                    </label>

                    <input
                      className="form-control"
                      id="regLastName"
                      type="text"
                      name="LastName"
                      required
                    />
                  </div>

                </div>

                {/* =====================================
                    COMPANY NAME
                ===================================== */}

                {accountType === "Recruiter" && (
                  <div className="form-group">

                    <label
                      className="form-label"
                      htmlFor="regCompanyName"
                    >
                      Company Name *
                    </label>

                    <input
                      className="form-control"
                      id="regCompanyName"
                      type="text"
                      name="CompanyName"
                      required
                    />

                  </div>
                )}

                {/* =====================================
                    USERNAME
                ===================================== */}

                <div className="form-group">

                  <label
                    className="form-label"
                    htmlFor="regUsername"
                  >
                    Username *
                  </label>

                  <input
                    className="form-control"
                    id="regUsername"
                    type="text"
                    name="Username"
                    required
                  />

                </div>

                {/* =====================================
                    EMAIL
                ===================================== */}

                <div className="form-group">

                  <label
                    className="form-label"
                    htmlFor="regEmail"
                  >
                    Email Address *
                  </label>

                  <input
                    className="form-control"
                    id="regEmail"
                    type="email"
                    name="Email"
                    required
                  />

                </div>

                {/* =====================================
                    MOBILE
                ===================================== */}

                <div className="form-group">

                  <label
                    className="form-label"
                    htmlFor="regMobile"
                  >
                    Mobile Number *
                  </label>

                  <input
                    className="form-control"
                    id="regMobile"
                    type="text"
                    name="MobileNumber"
                    maxLength={10}
                    required
                  />

                </div>

                {/* =====================================
                    PASSWORD + CONFIRM PASSWORD
                ===================================== */}

                <div className="row">

                  {/* PASSWORD */}

                  <div className="col-md-6 form-group">

                    <label
                      className="form-label"
                      htmlFor="regPassword"
                    >
                      Password *
                    </label>

                    <input
                      className="form-control"
                      id="regPassword"
                      type="password"
                      name="Password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                    />

                    {/* PASSWORD REQUIREMENTS */}

                    <div className="mt-2">

                      <small
                        className={
                          passwordRules.minLength
                            ? "text-success d-block"
                            : "text-muted d-block"
                        }
                      >
                        {passwordRules.minLength
                          ? "✓"
                          : "○"}{" "}
                        At least 8 characters
                      </small>

                      <small
                        className={
                          passwordRules.uppercase
                            ? "text-success d-block"
                            : "text-muted d-block"
                        }
                      >
                        {passwordRules.uppercase
                          ? "✓"
                          : "○"}{" "}
                        One uppercase letter
                      </small>

                      <small
                        className={
                          passwordRules.lowercase
                            ? "text-success d-block"
                            : "text-muted d-block"
                        }
                      >
                        {passwordRules.lowercase
                          ? "✓"
                          : "○"}{" "}
                        One lowercase letter
                      </small>

                      <small
                        className={
                          passwordRules.number
                            ? "text-success d-block"
                            : "text-muted d-block"
                        }
                      >
                        {passwordRules.number
                          ? "✓"
                          : "○"}{" "}
                        One number
                      </small>

                      <small
                        className={
                          passwordRules.special
                            ? "text-success d-block"
                            : "text-muted d-block"
                        }
                      >
                        {passwordRules.special
                          ? "✓"
                          : "○"}{" "}
                        One special character
                      </small>

                    </div>

                  </div>

                  {/* CONFIRM PASSWORD */}

                  <div className="col-md-6 form-group">

                    <label
                      className="form-label"
                      htmlFor="regConfirmPassword"
                    >
                      Confirm Password *
                    </label>

                    <input
                      className="form-control"
                      id="regConfirmPassword"
                      type="password"
                      name="ConfirmPassword"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value,
                        )
                      }
                      required
                    />

                    {/* PASSWORD MATCH */}

                    {confirmPassword.length > 0 && (
                      <small
                        className={
                          passwordRules.match
                            ? "text-success d-block mt-2"
                            : "text-danger d-block mt-2"
                        }
                      >
                        {passwordRules.match
                          ? "✓ Passwords match"
                          : "✗ Passwords do not match"}
                      </small>
                    )}

                  </div>

                </div>

                {/* =====================================
                    TERMS
                ===================================== */}

                <div className="form-group">

                  <label className="cb-container">

                    <input
                      type="checkbox"
                      required
                      id="Terms"
                      name="Terms"
                    />

                    <span className="text-small">
                      I agree to the{" "}
                      <a href="/terms">
                        Terms &amp; Conditions
                      </a>{" "}
                      and{" "}
                      <a href="/privacy">
                        Privacy Policy
                      </a>
                    </span>

                    <span className="checkmark"></span>

                  </label>

                </div>

                {/* =====================================
                    CREATE ACCOUNT
                ===================================== */}

                <div className="form-group">

                  <button
                    className="btn btn-brand-1 hover-up w-100"
                    type="submit"
                    disabled={
                      loading || !isPasswordValid
                    }
                  >
                    {loading
                      ? "Creating Account..."
                      : "Create Account"}
                  </button>

                </div>

                {/* =====================================
                    LOGIN
                ===================================== */}

                <div className="text-muted text-center">

                  Already have an account?{" "}

                  <a
                    href="/login"
                    className="switch-panel"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                  >
                    Login
                  </a>

                </div>

              </form>
            </div>

            {/* =====================================
                IMAGE 1
            ===================================== */}

            <div className="img-1 d-none d-lg-block">
              <img
                className="shape-1"
                src={loginImg4}
                alt="HireComfort"
              />
            </div>

            {/* =====================================
                IMAGE 2
            ===================================== */}

            <div className="img-2">
              <img
                src={loginImg3}
                alt="HireComfort"
              />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;
