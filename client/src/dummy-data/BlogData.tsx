import type { IBlogBigCard } from "../components/BlogBigCard";
import bigImage1 from "../assets/imgs/page/blog/img-big1.png";
import bigImage2 from "../assets/imgs/page/blog/img-big2.png";
import bigImage3 from "../assets/imgs/page/blog/img-big3.png";
import user3 from "../assets/imgs/page/candidates/user3.png";
import user2 from "../assets/imgs/page/homepage1/user2.png";
import user1 from "../assets/imgs/page/candidates/user1.png";
import ava1 from "../assets/imgs/page/blog/ava_1.png";
import imgNews1 from "../assets/imgs/page/homepage1/img-news1.png";
import imgNews2 from "../assets/imgs/page/homepage1/img-news2.png";
import imgNews3 from "../assets/imgs/page/homepage1/img-news3.png";
import userAbout1 from "../assets/imgs/page/about/user1.png";
import userAbout2 from "../assets/imgs/page/about/user2.png";
import userAbout3 from "../assets/imgs/page/about/user3.png";
import userHome1 from "../assets/imgs/page/homepage1/user1.png";

import img1 from "../assets/imgs/page/blog/img1.png";
import img2 from "../assets/imgs/page/blog/img2.png";
import img3 from "../assets/imgs/page/blog/img3.png";

import type { IBlogLatestPostCard } from "../components/BlogLatestPostCard";

export const blogBigCardData: IBlogBigCard[] = [
  {
    bgImage: bigImage1,
    author: "Azumi Rose",
    date: "25 April 2026",
    heroImage: user3,
    title: "11 Tips to Help You Get New Clients",
  },
  {
    bgImage: bigImage2,
    author: "Thompson",
    date: "28 April 2026",
    heroImage: user1,
    title: "Recruiter and Land Your Dream Job",
  },
  {
    bgImage: bigImage3,
    author: "Alice Json",
    date: "29 April 2026",
    heroImage: ava1,
    title: "Work-From-Home Jobs That Pay Well",
  },
];

export const blogLatestPostsData: IBlogLatestPostCard[] = [
  {
    heroImg: img1,
    type: "News",
    title: "21 Job Interview Tips: How To Make a Great Impression",
    description:
      "Our mission is to create the world's most sustainable healthcare company by creating high-quality healthcare products in iconic, sustainable packaging.",
    authorImg: user1,
    authorName: "Azumi Rose",
    date: "25 April 2026",
    durationInMin: "8",
  },
  {
    heroImg: img2,
    type: "Events",
    title: "Email Examples: How To Respond to Employer Interview Requests",
    description:
      "Our mission is to create the world's most sustainable healthcare company by creating high-quality healthcare products in iconic, sustainable packaging.",
    authorImg: user2,
    authorName: "Azumi Rose",
    date: "25 April 2026",
    durationInMin: "8",
  },
  {
    heroImg: img3,
    type: "Events",
    title: "How To Write an Application Letter (With Examples)",
    description:
      "Our mission is to create the world's most sustainable healthcare company by creating high-quality healthcare products in iconic, sustainable packaging.",
    authorImg: user3,
    authorName: "Azumi Rose",
    date: "25 April 2026",
    durationInMin: "8",
  },
  {
    heroImg: imgNews1,
    type: "Events",
    title: "17 Jobs That Hire at Age 15 (and Even 14)",
    description:
      "Our mission is to create the world's most sustainable healthcare company by creating high-quality healthcare products in iconic, sustainable packaging.",
    authorImg: userAbout1,
    authorName: "Azumi Rose",
    date: "25 April 2026",
    durationInMin: "8",
  },
  {
    heroImg: imgNews2,
    type: "Events",
    title: "How To Write a Cover Letter (Plus Tips and Examples)",
    description:
      "Our mission is to create the world's most sustainable healthcare company by creating high-quality healthcare products in iconic, sustainable packaging.",
    authorImg: userAbout2,
    authorName: "Azumi Rose",
    date: "25 April 2026",
    durationInMin: "8",
  },
  {
    heroImg: imgNews3,
    type: "Events",
    title: "10 Best Skills To Include on a Resume",
    description:
      "Our mission is to create the world's most sustainable healthcare company by creating high-quality healthcare products in iconic, sustainable packaging.",
    authorImg: userAbout3,
    authorName: "Azumi Rose",
    date: "25 April 2026",
    durationInMin: "8",
  },
  {
    heroImg: img1,
    type: "Events",
    title: "39 Strengths and Weaknesses To Discuss in a Job Interview",
    description:
      "Our mission is to create the world's most sustainable healthcare company by creating high-quality healthcare products in iconic, sustainable packaging.",
    authorImg: userHome1,
    authorName: "Azumi Rose",
    date: "25 April 2026",
    durationInMin: "8",
  },
  {
    heroImg: img2,
    type: "Events",
    title: "List of Weaknesses: 10 Things To Say in an Interview",
    description:
      "Our mission is to create the world's most sustainable healthcare company by creating high-quality healthcare products in iconic, sustainable packaging.",
    authorImg: userHome1,
    authorName: "Azumi Rose",
    date: "25 April 2026",
    durationInMin: "8",
  },
];
