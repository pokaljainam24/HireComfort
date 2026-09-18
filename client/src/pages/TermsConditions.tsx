import React, { useState } from "react";

interface TermSection {
  id: number;
  title: string;
  content: React.ReactNode;
}

function TermsConditions() {
  const [activeSection, setActiveSection] = useState(1);

  const sections: TermSection[] = [
    {
      id: 1,
      title: "About HireComfort",
      content: (
        <>
          <p>
            HireComfort is a recruitment and employment platform designed to
            connect job seekers, recruiters, and companies.
          </p>
          <p>The platform may provide features including:</p>
          <ul>
            <li>Job searching</li>
            <li>Job applications</li>
            <li>Applicant profiles</li>
            <li>Resume management</li>
            <li>Recruiter accounts</li>
            <li>Company profiles</li>
            <li>Job posting</li>
            <li>Candidate management</li>
            <li>Recruitment communication</li>
            <li>Recruitment-related services</li>
            <li>Career-related resources</li>
            <li>Other employment and recruitment features</li>
          </ul>
          <p>
            Features may change, be added, or be discontinued from time to time.
          </p>
        </>
      ),
    },
    {
      id: 2,
      title: "Eligibility",
      content: (
        <>
          <p>
            You may use HireComfort only if you are legally permitted to use
            employment and recruitment services under applicable law.
          </p>
          <p>
            If you create an account on behalf of a company or organization, you
            confirm that you are authorized to act on behalf of that
            organization.
          </p>
        </>
      ),
    },
    {
      id: 3,
      title: "User Accounts",
      content: (
        <>
          <p>Certain features may require you to create an account.</p>
          <p>
            You agree to provide accurate, current, and complete information
            when creating and maintaining your account.
          </p>
          <p>You are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your login credentials</li>
            <li>Keeping your account information accurate</li>
            <li>Preventing unauthorized access to your account</li>
            <li>Activities conducted through your account</li>
            <li>
              Notifying HireComfort if you suspect unauthorized account access
            </li>
          </ul>
          <p>You must not knowingly provide false or misleading information.</p>
        </>
      ),
    },
    {
      id: 4,
      title: "Applicant Responsibilities",
      content: (
        <>
          <p>
            Applicants using HireComfort agree to provide truthful and accurate
            information regarding their:
          </p>
          <ul>
            <li>Identity</li>
            <li>Education</li>
            <li>Skills</li>
            <li>Experience</li>
            <li>Qualifications</li>
            <li>Employment history</li>
            <li>Certifications</li>
            <li>Resume</li>
            <li>Other professional information</li>
          </ul>
          <p>
            Applicants must not submit false qualifications, forged documents,
            misleading employment information, or information belonging to
            another person without authorization.
          </p>
        </>
      ),
    },
    {
      id: 5,
      title: "Recruiter and Employer Responsibilities",
      content: (
        <>
          <p>
            Recruiters and employers using HireComfort are responsible for
            ensuring that their job postings and recruitment activities are
            accurate and lawful.
          </p>
          <p>Recruiters should provide relevant information regarding:</p>
          <ul>
            <li>Job title</li>
            <li>Job responsibilities</li>
            <li>Required qualifications</li>
            <li>Experience requirements</li>
            <li>Location</li>
            <li>Employment type</li>
            <li>Compensation information, where applicable</li>
            <li>Application requirements</li>
          </ul>
          <p>
            Recruiters must not use HireComfort to publish fraudulent,
            misleading, discriminatory, abusive, or unlawful job opportunities.
          </p>
        </>
      ),
    },
    {
      id: 6,
      title: "Job Listings",
      content: (
        <>
          <p>
            HireComfort may display job opportunities submitted by recruiters,
            employers, or other authorized parties.
          </p>
          <p>
            Job information may include descriptions, qualifications, locations,
            salary information, employment type, deadlines, and other
            recruitment details.
          </p>
          <p>
            HireComfort does not guarantee the accuracy, availability,
            completeness, or continued existence of every job listing.
          </p>
          <p>
            Recruiters or employers may modify, pause, or remove job
            opportunities at any time.
          </p>
        </>
      ),
    },
    {
      id: 7,
      title: "Applications",
      content: (
        <>
          <p>
            Submitting an application through HireComfort does not guarantee:
          </p>
          <ul>
            <li>An interview</li>
            <li>A recruiter response</li>
            <li>Shortlisting</li>
            <li>Selection</li>
            <li>Employment</li>
            <li>A particular salary</li>
            <li>A particular position</li>
            <li>Any other recruitment outcome</li>
          </ul>
          <p>
            Recruitment decisions are made by the relevant employer, recruiter,
            or authorized hiring organization.
          </p>
          <p>
            Applicants should independently evaluate employment opportunities
            and verify relevant information before accepting an offer.
          </p>
        </>
      ),
    },
    {
      id: 8,
      title: "Candidate Information",
      content: (
        <>
          <p>
            Applicants may provide resumes, documents, qualifications,
            experience, skills, and other professional information through the
            platform.
          </p>
          <p>
            Applicants are responsible for ensuring that they have the right to
            submit such information.
          </p>
          <p>
            Recruiters and employers accessing applicant information must use it
            for legitimate recruitment-related purposes and should handle such
            information appropriately.
          </p>
        </>
      ),
    },
    {
      id: 9,
      title: "Prohibited Activities",
      content: (
        <>
          <p>You must not use HireComfort to:</p>
          <ul>
            <li>Provide false or misleading information</li>
            <li>Create an account using another person's identity</li>
            <li>Impersonate another person or organization</li>
            <li>Publish fraudulent job opportunities</li>
            <li>Upload malicious software or harmful files</li>
            <li>Attempt unauthorized access to accounts or systems</li>
            <li>Interfere with website functionality</li>
            <li>Scrape or collect information through unauthorized methods</li>
            <li>Abuse, threaten, harass, or deceive other users</li>
            <li>Use applicant information for unauthorized purposes</li>
            <li>Publish unlawful or misleading content</li>
            <li>Circumvent security controls</li>
            <li>Attempt to gain unauthorized access to databases or systems</li>
            <li>
              Use the platform for activities unrelated to legitimate
              recruitment or permitted services
            </li>
          </ul>
          <p>
            HireComfort may take appropriate action when prohibited activity is
            identified or reported.
          </p>
        </>
      ),
    },
    {
      id: 10,
      title: "User-Generated Content",
      content: (
        <>
          <p>
            Users may submit content such as resumes, company information, job
            descriptions, profile information, messages, documents, or other
            materials.
          </p>
          <p>
            You remain responsible for the content you submit and must ensure
            that you have the necessary rights and permissions to submit it.
          </p>
          <p>
            You must not upload content that infringes another person's
            intellectual property, privacy, or other legal rights.
          </p>
        </>
      ),
    },
    {
      id: 11,
      title: "Intellectual Property",
      content: (
        <>
          <p>
            The HireComfort website, branding, logos, designs, software,
            layouts, text, graphics, and other platform materials may be
            protected by applicable intellectual property laws.
          </p>
          <p>
            Except where expressly permitted, you may not copy, reproduce,
            modify, distribute, publish, sell, reverse engineer, or commercially
            exploit HireComfort platform materials without appropriate
            authorization.
          </p>
          <p>
            User-submitted content remains subject to the rights of the relevant
            user or rights holder.
          </p>
        </>
      ),
    },
    {
      id: 12,
      title: "Recruitment Services",
      content: (
        <>
          <p>
            Where HireComfort provides recruitment-related services, the scope,
            terms, fees, and applicable conditions may depend on the specific
            service or agreement.
          </p>
          <p>
            Any service-specific terms communicated separately will apply to the
            relevant service in addition to these general Terms & Conditions.
          </p>
        </>
      ),
    },
    {
      id: 13,
      title: "Payments and Fees",
      content: (
        <>
          <p>Certain HireComfort services may involve fees or payments.</p>
          <p>
            Where applicable, the relevant price, payment terms, service
            description, and applicable conditions will be communicated before
            or during the transaction.
          </p>
          <p>
            Users are responsible for providing accurate payment and billing
            information.
          </p>
          <p>
            Payment processing may be handled through third-party payment
            service providers and may be subject to their applicable terms and
            policies.
          </p>
        </>
      ),
    },
    {
      id: 14,
      title: "Refunds and Cancellations",
      content: (
        <>
          <p>
            Where a paid service is offered, applicable refund, cancellation, or
            adjustment conditions may be communicated with that particular
            service.
          </p>
          <p>
            If no separate condition is provided, users should contact
            HireComfort regarding the relevant transaction.
          </p>
          <p>
            Eligibility for a refund may depend on the nature of the service,
            whether the service has already been provided, and applicable
            requirements.
          </p>
        </>
      ),
    },
    {
      id: 15,
      title: "Third-Party Services and Links",
      content: (
        <>
          <p>
            HireComfort may integrate with or provide links to third-party
            websites, services, communication platforms, payment providers, or
            other external systems.
          </p>
          <p>
            Third-party services are subject to their own terms and policies.
          </p>
          <p>
            HireComfort is not responsible for the availability, security,
            content, or practices of third-party services outside its direct
            control.
          </p>
        </>
      ),
    },
    {
      id: 16,
      title: "Platform Availability",
      content: (
        <>
          <p>
            We aim to keep HireComfort available and functional, but
            uninterrupted availability cannot be guaranteed.
          </p>
          <p>The platform may occasionally be unavailable due to:</p>
          <ul>
            <li>Maintenance</li>
            <li>Updates</li>
            <li>Technical problems</li>
            <li>Hosting or infrastructure issues</li>
            <li>Security measures</li>
            <li>Network problems</li>
            <li>Events outside reasonable control</li>
          </ul>
          <p>
            HireComfort may modify, suspend, or discontinue particular features
            when reasonably necessary.
          </p>
        </>
      ),
    },
    {
      id: 17,
      title: "No Guarantee of Employment",
      content: (
        <>
          <p>
            HireComfort provides recruitment-related tools and services but does
            not guarantee that any applicant will obtain employment or that any
            recruiter will successfully fill a position.
          </p>
          <p>
            Employment decisions remain with the relevant employer or hiring
            organization.
          </p>
          <p>
            Users should independently verify employment offers, job
            descriptions, compensation, company information, and other important
            details before making decisions.
          </p>
        </>
      ),
    },
    {
      id: 18,
      title: "Disclaimer of User Content",
      content: (
        <>
          <p>
            HireComfort does not necessarily verify every piece of information
            submitted by users, recruiters, employers, or other parties.
          </p>
          <p>
            Users should exercise appropriate judgment when relying on
            information available through the platform.
          </p>
          <p>
            If you identify information that appears inaccurate, fraudulent,
            unlawful, or inappropriate, you may report it through the available
            contact channels.
          </p>
        </>
      ),
    },
    {
      id: 19,
      title: "Account Suspension or Termination",
      content: (
        <>
          <p>
            HireComfort may restrict, suspend, or terminate an account where
            there is reasonable concern regarding:
          </p>
          <ul>
            <li>Violation of these Terms</li>
            <li>Fraudulent or misleading activity</li>
            <li>Unauthorized access</li>
            <li>Abuse of the platform</li>
            <li>Security risks</li>
            <li>Unlawful activity</li>
            <li>Misuse of user information</li>
            <li>
              Other activity that may adversely affect the platform or its users
            </li>
          </ul>
          <p>
            Where appropriate, users may contact HireComfort regarding an
            account-related issue.
          </p>
        </>
      ),
    },
    {
      id: 20,
      title: "Limitation of Liability",
      content: (
        <>
          <p>
            To the extent permitted by applicable law, HireComfort will not be
            responsible for indirect, incidental, consequential, or other losses
            arising from the use of the platform, including losses associated
            with job applications, recruitment decisions, employment
            opportunities, user-submitted information, third-party services, or
            temporary platform unavailability.
          </p>
          <p>
            Nothing in these Terms is intended to exclude or limit liability
            where such exclusion or limitation is not permitted by applicable
            law.
          </p>
        </>
      ),
    },
    {
      id: 21,
      title: "Indemnification",
      content: (
        <>
          <p>
            To the extent permitted by applicable law, users may be responsible
            for claims, losses, liabilities, or expenses arising from their
            misuse of HireComfort, violation of these Terms, unlawful activity,
            or infringement of another person's rights.
          </p>
        </>
      ),
    },
    {
      id: 22,
      title: "Privacy",
      content: (
        <>
          <p>
            Your use of HireComfort is also subject to our Privacy Policy, which
            explains how information may be collected, used, stored, and
            handled.
          </p>
          <p>
            Please review the HireComfort Privacy Policy before using the
            platform.
          </p>
        </>
      ),
    },
    {
      id: 23,
      title: "Changes to These Terms",
      content: (
        <>
          <p>
            HireComfort may update these Terms & Conditions from time to time.
          </p>
          <p>
            Updated terms will be published on this page with a revised "Last
            Updated" date.
          </p>
          <p>
            Continued use of the platform after updated terms are published may
            constitute acceptance of the revised terms to the extent permitted
            by applicable law.
          </p>
        </>
      ),
    },
    {
      id: 24,
      title: "Governing Law",
      content: (
        <>
          <p>
            These Terms & Conditions shall be interpreted and governed in
            accordance with applicable laws and regulations.
          </p>
          <p>
            Any specific jurisdiction, courts, dispute-resolution procedure, or
            governing-law provision applicable to HireComfort should be
            specified in the final legal version of these Terms based on the
            organization's registered entity and place of operation.
          </p>
        </>
      ),
    },
    {
      id: 25,
      title: "Contact Us",
      content: (
        <>
          <p>
            If you have questions regarding these Terms & Conditions, account
            issues, services, job postings, or other platform-related matters,
            please contact HireComfort through the Contact Us section of the
            website.
          </p>
          <div className="terms-contact-box">
            <h4>HireComfort</h4>
            <p>
              <strong>Website:</strong> HireComfort
            </p>
            <p>
              <strong>Contact:</strong> Please use the Contact Us section of the
              website for enquiries.
            </p>
          </div>
        </>
      ),
    },
  ];

  const activeContent =
    sections.find((section) => section.id === activeSection) ?? sections[0];

  return (
    <main className="terms-page">
      <section className="terms-hero">
        <div className="terms-hero-overlay"></div>

        <div className="container">
          <div className="terms-hero-content">
            <div className="terms-hero-badge">
              <span>✦</span> Legal Information
            </div>

            <h1>Terms &amp; Conditions</h1>

            <p>
              Please read these terms carefully before using HireComfort. They
              explain your rights, responsibilities, and the rules that apply
              when using our recruitment platform.
            </p>

            <div className="terms-updated">
              <span className="terms-check">✓</span>
              <span>Last Updated: September 18, 2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className="terms-intro-section">
        <div className="container">
          <div className="terms-intro-card">
            <div className="terms-intro-icon">⚖</div>

            <div>
              <h2>Welcome to HireComfort</h2>
              <p>
                These Terms &amp; Conditions govern your access to and use of
                the HireComfort website, recruitment platform, job listings,
                applicant services, recruiter services, and other features
                provided through the platform.
              </p>
              <p>
                By accessing or using HireComfort, you agree to comply with
                these Terms &amp; Conditions. If you do not agree with these
                terms, please do not use the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="terms-content-section">
        <div className="container">
          <div className="terms-layout">
            <aside className="terms-sidebar">
              <div className="terms-sidebar-header">
                <span>Contents</span>
                <small>25 Sections</small>
              </div>

              <div className="terms-tabs">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    className={`terms-tab ${activeSection === section.id ? "active" : ""}`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <span className="terms-tab-number">
                      {String(section.id).padStart(2, "0")}
                    </span>
                    <span className="terms-tab-title">{section.title}</span>
                    <span className="terms-tab-arrow">→</span>
                  </button>
                ))}
              </div>
            </aside>

            <article className="terms-article">
              <div className="terms-article-top">
                <span className="terms-section-number">
                  Section {String(activeContent.id).padStart(2, "0")}
                </span>
                <span className="terms-section-line"></span>
              </div>

              <h2>
                {activeContent.id}. {activeContent.title}
              </h2>

              <div className="terms-article-content">
                {activeContent.content}
              </div>

              <div className="terms-navigation">
                <button
                  type="button"
                  disabled={activeSection === 1}
                  onClick={() =>
                    setActiveSection((prev) => (prev > 1 ? prev - 1 : prev))
                  }
                >
                  ← Previous
                </button>

                <span>
                  {activeSection} / {sections.length}
                </span>

                <button
                  type="button"
                  disabled={activeSection === sections.length}
                  onClick={() =>
                    setActiveSection((prev) =>
                      prev < sections.length ? prev + 1 : prev,
                    )
                  }
                >
                  Next →
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TermsConditions;
