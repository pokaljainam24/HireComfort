import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Field from "@/components/common/Field";
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const { user, token, login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< Updated upstream
=======
  // const [loginAs, setLoginAs] = useState<
  //   "applicant" | "recruiter" | ""
  // >("");
>>>>>>> Stashed changes
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================
  // Already logged in
  // =====================================

  if (user && token) {
    const from = (location.state as { from?: string })?.from;

    // Never redirect back to login
    const redirectTo =
      from && from !== "/login" ? from : "/";

    return <Navigate to={redirectTo} replace />;
  }

  // =====================================
  // Login Submit
  // =====================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    // =====================================
    // Validation
    // =====================================

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

<<<<<<< Updated upstream
=======
    // if (!loginAs) {
    //   setError("Please select login role");
    //   return;
    // }

>>>>>>> Stashed changes
    try {
      setLoading(true);

      // =====================================
      // Login
      // =====================================

      const success = await login(
        username.trim(),
<<<<<<< Updated upstream
        password,
=======
        password
        
>>>>>>> Stashed changes
      );

      if (!success) {
        setError("Invalid username or password");
        return;
      }

      // =====================================
      // Success Alert
      // =====================================

      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome to Admin Panel",
        confirmButtonText: "OK",
      });

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      <div className="login-card">
        <div className="login-mark">
          <img
            src="/logo.png"
            alt="Admin Panel Logo"
          />
        </div>

        <p>
          Sign in to manage your masters and content.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid single">
            {/* Username */}

            <Field label="Username" required>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="Enter username"
                autoFocus
                disabled={loading}
              />
            </Field>

            {/* Password */}

            <Field
              label="Password"
              required
              error={error}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter password"
                disabled={loading}
              />
            </Field>

            {/* Login As

            {/* <Field label="Login As" required>
              <select
                value={loginAs}
                onChange={(e) => {
                  setLoginAs(
                    e.target.value as
                      | "applicant"
                      | "recruiter"
                      | "",
                  );
                  setError("");
                }}
                disabled={loading}
              >
                <option value="">
                  Select Role
                </option>

                <option value="applicant">
                  Applicant
                </option>

                <option value="recruiter">
                  Recruiter
                </option>
              </select>
            </Field> */}
          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              justifyContent: "center",
              marginTop: 18,
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
