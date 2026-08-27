import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import loginImg4 from "../assets/imgs/page/login-register/img-4.svg";
import loginImg3 from "../assets/imgs/page/login-register/img-3.svg";

// TODO: Add validation for the form fields, especially for email and password.

type AccountType = "Applicant" | "Recruiter";

function Signup() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState<AccountType>("Applicant");

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.get("FirstName"),
          lastName: formData.get("LastName"),
          email: formData.get("Email"),
          mobileNumber: formData.get("MobileNumber"),
          password: formData.get("Password"),
          confirmPassword: formData.get("ConfirmPassword"),

          accountType: accountType === "Recruiter" ? "recruiter" : "applicant",
          username: formData.get("Username"),
          companyName: formData.get("CompanyName"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      window.alert(data.message);

      navigate("/login");
    } catch (error) {
      console.error("Signup request failed:", error);

      window.alert(error instanceof Error ? error.message : "Signup failed");
    }
  };

  return (
    <main className="main">
      <section className="pt-100 pb-100 login-register">
        <div className="container">
          <div className="row login-register-cover">
            <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
              <div className="text-center">
                <p className="font-sm text-brand-2">Get started</p>

                <h2 className="mt-10 mb-5 text-brand-1">Create your Account</h2>

                <p className="font-sm text-muted mb-30">
                  Join HireComfort and start your hiring journey.
                </p>
              </div>

              <form
                className="login-register text-start mt-20"
                method="post"
                onSubmit={handleSignup}
              >
                {/* Account Type */}
                <div className="form-group">
                  <label className="form-label mb-2">Register As</label>

                  <div className="d-flex">
                    <label className="cb-container me-4">
                      <input
                        type="radio"
                        name="AccountType"
                        value="Applicant"
                        checked={accountType === "Applicant"}
                        onChange={() => setAccountType("Applicant")}
                      />

                      <span className="text-small">Job Seeker</span>

                      <span className="checkmark"></span>
                    </label>

                    <label className="cb-container">
                      <input
                        type="radio"
                        name="AccountType"
                        value="Recruiter"
                        checked={accountType === "Recruiter"}
                        onChange={() => setAccountType("Recruiter")}
                      />

                      <span className="text-small">Recruiter / Employer</span>

                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>

                {/* First Name + Last Name */}
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label className="form-label" htmlFor="regFirstName">
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
                    <label className="form-label" htmlFor="regLastName">
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

                {/* Company Name */}
                {accountType === "Recruiter" && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="regCompanyName">
                      Company Name
                    </label>

                    <input
                      className="form-control"
                      id="regCompanyName"
                      type="text"
                      name="CompanyName"
                    />
                  </div>
                )}

                {/* Username */}
                <div className="form-group">
                  <label className="form-label" htmlFor="regUsername">
                    Username
                  </label>

                  <input
                    className="form-control"
                    id="regUsername"
                    type="text"
                    name="Username"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label" htmlFor="regEmail">
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

                {/* Mobile */}
                <div className="form-group">
                  <label className="form-label" htmlFor="regMobile">
                    Mobile Number *
                  </label>

                  <input
                    className="form-control"
                    id="regMobile"
                    type="text"
                    name="MobileNumber"
                    maxLength={15}
                    required
                  />
                </div>

                {/* Password + Confirm Password */}
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label className="form-label" htmlFor="regPassword">
                      Password *
                    </label>

                    <input
                      className="form-control"
                      id="regPassword"
                      type="password"
                      name="Password"
                      required
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label className="form-label" htmlFor="regConfirmPassword">
                      Confirm Password *
                    </label>

                    <input
                      className="form-control"
                      id="regConfirmPassword"
                      type="password"
                      name="ConfirmPassword"
                      required
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="form-group">
                  <label className="cb-container">
                    <input type="checkbox" required id="Terms" name="Terms" />

                    <span className="text-small">
                      I agree to the <a href="/terms">Terms &amp; Conditions</a>{" "}
                      and <a href="/privacy">Privacy Policy</a>
                    </span>

                    <span className="checkmark"></span>
                  </label>
                </div>

                {/* Create Account */}
                <div className="form-group">
                  <button
                    className="btn btn-brand-1 hover-up w-100"
                    type="submit"
                  >
                    Create Account
                  </button>
                </div>

                {/* Login */}
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

            {/* Image 1 */}
            <div className="img-1 d-none d-lg-block">
              <img className="shape-1" src={loginImg4} alt="HireComfort" />
            </div>

            {/* Image 2 */}
            <div className="img-2">
              <img src={loginImg3} alt="HireComfort" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;
