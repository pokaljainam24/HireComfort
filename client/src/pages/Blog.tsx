import BlogLatestPostCard from "../components/BlogLatestPostCard";
import trendingImg from "../assets/imgs/page/blog/img-trending.png";
import gallery1 from "../assets/imgs/page/blog/gallery1.png";
import gallery2 from "../assets/imgs/page/blog/gallery2.png";
import gallery4 from "../assets/imgs/page/blog/gallery4.png";
import gallery5 from "../assets/imgs/page/blog/gallery5.png";
import newsletterLeft from "../assets/imgs/template/newsletter-left.png";
import newsletterRight from "../assets/imgs/template/newsletter-right.png";

import user1 from "../assets/imgs/page/homepage1/user1.png";
import user2 from "../assets/imgs/page/homepage1/user2.png";
import user3 from "../assets/imgs/page/homepage1/user3.png";

import { getBlogsApi } from "../api/blog/blogApi";

import { Link } from "react-router";
import { useEffect, useState } from "react";
import BlogBigCard from "../components/BlogBigCard.tsx";

function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  // =====================================
  // BLOG SLIDER
  // =====================================

  const [currentBlogSlide, setCurrentBlogSlide] = useState(0);

  const blogsPerSlide = 6;

  // =====================================
  // GET BLOG DATA
  // =====================================

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getBlogsApi();

        console.log("BLOG API RESPONSE:", response);

        setBlogs(response.blogs || []);
      } catch (error) {
        console.error("Blog API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // =====================================
  // BIG BLOGS
  // =====================================

  const bigBlogs = blogs
    .filter((blog) => blog.section === "big")
    .map((blog) => ({
      _id: blog._id,

      bgImage: blog.blogImg,

      title: blog.title,

      heroImage: blog.blogImg,

      authorImg: blog.authorImg,

      authorName: blog.authorName,

      date: new Date(blog.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    }));

  // =====================================
  // LATEST BLOGS
  // =====================================

  const latestBlogs = blogs
    .filter((blog) => blog.section === "latest")
    .map((blog) => ({
      _id: blog._id,

      blogImg: blog.blogImg,

      category: blog.categoryId,

      title: blog.title,

      description: blog.description,

      authorImg: blog.authorImg,

      authorName: blog.authorName,

      date: new Date(blog.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),

      durationInMin: blog.durationInMin,
    }));

  // =====================================
  // LATEST BLOG SLIDER
  // =====================================

  const totalBlogSlides = Math.ceil(
    latestBlogs.length / blogsPerSlide,
  );

  const startIndex = currentBlogSlide * blogsPerSlide;

  const visibleLatestBlogs = latestBlogs.slice(
    startIndex,
    startIndex + blogsPerSlide,
  );

  // =====================================
  // NEXT BLOG SLIDE
  // =====================================

  const handleNextBlogSlide = () => {
    if (currentBlogSlide < totalBlogSlides - 1) {
      setCurrentBlogSlide((slide) => slide + 1);
    }
  };

  // =====================================
  // PREVIOUS BLOG SLIDE
  // =====================================

  const handlePreviousBlogSlide = () => {
    if (currentBlogSlide > 0) {
      setCurrentBlogSlide((slide) => slide - 1);
    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="container mt-50">
        <h3>Loading blogs...</h3>
      </div>
    );
  }

  return (
    <main className="main">
      <section className="section-box">
        <div className="breacrumb-cover">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="mb-10">Blog</h2>

                <p className="font-lg color-text-paragraph-2">
                  Get the latest news, updates and tips
                </p>
              </div>

              <div className="col-lg-6 text-end">
                <ul className="breadcrumbs mt-40">
                  <li>
                    <Link className="home-icon" to="/">
                      Home
                    </Link>
                  </li>

                  <li>Blog</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          BIG BLOGS
      ===================================== */}

      <section className="section-box mt-50">
        <div className="container">
          <div className="row">
            {bigBlogs.map((blog) => (
              <BlogBigCard key={blog._id} {...blog} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          LATEST POSTS
      ===================================== */}

      <section className="section-box mt-50">
        <div className="post-loop-grid">
          <div className="container">
            <div className="text-left">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                Latest Posts
              </h2>

              <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                Don&apos;t miss the trending news
              </p>
            </div>

            <div className="row mt-30">
              <div className="col-lg-8">
                <div className="row">
                  {/* =====================================
                      LATEST BLOGS
                  ===================================== */}

                  {visibleLatestBlogs.map((blog) => (
                    <BlogLatestPostCard
                      key={blog._id}
                      {...blog}
                    />
                  ))}
                </div>

                {/* =====================================
                    BLOG SLIDER ARROWS
                ===================================== */}

                {totalBlogSlides > 1 && (
                  <div className="paginations">
                    <ul className="pager">
                      {/* PREVIOUS */}
                      <li>
                        <button
                          type="button"
                          className="pager-prev"
                          disabled={currentBlogSlide === 0}
                          onClick={handlePreviousBlogSlide}
                        ></button>
                      </li>

                      {/* NEXT */}
                      <li>
                        <button
                          type="button"
                          className="pager-next"
                          disabled={
                            currentBlogSlide ===
                            totalBlogSlides - 1
                          }
                          onClick={handleNextBlogSlide}
                        ></button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* =====================================
                  SIDEBAR
              ===================================== */}

              <div className="col-lg-4 col-md-12 col-sm-12 col-12 pl-40 pl-lg-15 mt-lg-30">
                <div className="widget_search mb-40">
                  <div className="search-form">
                    <form action="#">
                      <input
                        type="text"
                        placeholder="Search…"
                      />

                      <button type="submit">
                        <i className="fi-rr-search"></i>
                      </button>
                    </form>
                  </div>
                </div>

                {/* =====================================
                    TRENDING NOW
                ===================================== */}

                <div className="sidebar-shadow sidebar-news-small">
                  <h5 className="sidebar-title">
                    Trending Now
                  </h5>

                  <div className="post-list-small">
                    {[
                      {
                        thumbnail: trendingImg,
                        title:
                          "How to get better agents in New York, USA",
                        authorImg: user1,
                        authorName: "Sugar Rosie",
                      },

                      {
                        thumbnail: gallery1,
                        title:
                          "How To Create a Resume for a Job in Social",
                        authorImg: user3,
                        authorName: "Harding",
                        date: "17 Sep",
                      },

                      {
                        thumbnail: gallery2,
                        title:
                          "10 Ways to Avoid a Referee Disaster Zone",
                        authorImg: user2,
                        authorName: "Steven",
                        date: "23 Sep",
                      },

                      {
                        thumbnail: gallery4,
                        title:
                          "How To Set Work-Life Boundaries From Any Location",
                        authorImg: user3,
                        authorName: "Merias",
                        date: "14 Sep",
                      },

                      {
                        thumbnail: gallery5,
                        title:
                          "How to Land Your Dream Marketing Job",
                        authorImg: user1,
                        authorName: "Rosie",
                        date: "12 Sep",
                      },
                    ].map((post) => (
                      <div
                        key={post.title}
                        className="post-list-small-item d-flex align-items-center"
                      >
                        <figure className="thumb mr-15">
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                          />
                        </figure>

                        <div className="content">
                          <h5>{post.title}</h5>

                          <div className="post-meta text-muted d-flex align-items-center mb-15">
                            <div className="author d-flex align-items-center mr-20">
                              <img
                                src={post.authorImg}
                                alt={post.authorName}
                              />

                              <span>{post.authorName}</span>
                            </div>

                            {post.date && (
                              <div className="date">
                                <span>{post.date}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          NEWSLETTER
      ===================================== */}

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
                  <br />
                  Update Regularly
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

export default Blog;
