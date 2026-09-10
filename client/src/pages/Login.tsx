import { useState, type FormEvent } from "react";

import loginImg4 from "../assets/imgs/page/login-register/img-4.svg";
import loginImg3 from "../assets/imgs/page/login-register/img-3.svg";

import { loginApi } from "../api/SignUpApi/SignUpApi";

// =====================================
// Login
// =====================================

// Path where the recruiter panel app is deployed
// (same domain, different path)
const RECRUITER_PANEL_PATH = "/recruiter-panel/";

// Recruiter panel token key
const RECRUITER_PANEL_TOKEN_KEY = "recruiter_panel_token";

// Applicant panel token key
const APPLICANT_PANEL_TOKEN_KEY = "applicant_panel_token";

// Path where the applicant panel app is deployed
const APPLICANT_PANEL_PATH = "/applicant-panel/";

function Login() {
  const navigate = (
    path: string,
    options?: { replace?: boolean },
  ) => {
    if (options?.replace) {
      window.location.replace(path);
    } else {
      window.location.assign(path);
    }
  };

  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const username = String(
      formData.get("Username") || "",
    ).trim();

    const password = String(
      formData.get("Password") || "",
    );

    const loginAsValue = String(
      formData.get("UserType") || "",
    );

    // =====================================
    // Validation
    // =====================================

    if (!username) {
      window.alert("Username is required");
      return;
    }

    if (!password) {
      window.alert("Password is required");
      return;
    }

    if (!loginAsValue) {
      window.alert("Please select Login as");
      return;
    }

    if (
      loginAsValue !== "applicant" &&
      loginAsValue !== "recruiter"
    ) {
      window.alert("Invalid login type");
      return;
    }

    const loginAs =
      loginAsValue as "applicant" | "recruiter";

    try {
      setLoading(true);

      // =====================================
      // Login API
      // =====================================

      const data = await loginApi({
        username,
        password,
        loginAs,
      });

      // =====================================
      // Validate Login Response
      // =====================================

      if (!data?.token) {
        window.alert(
          "Login failed. Token not received.",
        );
        return;
      }

      if (!data?.user) {
        window.alert(
          "Login failed. User details not received.",
        );
        return;
      }

      // =====================================
      // Store Common Login Data
      // =====================================

      localStorage.setItem(
        "token",
        data.token,
      );

      localStorage.setItem(
        "role",
        data.role,
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user),
      );

      // =====================================
      // Store Applicant Panel Token
      // =====================================

      if (loginAs === "applicant") {
        localStorage.setItem(
          APPLICANT_PANEL_TOKEN_KEY,
          data.token,
        );
      }

      // =====================================
      // Debug
      // =====================================

      console.log(
        "TOKEN SAVED:",
        localStorage.getItem("token"),
      );

      console.log(
        "ROLE SAVED:",
        localStorage.getItem("role"),
      );

      console.log(
        "USER SAVED:",
        localStorage.getItem("user"),
      );

      console.log(
        "APPLICANT PANEL TOKEN SAVED:",
        localStorage.getItem(
          APPLICANT_PANEL_TOKEN_KEY,
        ),
      );

      // =====================================
      // Login Success -> Recruiter Redirect
      // ====================================
      

      if (loginAs === "recruiter") {
        localStorage.setItem(
          RECRUITER_PANEL_TOKEN_KEY,
          data.token,
        );

        navigate(RECRUITER_PANEL_PATH, {
          replace: true,
        });

        return;
      }

      // =====================================
      // Login Success -> Applicant Redirect
      // =====================================

      if (loginAs === "applicant") {
        localStorage.setItem(
          APPLICANT_PANEL_TOKEN_KEY,
          data.token,
        );

        navigate(APPLICANT_PANEL_PATH, {
          replace: true,
        });

        return;
      }
    } catch (error: any) {
      console.error(
        "Login request failed:",
        error,
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed";

      window.alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <section className="pt-100 pb-100 login-register">
        <div className="container">
          <div className="row login-register-cover">
            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
              <div className="text-center">
                <p className="font-sm text-brand-2">
                  Welcome back!
                </p>

                <h2 className="mt-10 mb-5 text-brand-1">
                  Member Login
                </h2>

                <p className="font-sm text-muted mb-30">
                  Access to all features. No credit
                  card required.
                </p>
              </div>

              <form
                className="login-register text-start mt-20"
                method="post"
                onSubmit={handleLogin}
              >
                {/* Username */}

                <div className="form-group">
                  <label
                    className="form-label"
                    htmlFor="loginUsername"
                  >
                    Username *
                  </label>

                  <input
                    className="form-control"
                    id="loginUsername"
                    type="text"
                    name="Username"
                    required
                    placeholder="Enter username"
                    disabled={loading}
                  />
                </div>

                {/* Password */}

                <div className="form-group">
                  <label
                    className="form-label"
                    htmlFor="loginPassword"
                  >
                    Password *
                  </label>

                  <input
                    className="form-control"
                    id="loginPassword"
                    type="password"
                    name="Password"
                    required
                    placeholder="************"
                    disabled={loading}
                  />
                </div>

                {/* Login As */}

                <div className="form-group">
                  <label
                    className="form-label"
                    htmlFor="userType"
                  >
                    Login as *
                  </label>

                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <select
                      className="form-control"
                      id="userType"
                      name="UserType"
                      required
                      defaultValue=""
                      disabled={loading}
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select user type
                      </option>

                      <option value="recruiter">
                        Recruiter
                      </option>

                      <option value="applicant">
                        Applicant
                      </option>
                    </select>

                    <i
                      className="bi bi-chevron-down"
                      style={{
                        position: "absolute",
                        left: "90%",
                        top: "50%",
                        transform:
                          "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    ></i>
                  </div>
                </div>

                {/* Remember Me */}

                <div className="login_footer form-group d-flex justify-content-between">
                  <label className="cb-container">
                    <input
                      type="checkbox"
                      name="RememberMe"
                      id="RememberMe"
                      disabled={loading}
                    />

                    <span className="text-small">
                      Remember me
                    </span>

                    <span className="checkmark"></span>
                  </label>

                  <a
                    className="text-muted"
                    href="/forgot-password"
                    onClick={(event) => {
                      event.preventDefault();

                      navigate(
                        "/forgot-password",
                      );
                    }}
                  >
                    Forgot Password
                  </a>
                </div>

                {/* Login Button */}

                <div className="form-group">
                  <button
                    className="btn btn-brand-1 hover-up w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading
                      ? "Logging in..."
                      : "Login"}
                  </button>
                </div>

                {/* Signup */}

                <div className="text-muted text-center">
                  Don't have an account?{" "}

                  <a
                    href="/signup"
                    className="switch-panel"
                    onClick={(event) => {
                      event.preventDefault();

                      navigate("/signup");
                    }}
                  >
                    Sign up
                  </a>
                </div>
              </form>
            </div>

            {/* Image 1 */}

            <div className="img-1 d-none d-lg-block">
              <img
                className="shape-1"
                src={loginImg4}
                alt="HireComfort"
              />
            </div>

            {/* Image 2 */}

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

export default Login;