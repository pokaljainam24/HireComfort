import { type FormEvent } from "react";
import { useNavigate } from "react-router";

import loginImg4 from "../assets/imgs/page/login-register/img-4.svg";
import loginImg3 from "../assets/imgs/page/login-register/img-3.svg";

// TODO: Add validation for the form fields, especially for email and password.

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.get("Username"),
          password: formData.get("Password"),
          accountType: formData.get("UserType"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Login failed (${response.status})`);
      }

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (error) {
      console.error("Login request failed:", error);

      window.alert(
        error instanceof TypeError
          ? "Cannot reach the backend. Ensure it is running on http://localhost:5000 and CORS is enabled."
          : error instanceof Error
            ? error.message
            : "Login failed",
      );
    }
  };

  return (
    <main className="main">
      <section className="pt-100 pb-100 login-register">
        <div className="container">
          <div className="row login-register-cover">
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
                {/* Username */}
                <div className="form-group">
                  <label className="form-label" htmlFor="loginUsername">
                    Username *
                  </label>

                  <input
                    className="form-control"
                    id="loginUsername"
                    type="text"
                    name="Username"
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

                {/* User Type */}
                <div className="form-group">
                  <label className="form-label" htmlFor="userType">
                    Login as *
                  </label>

                  <div style={{ position: "relative" }}>
                    <select
                      className="form-control"
                      id="userType"
                      name="UserType"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select user type
                      </option>
                      <option value="recruiter">Recruiter</option>
                      <option value="applicant">Applicant</option>
                    </select>

                    <i
                      className="bi bi-chevron-down"
                      style={{
                        position: "absolute",
                        left: "90%",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    ></i>
                  </div>
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

                {/* Signup */}
                <div className="text-muted text-center">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="switch-panel"
                    onClick={(e) => {
                      e.preventDefault();
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

export default Login;
