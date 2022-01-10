import React from "react";

import FourBlogPosts from "./FourBlogPosts";

import image1 from "../../../assets/old_assets/pages/blog/blog-tile-img1-webhd.png";
import image2 from "../../../assets/old_assets/pages/blog/blog-tile-img2-webhd.png";

export default {
  title: "Blog/Four Blog Posts",
  component: FourBlogPosts,
};

const Template = args => <FourBlogPosts {...args} />;

export const Default = Template.bind({});
Default.args = {
  posts: [
    {
      postImage: {
        mock: image1,
      },
      link: "/",
      title: "5 Lessons Learned from COVID-19 Reporting",
      subtitle: "The Do’s and Dont’s of Reporting",
      postDate: "March 17, 2021",
      linkLabel: "Read More >",
    },
    {
      postImage: {
        mock: image2,
      },
      link: "/",
      title: "Is CRM Really Worth the Investment?",

      subtitle: "How Small Business Can Realize ROI on a CRM",
      postDate: "February 18, 2021",
      linkLabel: "Read More >",
    },
    {
      postImage: {
        mock: image1,
      },
      link: "/",
      title: "5 Lessons Learned from COVID-19 Reporting",
      subtitle: "The Do’s and Dont’s of Reporting",
      postDate: "March 17, 2021",
      linkLabel: "Read More >",
    },
    {
      postImage: {
        mock: image2,
      },
      link: "/",
      title: "Is CRM Really Worth the Investment?",
      subtitle: "How Small Business Can Realize ROI on a CRM",
      postDate: "February 18, 2021",
      linkLabel: "Read More >",
    },
  ],
};
