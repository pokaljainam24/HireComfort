import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import marketingIcon from "../assets/imgs/page/homepage1/marketing.svg";
import customerIcon from "../assets/imgs/page/homepage1/customer.svg";
import financeIcon from "../assets/imgs/page/homepage1/finance.svg";
import lightningIcon from "../assets/imgs/page/homepage1/lightning.svg";
import humanIcon from "../assets/imgs/page/homepage1/human.svg";
import managementIcon from "../assets/imgs/page/homepage1/management.svg";
import retailIcon from "../assets/imgs/page/homepage1/retail.svg";
import securityIcon from "../assets/imgs/page/homepage1/security.svg";
import contentIcon from "../assets/imgs/page/homepage1/content.svg";
import researchIcon from "../assets/imgs/page/homepage1/research.svg";

interface ISlides {
  category: {
    title: string;
    jobs: number;
    icon: string;
    link: string;
  };
}

const categorySlides = [
  [
    {
      title: "Marketing & Sale",
      jobs: 1526,
      icon: marketingIcon,
      link: "/jobs-list",
    },
    {
      title: "Customer Help",
      jobs: 185,
      icon: customerIcon,
      link: "/jobs-grid",
    },
  ],

  [
    {
      title: "Finance",
      jobs: 168,
      icon: financeIcon,
      link: "/jobs-grid",
    },
    {
      title: "Software",
      jobs: 1856,
      icon: lightningIcon,
      link: "/jobs-list",
    },
  ],

  [
    {
      title: "Human Resource",
      jobs: 165,
      icon: humanIcon,
      link: "/jobs-grid",
    },
    {
      title: "Management",
      jobs: 965,
      icon: managementIcon,
      link: "/jobs-grid",
    },
  ],

  [
    {
      title: "Retail & Products",
      jobs: 563,
      icon: retailIcon,
      link: "/jobs-list",
    },
    {
      title: "Security Analyst",
      jobs: 254,
      icon: securityIcon,
      link: "/jobs-grid",
    },
  ],

  [
    {
      title: "Content Writer",
      jobs: 142,
      icon: contentIcon,
      link: "/jobs-grid",
    },
    {
      title: "Market Research",
      jobs: 532,
      icon: researchIcon,
      link: "/jobs-list",
    },
  ],
];

// Duplicate slides to ensure loop={true} has enough slides to loop smoothly when slidesPerView is 5
const duplicatedSlides = [...categorySlides, ...categorySlides];

const CategoryCard = ({ category }: ISlides) => {
  return (
    <a href={category.link} className="category-card-link">
      <div className="item-logo">
        <div className="image-left">
          <img src={category.icon} alt={category.title} />
        </div>

        <div className="text-info-right">
          <h4>{category.title}</h4>

          <p className="font-xs">
            {category.jobs}
            <span> Jobs Available</span>
          </p>
        </div>
      </div>
    </a>
  );
};

const CategoryCarousel = () => {
  return (
    <div className="box-swiper mt-50">
      <Swiper
        modules={[Navigation, Autoplay]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 15 },
          576: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          992: { slidesPerView: 4, spaceBetween: 15 },
          1200: { slidesPerView: 5, spaceBetween: 15 },
        }}
        navigation={{
          prevEl: ".swiper-button-prev-group-5",
          nextEl: ".swiper-button-next-group-5",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="swiper-container swiper-group-5"
      >
        {duplicatedSlides.map((slide, index) => (
          <SwiperSlide key={index} className="hover-up">
            {slide.map((category) => (
              <CategoryCard key={category.title} category={category} />
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-next swiper-button-next-group-5"></div>
      <div className="swiper-button-prev swiper-button-prev-group-5"></div>
    </div>
  );
};

export default CategoryCarousel;
