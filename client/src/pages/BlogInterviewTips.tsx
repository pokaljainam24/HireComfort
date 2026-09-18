import bannerImage from "../assets/imgs/page/job-single-2/img.png";
import industryIcon from "../assets/imgs/page/job-single/industry.svg";
import jobLevelIcon from "../assets/imgs/page/job-single/job-level.svg";
import salaryIcon from "../assets/imgs/page/job-single/salary.svg";
import experienceIcon from "../assets/imgs/page/job-single/experience.svg";
import jobTypeIcon from "../assets/imgs/page/job-single/job-type.svg";
import deadlineIcon from "../assets/imgs/page/job-single/deadline.svg";
import updatedIcon from "../assets/imgs/page/job-single/updated.svg";
import locationIcon from "../assets/imgs/page/job-single/location.svg";

function BlogInterviewTips() {
  return (
    <main className="main">
      <section className="section-box mt-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="box-border-single">
                <div className="row mt-10">
                  <div className="col-lg-8 col-md-12">
                    <h3>Interview Tips</h3>

                    <div className="mt-0 mb-15">
                      <span className="card-briefcase">Interview Guide</span>
                      <span className="card-time">5 mins read</span>
                    </div>
                  </div>
                </div>

                <div className="border-bottom pt-10 pb-10"></div>

                <div className="banner-hero banner-image-single mt-10 mb-20">
                  <img src={bannerImage} alt="Interview Tips" />
                </div>

                <div className="job-overview">
                  <h5 className="border-bottom pb-15 mb-30">Overview</h5>

                  <div className="row">
                    <div className="col-md-6 d-flex">
                      <div className="sidebar-icon-item">
                        <img src={industryIcon} alt="Topic" />
                      </div>
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description industry-icon mb-10">
                          Topic
                        </span>
                        <strong className="small-heading">
                          Interview Preparation
                        </strong>
                      </div>
                    </div>

                    <div className="col-md-6 d-flex mt-sm-15">
                      <div className="sidebar-icon-item">
                        <img src={jobLevelIcon} alt="Level" />
                      </div>
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description joblevel-icon mb-10">
                          Level
                        </span>
                        <strong className="small-heading">
                          All Candidates
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-25">
                    <div className="col-md-6 d-flex mt-sm-15">
                      <div className="sidebar-icon-item">
                        <img src={salaryIcon} alt="Focus" />
                      </div>
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description salary-icon mb-10">
                          Focus
                        </span>
                        <strong className="small-heading">
                          Interview Skills
                        </strong>
                      </div>
                    </div>

                    <div className="col-md-6 d-flex">
                      <div className="sidebar-icon-item">
                        <img src={experienceIcon} alt="Experience" />
                      </div>
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description experience-icon mb-10">
                          Experience
                        </span>
                        <strong className="small-heading">
                          Fresher & Experienced
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-25">
                    <div className="col-md-6 d-flex mt-sm-15">
                      <div className="sidebar-icon-item">
                        <img src={jobTypeIcon} alt="Type" />
                      </div>
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description jobtype-icon mb-10">
                          Type
                        </span>
                        <strong className="small-heading">Career Guide</strong>
                      </div>
                    </div>

                    <div className="col-md-6 d-flex mt-sm-15">
                      <div className="sidebar-icon-item">
                        <img src={deadlineIcon} alt="Updated" />
                      </div>
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description mb-10">Updated</span>
                        <strong className="small-heading">18/09/2026</strong>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-25">
                    <div className="col-md-6 d-flex mt-sm-15">
                      <div className="sidebar-icon-item">
                        <img src={updatedIcon} alt="Content" />
                      </div>
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description jobtype-icon mb-10">
                          Content
                        </span>
                        <strong className="small-heading">
                          Interview Preparation
                        </strong>
                      </div>
                    </div>

                    <div className="col-md-6 d-flex mt-sm-15">
                      <div className="sidebar-icon-item">
                        <img src={locationIcon} alt="Format" />
                      </div>
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description mb-10">Format</span>
                        <strong className="small-heading">
                          Practical Tips
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content-single">
                  <h4>Prepare With Confidence</h4>
                  <p>
                    An interview gives you an opportunity to demonstrate your
                    skills, experience, communication, and suitability for a
                    role. Good preparation can help you present your experience
                    clearly and respond to questions with confidence.
                  </p>

                  <h4>Research the Company</h4>
                  <p>
                    Before the interview, learn about the organization, its
                    products or services, industry, work culture, and the role
                    you are applying for.
                  </p>

                  <p>
                    Review the job description carefully and identify the key
                    responsibilities and skills the employer is looking for.
                  </p>

                  <h4>Understand Your Resume</h4>
                  <p>
                    Be prepared to discuss everything included in your resume.
                    Interviewers may ask about your previous responsibilities,
                    projects, achievements, education, skills, or career
                    transitions.
                  </p>

                  <p>
                    Make sure you can explain your experience clearly and
                    provide examples when required.
                  </p>

                  <h4>Prepare for Common Questions</h4>
                  <p>Practice answering questions such as:</p>

                  <ul>
                    <li>Tell me about yourself.</li>
                    <li>Why are you interested in this position?</li>
                    <li>What are your key strengths?</li>
                    <li>What is an area you are working to improve?</li>
                    <li>Why are you looking for a new opportunity?</li>
                    <li>Tell me about a challenging situation you handled.</li>
                    <li>Describe a project you are proud of.</li>
                    <li>Where do you see your career developing?</li>
                  </ul>

                  <p>
                    Avoid memorizing answers word-for-word. Instead, prepare key
                    points and examples.
                  </p>

                  <h4>Use Real Examples</h4>
                  <p>
                    When answering experience-based questions, use specific
                    examples from your education, previous employment,
                    internships, projects, or other relevant experiences.
                  </p>

                  <p>A useful structure is:</p>

                  <p>
                    <strong>Situation → Task → Action → Result</strong>
                  </p>

                  <p>
                    Explain what happened, what you were responsible for, what
                    action you took, and what the outcome was.
                  </p>

                  <h4>Communicate Clearly</h4>
                  <p>
                    Listen carefully to each question before answering. Keep
                    your answers relevant and organized.
                  </p>

                  <p>
                    If you do not understand a question, it is acceptable to ask
                    the interviewer to clarify it.
                  </p>

                  <h4>Pay Attention to Body Language</h4>
                  <p>
                    Professional communication includes more than words.
                    Maintain appropriate eye contact, sit comfortably, avoid
                    unnecessary distractions, and demonstrate that you are
                    engaged in the conversation.
                  </p>

                  <p>
                    For virtual interviews, check your camera, microphone,
                    internet connection, lighting, and background before the
                    interview begins.
                  </p>

                  <h4>Dress Professionally</h4>
                  <p>
                    Choose professional and appropriate clothing based on the
                    company and position. Your appearance should be neat and
                    suitable for the interview environment.
                  </p>

                  <h4>Prepare Your Own Questions</h4>
                  <p>
                    An interview is also an opportunity for you to understand
                    the role and organization.
                  </p>

                  <p>You can ask questions such as:</p>

                  <ul>
                    <li>What would the key priorities be in this role?</li>
                    <li>How is success measured?</li>
                    <li>What does a typical day look like?</li>
                    <li>What skills are important for this position?</li>
                    <li>How does the team collaborate?</li>
                    <li>What are the next steps in the recruitment process?</li>
                  </ul>

                  <h4>Follow Up Professionally</h4>
                  <p>
                    After the interview, you can send a short professional
                    message thanking the interviewer for their time and
                    expressing your continued interest in the opportunity.
                  </p>

                  <p>Keep the message concise and professional.</p>

                  <h4>Final Interview Checklist</h4>
                  <p>Before joining the interview, make sure you have:</p>

                  <ul>
                    <li>Reviewed the job description</li>
                    <li>Researched the company</li>
                    <li>Reviewed your resume</li>
                    <li>Prepared relevant examples</li>
                    <li>Practiced common questions</li>
                    <li>Prepared questions for the interviewer</li>
                    <li>Checked your interview location or video setup</li>
                    <li>Kept the required documents ready</li>
                    <li>Confirmed the interview time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BlogInterviewTips;
