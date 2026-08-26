import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import newsImage1 from "../assets/imgs/page/homepage1/img-news1.png";
import newsImage2 from "../assets/imgs/page/homepage1/img-news2.png";
import newsImage3 from "../assets/imgs/page/homepage1/img-news3.png";

import user1 from "../assets/imgs/page/homepage1/user1.png";
import user2 from "../assets/imgs/page/homepage1/user2.png";
import user3 from "../assets/imgs/page/homepage1/user3.png";

interface BlogPost {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: newsImage1,
    category: "News",
    title: "21 Job Interview Tips: How To Make a Great Impression",
    description:
      "Our mission is to create the world's most sustainable healthcare company by creating high-quality healthcare products in iconic, sustainable packaging.",
    author: "Sarah Harding",
    authorImage: user1,
    date: "06 September",
    readTime: "8 mins to read",
  },
  {
    id: 2,
    image: newsImage2,
    category: "Events",
    title: "39 Strengths and Weaknesses To Discuss in a Job Interview",
    description:
      "Our mission is to create the world's most sustainable healthcare company by creating high-quality healthcare products in iconic, sustainable packaging.",
    author: "Steven Jobs",
    authorImage: user2,
    date: "06 September",
    readTime: "6 mins to read",
  },
  {
    id: 3,
    image: newsImage3,
    category: "News",
    title: "Interview Question: Why Dont You Have a Degree?",
    description:
      "Learn how to respond if an interviewer asks you why you dont have a degree, and read example answers that can help you craft",
    author: "Wiliam Kend",
    authorImage: user3,
    date: "06 September",
    readTime: "9 mins to read",
  },
];

const loopedBlogPosts = [...blogPosts, ...blogPosts];

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
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
      {/* Image */}
      <a
        href="/blog-details"
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
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </a>

      {/* Content */}
      <div
        style={{
          padding: "15px 8px 10px",
        }}
      >
        {/* Category */}
        <div
          style={{
            marginBottom: "16px",
          }}
        >
          <a
            href="/blog-grid"
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
            {post.category}
          </a>
        </div>

        {/* Title */}
        <h5
          style={{
            margin: "0 0 10px",
            fontSize: "20px",
            lineHeight: "1.3",
            fontWeight: 600,
            color: "#002d62",
          }}
        >
          <a
            href="/blog-details"
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {post.title}
          </a>
        </h5>

        {/* Description */}
        <p
          style={{
            margin: 0,
            minHeight: "68px",
            color: "#50627a",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          {post.description}
        </p>

        {/* Bottom */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Author */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src={post.authorImage}
              alt={post.author}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#4169a1",
                  lineHeight: "1.3",
                }}
              >
                {post.author}
              </div>

              <div
                style={{
                  marginTop: "2px",
                  fontSize: "12px",
                  color: "#8290a5",
                }}
              >
                {post.date}
              </div>
            </div>
          </div>

          {/* Read time */}
          <span
            style={{
              fontSize: "12px",
              color: "#71809a",
              whiteSpace: "nowrap",
            }}
          >
            {post.readTime}
          </span>
        </div>
      </div>
    </div>
  );
};

const NewsBlogCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);

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

        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={true}
          speed={700}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={20}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
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
          {loopedBlogPosts.map((post, index) => (
            <SwiperSlide
              key={`${post.id}-${index}`}
              style={{
                height: "auto",
              }}
            >
              <BlogCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= LOAD MORE ================= */}
      <div
        style={{
          textAlign: "center",
          marginTop: "25px",
        }}
      >
        <a
          href="/blog-grid"
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
        </a>
      </div>
    </section>
  );
};

export default NewsBlogCarousel;
