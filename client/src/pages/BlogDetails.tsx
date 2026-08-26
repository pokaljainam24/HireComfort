import imgSingle from "../assets/imgs/page/blog/img-single.png";
import user3 from "../assets/imgs/page/homepage1/user3.png";
import calendar from "../assets/imgs/page/blog/calendar.svg";
import time from "../assets/imgs/template/icons/time.svg";
import imgContent from "../assets/imgs/page/blog/img-content.png";
import fb from "../assets/imgs/page/blog/fb.svg";
import tw from "../assets/imgs/page/blog/tw.svg";
import pi from "../assets/imgs/page/blog/pi.svg";
import user5 from "../assets/imgs/page/candidates/user5.png";
import user1 from "../assets/imgs/page/candidates/user1.png";
import newsletterLeft from "../assets/imgs/template/newsletter-left.png";
import newsletterRight from "../assets/imgs/template/newsletter-right.png";
import { Link } from "react-router";

function BlogDetails() {
  return (
    <main className="main">
      <section className="section-box">
        <div>
          <img src={imgSingle} />
        </div>
      </section>
      <section className="section-box">
        <div className="archive-header pt-50 text-center">
          <div className="container">
            <div className="box-white">
              <div className="max-width-single">
                <Link className="btn btn-tag" to="/#">
                  Job Tips
                </Link>
                <h2 className="mb-30 mt-20 text-center">
                  11 Tips to Help You Get New Clients Through Cold Calling
                </h2>
                <div className="post-meta text-muted d-flex align-items-center mx-auto justify-content-center">
                  <div className="author d-flex align-items-center mr-30">
                    <img alt="jobBox" src={user3} />
                    <span>Sarah Harding</span>
                  </div>
                  <div className="date">
                    <span className="font-xs color-text-paragraph-2 mr-20 d-inline-block">
                      <img className="img-middle mr-5" src={calendar} /> 06 Sep
                      2026
                    </span>
                    <span className="font-xs color-text-paragraph-2 d-inline-block">
                      <img className="img-middle mr-5" src={time} /> 8 mins to
                      read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="post-loop-grid">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="single-body">
                <div className="max-width-single">
                  <div className="font-lg mb-30">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Quisque ornare pellentesque sollicitudin. Suspendisse
                      potenti. Fusce ex risus, iaculis sit amet sapien nec,
                      finibus malesuada mi. Proin at turpis eget sapien pulvinar
                      luctus. Vestibulum bibendum pharetra lorem eu aliquam. In
                      feugiat placerat risus, sed rutrum neque mattis sit amet.
                      Nullam vestibulum ante ac quam tempor, id venenatis velit
                      eleifend. Duis id iaculis risus, quis ullamcorper augue.
                      Nunc tristique venenatis ipsum at euismod. Pellentesque id
                      arcu est.
                    </p>
                  </div>
                </div>
                <figure>
                  <img src={imgContent} />
                </figure>
                <div className="max-width-single">
                  <div className="content-single">
                    <p></p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Quisque ornare pellentesque sollicitudin. Suspendisse
                      potenti. Fusce ex risus, iaculis sit amet sapien nec,
                      finibus malesuada mi. Proin at turpis eget sapien pulvinar
                      luctus. Vestibulum bibendum pharetra lorem eu aliquam. In
                      feugiat placerat risus, sed rutrum neque mattis sit amet.
                      Nullam vestibulum ante ac quam tempor, id venenatis velit
                      eleifend. Duis id iaculis risus, quis ullamcorper augue.
                      Nunc tristique venenatis ipsum at euismod. Pellentesque id
                      arcu est.
                    </p>
                    <h4>In ut odio libero</h4>
                    <ul>
                      <li>
                        A portfolio demonstrating well thought through and
                        polished end to end customer journeys
                      </li>
                      <li>
                        5+ years of industry experience in interactive design
                        and / or visual design
                      </li>
                      <li>Excellent interpersonal skills&#x202F;</li>
                      <li>
                        Aware of trends in&#x202F;mobile, communications, and
                        collaboration
                      </li>
                      <li>
                        Ability to create highly polished design prototypes,
                        mockups, and other communication artifacts
                      </li>
                      <li>
                        The ability to scope and estimate efforts accurately and
                        prioritize tasks and goals independently
                      </li>
                      <li>
                        History of impacting shipping products with your work
                      </li>
                      <li>
                        A Bachelor&rsquo;s Degree in Design (or related field)
                        or equivalent professional experience
                      </li>
                      <li>
                        Proficiency in a variety of design tools such as Figma,
                        Photoshop, Illustrator, and Sketch
                      </li>
                    </ul>
                    <p></p>
                    <p>
                      Phasellus enim magna, varius et commodo ut, ultricies
                      vitae velit. Ut nulla tellus, eleifend euismod
                      pellentesque vel, sagittis vel justo. In libero urna,
                      venenatis sit amet ornare non, suscipit nec risus. Sed
                      consequat justo non mauris pretium at tempor justo
                      sodales. Quisque tincidunt laoreet malesuada. Cum sociis
                      natoque penatibus et magnis dis parturient montes,
                      nascetur ridiculus mus. Integer vitae ante enim. Fusce sed
                      elit est. Suspendisse sit amet mauris in quam pretium
                      faucibus et aliquam odio.
                    </p>
                  </div>
                  <div className="single-apply-jobs mt-20">
                    <div className="row">
                      <div className="col-lg-7">
                        <Link
                          className="btn btn-border-3 mr-10 hover-up"
                          to="#"
                        >
                          # Nature
                        </Link>
                        <Link
                          className="btn btn-border-3 mr-10 hover-up"
                          to="#"
                        >
                          # Beauty
                        </Link>
                        <Link className="btn btn-border-3 hover-up" to="#">
                          # Travel tips
                        </Link>
                      </div>
                      <div className="col-md-5 text-lg-end social-share">
                        <h6 className="color-text-paragraph-2 d-inline-block d-baseline mr-20 mt-10">
                          Share
                        </h6>
                        <Link
                          className="mr-20 d-inline-block d-middle hover-up"
                          to="#"
                        >
                          <img alt="jobBox" src={fb} />
                        </Link>
                        <Link
                          className="mr-20 d-inline-block d-middle hover-up"
                          to="#"
                        >
                          <img alt="jobBox" src={tw} />
                        </Link>
                        <Link
                          className="mr-0 d-inline-block d-middle hover-up"
                          to="#"
                        >
                          <img alt="jobBox" src={pi} />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <h3>Comments</h3>
                  <ul className="list-comments">
                    <li>
                      <div className="author-bio mt-40 bg-white">
                        <div className="author-image mb-15">
                          <Link to="#">
                            <img className="avatar" src={user5} alt="" />
                          </Link>
                          <div className="author-infor">
                            <h6 className="mt-0 mb-0">Robert Fox</h6>
                            <p className="mb-0 color-text-paragraph-2 font-sm">
                              August 25, 2026
                            </p>
                          </div>
                        </div>
                        <div className="author-des">
                          <p className="font-md color-text-paragraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed ultricies interdum massa nec fermentum.
                            Phasellus interdum dignissim rhoncus. Nam vitae
                            semper magna. Donec massa enim
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="author-bio mt-40 bg-white">
                        <div className="author-image mb-15">
                          <Link to="#">
                            <img className="avatar" src={user1} alt="" />
                          </Link>
                          <div className="author-infor">
                            <h6 className="mt-0 mb-0">Jenny Wilson</h6>
                            <p className="mb-0 color-text-paragraph-2 font-sm">
                              August 25, 2026
                            </p>
                          </div>
                        </div>
                        <div className="author-des">
                          <p className="font-md color-text-paragraph">
                            White white dreamy drama tically place everything
                            although. Place out apartment afternoon whimsical
                            kinder, little romantic joy we flowers handmade.
                            Nullam vestibulum semper ultrices.
                          </p>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <div className="author-bio mt-40 bg-white">
                            <div className="author-image mb-15">
                              <Link to="#">
                                <img className="avatar" src={user3} alt="" />
                              </Link>
                              <div className="author-infor">
                                <h6 className="mt-0 mb-0">Eleanor Pena</h6>
                                <p className="mb-0 color-text-paragraph-2 font-sm">
                                  August 25, 2026
                                </p>
                              </div>
                            </div>
                            <div className="author-des">
                              <p className="font-md color-text-paragraph">
                                White white dreamy drama tically place
                                everything although. Place out apartment
                                afternoon whimsical kinder, little romantic joy
                                we flowers handmade. Nullam vestibulum semper
                                ultrices.
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div className="border-bottom mt-50 mb-50"></div>
                  <div className="mt-30">
                    <h3>Leave a comment</h3>
                    <div className="form-comment">
                      <form action="#">
                        <div className="form-group">
                          <textarea
                            className="input-comment"
                            placeholder="Write a comment"
                          ></textarea>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-7 mb-30">
                            <label className="box-agree">
                              <input
                                className="chkbox-aggree"
                                type="checkbox"
                              />
                              <span className="font-sm color-text-paragraph">
                                Save my name, email, and website in this browser
                                for the next time I comment.
                              </span>
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-5 text-end">
                            <button className="btn btn-default font-bold">
                              Post comment
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section-box mt-50 mb-20">
        <div className="container">
          <div className="box-newsletter">
            <div className="row">
              <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                <img src={newsletterLeft} alt="joxBox" />
              </div>
              <div className="col-lg-12 col-xl-6 col-12">
                <h2 className="text-md-newsletter text-center">
                  New Things Will Always
                  <br /> Update Regularly
                </h2>
                <div className="box-form-newsletter mt-40">
                  <form className="form-newsletter">
                    <input
                      className="input-newsletter"
                      type="text"
                      defaultValue=""
                      placeholder="Enter your email here"
                    />
                    <button className="btn btn-default font-heading icon-send-letter">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                <img src={newsletterRight} alt="joxBox" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BlogDetails;
