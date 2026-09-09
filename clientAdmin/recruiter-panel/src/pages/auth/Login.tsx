import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Icon } from "@/components/common/Icon";
import Field from "@/components/common/Field";

const Login: React.FC = () => {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    const redirectTo = (location.state as { from?: string })?.from || "/";
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter email and password");
      return;
    }
    setSubmitting(true);
    setError("");
    const res = await login(email.trim(), password);
    setSubmitting(false);
    if (!res.ok) {
      setError(res.message || "Invalid email or password");
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-mark">
          <Icon name="briefcase" size={22} />
        </div>
        <h1>Recruiter Panel Login</h1>
        <p>Sign in to manage your company profile, jobs and applications.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid single">
            <Field label="Email" required>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter email"
                autoFocus
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
              />
            </Field>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: 18 }}
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: 18, marginBottom: 0, fontSize: 12, color: "var(--text-muted)" }}>
          Use the recruiter account created for your company on the server.
        </p>
      </div>
    </div>
  );
};

export default Login;
