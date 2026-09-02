import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Icon } from "@/components/common/Icon";
import Field from "@/components/common/Field";
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const { user, token, login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already logged in
  if (user && token) {
    const from = (location.state as { from?: string })?.from;

    // Never redirect back to login
    const redirectTo = from && from !== "/login" ? from : "/";

    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Enter username and password");
      return;
    }

    try {
      setLoading(true);

      const success = await login(username, password);

      if (!success) {
        setError("Invalid username or password");
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome to Admin Panel",
        confirmButtonText: "OK",
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Something went wrong",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-mark">
          <Icon name="user" size={22} />
        </div>

        <h1>Admin Panel Login</h1>

        <p>Sign in to manage your masters and content.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid single">
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

            <Field label="Password" required error={error}>
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
          </div>

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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
