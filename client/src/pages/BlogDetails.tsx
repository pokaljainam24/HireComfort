import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import calendar from "../assets/imgs/page/blog/calendar.svg";
import time from "../assets/imgs/template/icons/time.svg";
import fb from "../assets/imgs/page/blog/fb.svg";
import tw from "../assets/imgs/page/blog/tw.svg";
import pi from "../assets/imgs/page/blog/pi.svg";

import newsletterLeft from "../assets/imgs/template/newsletter-left.png";
import newsletterRight from "../assets/imgs/template/newsletter-right.png";

import { getBlogByIdApi } from "../api/blog/blogApi";

interface Blog {
  _id: string;
  categoryId: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  blogImg: string;
  authorImg: string;
  authorName: string;
  date: string;
  durationInMin: string;
  section: "big" | "latest";
  isActive: boolean;
  isDisplay: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string | null;
  deleteAt: string | null;
  deleteBy: string | null;
}

// =====================================
// IMAGE URL
// =====================================

const getImageUrl = (image?: string) => {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  const cleanPath = image.replace(/\\/g, "/").replace(/^\/+/, "");

  return `http://localhost:5000/${cleanPath}`;
};

function BlogDetails() {
  const { id } = useParams<{ id: string }>();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setError("Blog ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        console.log("BLOG DETAILS ID:", id);

        const response = await getBlogByIdApi(id);

        console.log("BLOG DETAILS RESPONSE:", response);

        const blogData =
          response?.data?.blog || response?.blog || response?.data || response;

        console.log("BLOG DATA:", blogData);

        setBlog(blogData);

        setBlog(blogData);
      } catch (error) {
        console.error("BLOG DETAILS ERROR:", error);
        setError("Unable to load blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <main className="main">
        <section className="section-box">
          <div className="container text-center pt-100 pb-100">
            <h3>Loading blog...</h3>
          </div>
        </section>
      </main>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (error || !blog) {
    return (
      <main className="main">
        <section className="section-box">
          <div className="container text-center pt-100 pb-100">
            <h3>{error || "Blog not found"}</h3>

            <Link to="/blogs" className="btn btn-default mt-20">
              Back to Blogs
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="main">
      {/* =====================================
          BLOG HEADER IMAGE
      ===================================== */}

      {blog.blogImg && (
        <section className="section-box">
          <div className="blog-details-main-image">
            <img src={getImageUrl(blog.blogImg)} alt={blog.title} />
          </div>
        </section>
      )}

      {/* =====================================
          BLOG HEADER
      ===================================== */}

      <section className="section-box">
        <div className="archive-header pt-50 text-center">
          <div className="container">
            <div className="box-white">
              <div className="max-width-single">
                {/* Category */}

                <Link className="btn btn-tag" to="#">
                  {blog.categoryId}
                </Link>

                {/* Title */}

                <h2 className="mb-30 mt-20 text-center">{blog.title}</h2>

                {/* Meta */}

                <div className="post-meta text-muted d-flex align-items-center mx-auto justify-content-center">
                  {/* Author */}

                  <div className="author d-flex align-items-center mr-30">
                    {blog.authorImg && (
                      <img
                        alt={blog.authorName}
                        src={getImageUrl(blog.authorImg)}
                      />
                    )}

                    <span>{blog.authorName}</span>
                  </div>

                  {/* Date */}

                  <div className="date">
                    <span className="font-xs color-text-paragraph-2 mr-20 d-inline-block">
                      <img className="img-middle mr-5" src={calendar} alt="" />

                      {new Date(blog.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    {/* Reading Time */}

                    <span className="font-xs color-text-paragraph-2 d-inline-block">
                      <img className="img-middle mr-5" src={time} alt="" />
                      {blog.durationInMin} mins to read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          BLOG CONTENT
          TINYMCE CONTENT WILL COME HERE
      ===================================== */}

      <div className="post-loop-grid">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="single-body">
                {/* =====================================
                    CONTENT IMAGE
                ===================================== */}

                {blog.blogImg && (
                  <figure className="blog-details-content-image">
                    <img src={getImageUrl(blog.blogImg)} alt={blog.title} />
                  </figure>
                )}

                {/* =====================================
                    BLOG CONTENT
                ===================================== */}

                <div className="max-width-single">
                  <div
                    className="font-lg mb-30 content-single blog-details-content"
                    dangerouslySetInnerHTML={{
                      __html: blog.description,
                    }}
                  />
                </div>

                {/* =====================================
                    SHARE
                ===================================== */}

                <div className="max-width-single">
                  <div className="single-apply-jobs mt-20">
                    <div className="row">
                      <div className="col-lg-7">
                        <Link
                          className="btn btn-border-3 mr-10 hover-up"
                          to="#"
                        >
                          #{blog.categoryId}
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
                          <img alt="Facebook" src={fb} />
                        </Link>

                        <Link
                          className="mr-20 d-inline-block d-middle hover-up"
                          to="#"
                        >
                          <img alt="Twitter" src={tw} />
                        </Link>

                        <Link
                          className="mr-0 d-inline-block d-middle hover-up"
                          to="#"
                        >
                          <img alt="Pinterest" src={pi} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          NEWSLETTER
      ===================================== */}

      <section className="section-box mt-50 mb-20">
        <div className="container">
          <div className="box-newsletter">
            <div className="row">
              <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                <img src={newsletterLeft} alt="newsletter" />
              </div>

              <div className="col-lg-12 col-xl-6 col-12">
                <h2 className="text-md-newsletter text-center">
                  New Things Will Always
                  <br />
                  Update Regularly
                </h2>

                <div className="box-form-newsletter mt-40">
                  <form className="form-newsletter">
                    <input
                      className="input-newsletter"
                      type="text"
                      placeholder="Enter your email here"
                    />

                    <button
                      type="submit"
                      className="btn btn-default font-heading icon-send-letter"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                <img src={newsletterRight} alt="newsletter" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BlogDetails;
