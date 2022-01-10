import React from "react";

import Testimonials from "./Testimonials";

import TestimonialsImage from "../../../assets/old_assets/pages/home/testimonials.png";

export default {
  title: "Home/Testimonials Slider",
  component: Testimonials,
};

export const Default = ({ ...args }) => <Testimonials {...args} />;
Default.args = {
  title: "Testimonials",
  image: {
    mock: TestimonialsImage,
  },
  testimonialsToShow: [
    {
      testimonial:
        "Throughout this process I have appreciated having the ability to talk to people that take the time (and have the ability) to understand our business and truly customize our CRM platform to exactly what makes sense for us. Amplify’s knowledge and experience in Dynamics, sales, and business in general, has been hugely valuable throughout this process, mostly because of their ability to apply this expertise to our unique requirements.",
      author: "RYAN MITCHEL",
      authorPosition: "PRESIDENT/OWNER",
      authorCompany: "WILDWOOD TRANDPORT",
    },
    {
      testimonial:
        "Throughout this process I have appreciated having the ability to talk to people that take the time (and have the ability) to understand our business and truly customize our CRM platform to exactly what makes sense for us. Amplify’s knowledge and experience in Dynamics, sales, and business in general, has been hugely valuable throughout this process, mostly because of their ability to apply this expertise to our unique requirements.",
      author: "JOHN DOE",
      authorPosition: "CEO",
      authorCompany: "WITCHER",
    },
    {
      testimonial:
        "Throughout this process I have appreciated having the ability to talk to people that take the time (and have the ability) to understand our business and truly customize our CRM platform to exactly what makes sense for us. Amplify’s knowledge and experience in Dynamics, sales, and business in general, has been hugely valuable throughout this process, mostly because of their ability to apply this expertise to our unique requirements.",
      author: "ELISABETH ZALTSMAN",
      authorPosition: "MARKETING DIRECTOR",
      authorCompany: "APPLE",
    },
    {
      testimonial:
        "Throughout this process I have appreciated having the ability to talk to people that take the time (and have the ability) to understand our business and truly customize our CRM platform to exactly what makes sense for us. Amplify’s knowledge and experience in Dynamics, sales, and business in general, has been hugely valuable throughout this process, mostly because of their ability to apply this expertise to our unique requirements.",
      author: "SHELDON COOPER",
      authorPosition: "SCIENTIST",
      authorCompany: "PHYSICS SC",
    },
    {
      testimonial:
        "Throughout this process I have appreciated having the ability to talk to people that take the time (and have the ability) to understand our business and truly customize our CRM platform to exactly what makes sense for us. Amplify’s knowledge and experience in Dynamics, sales, and business in general, has been hugely valuable throughout this process, mostly because of their ability to apply this expertise to our unique requirements.",
      author: "NORBERT HEEL",
      authorPosition: "OWNER",
      authorCompany: "TROUBLEMAKER",
    },
  ],
};
