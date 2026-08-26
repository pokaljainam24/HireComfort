import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import brand1 from "../assets/imgs/brands/brand-1.png";
import brand2 from "../assets/imgs/brands/brand-2.png";
import brand3 from "../assets/imgs/brands/brand-3.png";
import brand4 from "../assets/imgs/brands/brand-4.png";
import brand5 from "../assets/imgs/brands/brand-5.png";
import brand6 from "../assets/imgs/brands/brand-6.png";
import brand7 from "../assets/imgs/brands/brand-7.png";
import brand8 from "../assets/imgs/brands/brand-8.png";
import brand9 from "../assets/imgs/brands/brand-9.png";
import brand10 from "../assets/imgs/brands/brand-10.png";

import "swiper/css";

interface Recruiter {
  id: number;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  location: string;
  openJobs: number;
}

type RecruiterSlide = Recruiter[];

const recruiterSlides: RecruiterSlide[] = [
  [
    {
      id: 1,
      name: "LinkedIn",
      logo: brand1,
      rating: 5,
      reviews: 68,
      location: "New York, US",
      openJobs: 25,
    },
    {
      id: 2,
      name: "Whop.com",
      logo: brand2,
      rating: 5,
      reviews: 34,
      location: "New York, US",
      openJobs: 56,
    },
    {
      id: 3,
      name: "Toyota",
      logo: brand3,
      rating: 5,
      reviews: 34,
      location: "New York, US",
      openJobs: 26,
    },
  ],

  [
    {
      id: 4,
      name: "Adobe",
      logo: brand4,
      rating: 5,
      reviews: 42,
      location: "New York, US",
      openJobs: 17,
    },
    {
      id: 5,
      name: "Greewood",
      logo: brand5,
      rating: 5,
      reviews: 124,
      location: "New York, US",
      openJobs: 78,
    },
    {
      id: 6,
      name: "Lexus",
      logo: brand6,
      rating: 5,
      reviews: 27,
      location: "New York, US",
      openJobs: 54,
    },
  ],

  [
    {
      id: 7,
      name: "Dailymotion",
      logo: brand7,
      rating: 5,
      reviews: 46,
      location: "New York, US",
      openJobs: 65,
    },
    {
      id: 8,
      name: "Kentucky",
      logo: brand8,
      rating: 5,
      reviews: 54,
      location: "New York, US",
      openJobs: 98,
    },
    {
      id: 9,
      name: "Ondo",
      logo: brand9,
      rating: 5,
      reviews: 54,
      location: "New York, US",
      openJobs: 58,
    },
  ],

  [
    {
      id: 10,
      name: "NewSum",
      logo: brand10,
      rating: 5,
      reviews: 68,
      location: "New York, US",
      openJobs: 25,
    },
    {
      id: 11,
      name: "Qeuity",
      logo: brand1,
      rating: 5,
      reviews: 76,
      location: "New York, US",
      openJobs: 90,
    },
    {
      id: 12,
      name: "Square",
      logo: brand2,
      rating: 5,
      reviews: 16,
      location: "New York, US",
      openJobs: 37,
    },
  ],

  [
    {
      id: 13,
      name: "PowerHome",
      logo: brand3,
      rating: 5,
      reviews: 87,
      location: "New York, US",
      openJobs: 34,
    },
    {
      id: 14,
      name: "Honda",
      logo: brand4,
      rating: 5,
      reviews: 89,
      location: "New York, US",
      openJobs: 34,
    },
    {
      id: 15,
      name: "Vista",
      logo: brand5,
      rating: 5,
      reviews: 97,
      location: "New York, US",
      openJobs: 43,
    },
  ],
];

const loopedRecruiterSlides = [...recruiterSlides, ...recruiterSlides];

interface RecruiterCardProps {
  recruiter: Recruiter;
}

const RecruiterCard = ({ recruiter }: RecruiterCardProps) => {
  return (
    <a
      href="/recruiter"
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        marginBottom: "14px",
      }}
    >
      <div
        style={{
          padding: "20px 18px",
          border: "1px solid #e1e5eb",
          borderRadius: "10px",
          background: "#ffffff",
          boxSizing: "border-box",
        }}
      >
        {/* Company */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              minWidth: "52px",
              borderRadius: "9px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#eef2ff",
            }}
          >
            <img
              src={recruiter.logo}
              alt={recruiter.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <h4
            style={{
              margin: 0,
              color: "#002d62",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {recruiter.name}
          </h4>
        </div>

        {/* Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <span
            style={{
              color: "#ffb000",
              fontSize: "14px",
              letterSpacing: "1px",
              lineHeight: 1,
            }}
          >
            {"★".repeat(recruiter.rating)}
          </span>

          <span
            style={{
              color: "#98a2b3",
              fontSize: "12px",
            }}
          >
            ({recruiter.reviews})
          </span>
        </div>

        {/* Bottom information */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            color: "#98a2b3",
            fontSize: "12px",
          }}
        >
          {/* Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              minWidth: 0,
            }}
          >
            <span
              style={{
                color: "#9aa9bd",
                fontSize: "14px",
                flexShrink: 0,
              }}
            >
              <i className="fi-rr-marker" />
            </span>

            <span
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {recruiter.location}
            </span>
          </div>

          {/* Jobs */}
          <span
            style={{
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {recruiter.openJobs} Open Jobs
          </span>
        </div>
      </div>
    </a>
  );
};

const TopRecruitersCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1250px",
        margin: "0 auto",
        padding: "0 0",
        boxSizing: "border-box",
      }}
    >
      {/* Left Arrow */}
      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous recruiters"
        style={{
          position: "absolute",
          top: "-78px",
          right: "65px",
          zIndex: 20,

          width: "38px",
          height: "38px",

          border: "none",
          borderRadius: "50%",

          background: "#eef2ff",
          color: "#9aa9c4",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor: "pointer",
          padding: 0,
        }}
      >
        <i
          className="fi-rr-angle-left"
          style={{
            fontSize: "13px",
          }}
        />
      </button>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next recruiters"
        style={{
          position: "absolute",
          top: "-78px",
          right: "20px",
          zIndex: 20,

          width: "38px",
          height: "38px",

          border: "none",
          borderRadius: "50%",

          background: "#eef2ff",
          color: "#9aa9c4",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor: "pointer",
          padding: 0,
        }}
      >
        <i
          className="fi-rr-angle-right"
          style={{
            fontSize: "13px",
          }}
        />
      </button>

      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={24}
        slidesPerGroup={1}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },

          576: {
            slidesPerView: 2,
          },

          768: {
            slidesPerView: 3,
          },

          992: {
            slidesPerView: 4,
          },

          1200: {
            slidesPerView: 5,
          },
        }}
        style={{
          width: "100%",
          padding: "5px 0",
        }}
      >
        {loopedRecruiterSlides.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{
              height: "auto",
            }}
          >
            {slide.map((recruiter) => (
              <RecruiterCard key={recruiter.id} recruiter={recruiter} />
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRecruitersCarousel;
