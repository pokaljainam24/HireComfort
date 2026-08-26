function VerifyEmail() {
  return (
    <main className="main">
      <section className="pt-100 pb-100 login-register">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-5 text-center">
                  <h2 className="text-brand-1 mb-3">Email Verified</h2>
                  <p className="text-muted mb-4">
                    Your email address has been verified successfully. You can
                    now log in.
                  </p>
                  <a href="/login" className="btn btn-brand-1 w-100">
                    Go to Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default VerifyEmail;
