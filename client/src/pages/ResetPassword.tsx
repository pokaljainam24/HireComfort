function ResetPassword() {
  return (
    <main className="main">
      <section className="pt-100 pb-100 login-register">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="text-center mb-40">
                <h2 className="text-brand-1">Reset Password</h2>
                <p className="text-muted">
                  Choose a new password for your account.
                </p>
              </div>
              <div className="card border-0 shadow-sm">
                <div className="card-body p-5">
                  <form method="post">
                    <input type="hidden" name="Token" defaultValue="" />
                    <div className="mb-3">
                      <label>New Password</label>
                      <input
                        type="password"
                        name="Password"
                        className="form-control"
                        required
                        minLength={8}
                      />
                    </div>
                    <div className="mb-4">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        name="ConfirmPassword"
                        className="form-control"
                        required
                        minLength={8}
                      />
                    </div>
                    <button className="btn btn-brand-1 w-100">
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ResetPassword;
