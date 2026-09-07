import { useEffect, useRef, useState } from "react";

import { Link } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import { getBlogsApi } from "../api/blog/blogApi.ts";

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

interface BlogCardProps {
  post: Blog;
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

// =====================================
// STRIP HTML FROM TINYMCE CONTENT
// =====================================

const stripHtml = (html: string) => {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
};

// =====================================
// DATE FORMAT
// =====================================

const formatDate = (date: string) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// =====================================
// BLOG CARD
// =====================================

const BlogCard = ({ post }: BlogCardProps) => {
  const description = stripHtml(post.description);

  // Particular blog details URL
  const blogDetailsUrl = `/blog-details/${post._id}`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid #dce4f0",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        padding: "10px",
        boxSizing: "border-box",
        transition: "all 0.3s ease",
      }}
    >
      {/* ================= IMAGE ================= */}

      <Link
        to={blogDetailsUrl}
        style={{
          display: "block",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "255px",
            overflow: "hidden",
            borderRadius: "12px",
          }}
        >
          {post.blogImg ? (
            <img
              src={getImageUrl(post.blogImg)}
              alt={post.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f1f4f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#8290a5",
                fontSize: "14px",
              }}
            >
              No Image
            </div>
          )}
        </div>
      </Link>

      {/* ================= CONTENT ================= */}

      <div
        style={{
          padding: "15px 8px 10px",
        }}
      >
        {/* ================= CATEGORY ================= */}

        <div
          style={{
            marginBottom: "16px",
          }}
        >
          <Link
            to={blogDetailsUrl}
            style={{
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: "5px",
              backgroundColor: "#e8eefc",
              color: "#4169e1",
              fontSize: "13px",
              lineHeight: "1",
              textDecoration: "none",
            }}
          >
            {post.categoryId}
          </Link>
        </div>

        {/* ================= TITLE ================= */}

        <h5
          style={{
            margin: "0 0 10px",
            fontSize: "20px",
            lineHeight: "1.3",
            fontWeight: 600,
            color: "#002d62",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          <Link
            to={blogDetailsUrl}
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {post.title}
          </Link>
        </h5>

        {/* ================= DESCRIPTION ================= */}

        <p
          style={{
            margin: 0,
            minHeight: "68px",
            color: "#50627a",
            fontSize: "14px",
            lineHeight: "1.6",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>

        {/* ================= BOTTOM ================= */}

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* ================= AUTHOR ================= */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              minWidth: 0,
            }}
          >
            {post.authorImg ? (
              <img
                src={getImageUrl(post.authorImg)}
                alt={post.authorName}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#e8eefc",
                  flexShrink: 0,
                }}
              />
            )}

            <div
              style={{
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#4169a1",
                  lineHeight: "1.3",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "150px",
                }}
              >
                {post.authorName}
              </div>

              <div
                style={{
                  marginTop: "2px",
                  fontSize: "12px",
                  color: "#8290a5",
                }}
              >
                {formatDate(post.date)}
              </div>
            </div>
          </div>

          {/* ================= READ TIME ================= */}

          <span
            style={{
              fontSize: "12px",
              color: "#71809a",
              whiteSpace: "nowrap",
            }}
          >
            {post.durationInMin} mins to read
          </span>
        </div>
      </div>
    </div>
  );
};

// =====================================
// MAIN COMPONENT
// =====================================

const NewsBlogCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // =====================================
  // FETCH BLOGS FUNCTION
  // =====================================

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await getBlogsApi();

      console.log("NEWS BLOG API RESPONSE:", response);

      /*
       * Backend response handle
       *
       * Possible:
       * response.data
       * response.blogs
       * direct array
       */

      const blogData = response?.data || response?.blogs || response;

      const blogList = Array.isArray(blogData) ? blogData : [];

      // Only active + display blogs
      const activeBlogs = blogList.filter(
        (blog: Blog) => blog.isActive === true && blog.isDisplay === true,
      );

      console.log("ACTIVE BLOGS:", activeBlogs);

      setBlogs(activeBlogs);
    } catch (error) {
      console.error("NEWS BLOG FETCH ERROR:", error);

      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // USE EFFECT
  // =====================================

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section
      style={{
        width: "100%",
        padding: "45px 0 60px",
        backgroundColor: "#ffffff",
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            margin: "0 0 10px",
            fontSize: "38px",
            lineHeight: "1.2",
            fontWeight: 700,
            color: "#002d62",
          }}
        >
          News and Blog
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: "18px",
            lineHeight: "1.5",
            color: "#607aa5",
          }}
        >
          Get the latest news, updates and tips
        </p>
      </div>

      {/* ================= CAROUSEL ================= */}

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        {/* ================= BUTTONS ================= */}

        {!loading && blogs.length > 1 && (
          <>
            {/* LEFT BUTTON */}

            <button
              type="button"
              aria-label="Previous blog posts"
              onClick={() => swiperRef.current?.slidePrev()}
              style={{
                position: "absolute",
                top: "-88px",
                right: "68px",
                zIndex: 10,
                width: "40px",
                height: "40px",
                border: "none",
                borderRadius: "50%",
                backgroundColor: "#edf2ff",
                color: "#9aabc8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#dce6ff";
                e.currentTarget.style.color = "#4169e1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#edf2ff";
                e.currentTarget.style.color = "#9aabc8";
              }}
            >
              <i className="fi-rr-angle-left" />
            </button>

            {/* RIGHT BUTTON */}

            <button
              type="button"
              aria-label="Next blog posts"
              onClick={() => swiperRef.current?.slideNext()}
              style={{
                position: "absolute",
                top: "-88px",
                right: "20px",
                zIndex: 10,
                width: "40px",
                height: "40px",
                border: "none",
                borderRadius: "50%",
                backgroundColor: "#edf2ff",
                color: "#9aabc8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#dce6ff";
                e.currentTarget.style.color = "#4169e1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#edf2ff";
                e.currentTarget.style.color = "#9aabc8";
              }}
            >
              <i className="fi-rr-angle-right" />
            </button>
          </>
        )}

        {/* ================= LOADING ================= */}

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
              color: "#607aa5",
            }}
          >
            Loading blogs...
          </div>
        )}

        {/* ================= NO BLOGS ================= */}

        {!loading && blogs.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
              color: "#607aa5",
            }}
          >
            No blogs available.
          </div>
        )}

        {/* ================= SWIPER ================= */}

        {!loading && blogs.length > 0 && (
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={blogs.length > 3}
            speed={700}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={20}
            autoplay={
              blogs.length > 1
                ? {
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 15,
              },

              576: {
                slidesPerView: 1,
                spaceBetween: 20,
              },

              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },

              992: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            style={{
              width: "100%",
              paddingBottom: "10px",
            }}
          >
            {blogs.map((post) => (
              <SwiperSlide
                key={post._id}
                style={{
                  height: "auto",
                }}
              >
                <BlogCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* ================= LOAD MORE ================= */}

      {!loading && blogs.length > 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          <Link
            to="/blog-grid"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 25px",
              borderRadius: "6px",
              backgroundColor: "#4169e1",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
          >
            Load More Posts
          </Link>
        </div>
      )}
    </section>
  );
};

export default NewsBlogCarousel;
