import {
  useEffect,
  useState,
  type FormEvent,
  type SetStateAction,
} from "react";

import loginImg4 from "../assets/imgs/page/login-register/img-4.svg";
import loginImg3 from "../assets/imgs/page/login-register/img-3.svg";

function Login() {
  const params = new URLSearchParams(window.location.search);

  const tab = params.get("tab") || "login";
  const type = params.get("type") || "applicant";

  const [activePanel, setActivePanel] = useState(tab);
  const [accountType, setAccountType] = useState(type);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("Email"),
        password: formData.get("Password"),
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    window.location.href = "/";
  };

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formData.get("FirstName"),
        lastName: formData.get("LastName"),
        email: formData.get("Email"),
        mobileNumber: formData.get("MobileNumber"),
        password: formData.get("Password"),
        confirmPassword: formData.get("ConfirmPassword"),
        accountType: accountType === "Recruiter" ? "employer" : "job_seeker",
        companyName: formData.get("CompanyName"),
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    window.alert(data.message);
    setActivePanel("login");
  };

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      const type = params.get("type");

      tab === "register" ? setActivePanel("register") : setActivePanel("login");

      type === "recruiter"
        ? setAccountType("Recruiter")
        : setAccountType("Applicant");
    } catch (error) {
      console.error("URL parameter error:", error);
    } finally {
    }
  }, []);

  const handlePanelChange = (panel: SetStateAction<string>) => {
    try {
      setActivePanel(panel);
    } catch (error) {
      console.error("Panel change error:", error);
    } finally {
    }
  };

  const handleAccountTypeChange = (type: SetStateAction<string>) => {
    try {
      setAccountType(type);
    } catch (error) {
      console.error("Account type change error:", error);
    } finally {
    }
  };

  return (
    <main className="main">
      <section className="pt-100 pb-100 login-register">
        <div className="container">
          {/* ================= LOGIN PANEL ================= */}

          <div
            id="login-panel"
            className={`row login-register-cover ${
              activePanel === "login" ? "" : "d-none"
            }`}
          >
            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
              <div className="text-center">
                <p className="font-sm text-brand-2">Welcome back!</p>

                <h2 className="mt-10 mb-5 text-brand-1">Member Login</h2>

                <p className="font-sm text-muted mb-30">
                  Access to all features. No credit card required.
                </p>
              </div>

              <form
                className="login-register text-start mt-20"
                method="post"
                onSubmit={handleLogin}
              >
                {/* Email */}

                <div className="form-group">
                  <label className="form-label" htmlFor="loginEmail">
                    Email address *
                  </label>

                  <input
                    className="form-control"
                    id="loginEmail"
                    type="email"
                    name="Email"
                    required
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password */}

                <div className="form-group">
                  <label className="form-label" htmlFor="loginPassword">
                    Password *
                  </label>

                  <input
                    className="form-control"
                    id="loginPassword"
                    type="password"
                    name="Password"
                    required
                    placeholder="************"
                  />
                </div>

                {/* Remember Me */}

                <div className="login_footer form-group d-flex justify-content-between">
                  <label className="cb-container">
                    <input type="checkbox" name="RememberMe" id="RememberMe" />

                    <span className="text-small">Remember me</span>

                    <span className="checkmark"></span>
                  </label>

                  <a className="text-muted" href="/forgot-password">
                    Forgot Password
                  </a>
                </div>

                {/* Login Button */}

                <div className="form-group">
                  <button
                    className="btn btn-brand-1 hover-up w-100"
                    type="submit"
                  >
                    Login
                  </button>
                </div>

                {/* Register */}

                <div className="text-muted text-center">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="switch-panel"
                    onClick={(e) => {
                      try {
                        e.preventDefault();
                        handlePanelChange("register");
                        handleAccountTypeChange("Applicant");
                      } catch (error) {
                        console.error("Register panel error:", error);
                      } finally {
                      }
                    }}
                  >
                    Sign up
                  </a>
                </div>
              </form>
            </div>

            {/* Login Image 1 */}

            <div className="img-1 d-none d-lg-block">
              <img className="shape-1" src={loginImg4} alt="HireComfort" />
            </div>

            {/* Login Image 2 */}

            <div className="img-2">
              <img src={loginImg3} alt="HireComfort" />
            </div>
          </div>

          {/* ================= REGISTER PANEL ================= */}

          <div
            id="register-panel"
            className={`row login-register-cover ${
              activePanel === "register" ? "" : "d-none"
            }`}
          >
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
                    {/* Applicant */}

                    <label className="cb-container me-4">
                      <input
                        type="radio"
                        name="AccountType"
                        value="Applicant"
                        id="Applicant"
                        checked={accountType === "Applicant"}
                        onChange={(e) => {
                          try {
                            handleAccountTypeChange(e.target.value);
                          } catch (error) {
                            console.error("Applicant selection error:", error);
                          } finally {
                          }
                        }}
                      />

                      <span className="text-small">Job Seeker</span>

                      <span className="checkmark"></span>
                    </label>

                    {/* Recruiter */}

                    <label className="cb-container">
                      <input
                        type="radio"
                        name="AccountType"
                        value="Recruiter"
                        id="Recruiter"
                        checked={accountType === "Recruiter"}
                        onChange={(e) => {
                          try {
                            handleAccountTypeChange(e.target.value);
                          } catch (error) {
                            console.error("Recruiter selection error:", error);
                          } finally {
                          }
                        }}
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

                <div
                  className={`form-group recruiter-field ${
                    accountType === "Recruiter" ? "" : "d-none"
                  }`}
                >
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
                    href="#"
                    className="switch-panel"
                    onClick={(e) => {
                      try {
                        e.preventDefault();
                        handlePanelChange("login");
                      } catch (error) {
                        console.error("Login panel error:", error);
                      } finally {
                      }
                    }}
                  >
                    Login
                  </a>
                </div>
              </form>
            </div>

            {/* Register Image 1 */}

            <div className="img-1 d-none d-lg-block">
              <img className="shape-1" src={loginImg4} alt="HireComfort" />
            </div>

            {/* Register Image 2 */}

            <div className="img-2">
              <img src={loginImg3} alt="HireComfort" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
