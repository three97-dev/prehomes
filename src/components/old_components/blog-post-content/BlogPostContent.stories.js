import React from "react";

import BlogPostContent from "./BlogPostContent";

import image1 from "../../../assets/old_assets/pages/blog/blog-tile-img1-webhd.png";
import image2 from "../../../assets/old_assets/pages/blog/blog-tile-img2-webhd.png";

export default {
  title: "Blog/Blog Post Content",
  component: BlogPostContent,
};

const Template = args => <BlogPostContent {...args} />;

export const Default = Template.bind({});
Default.args = {
  posts: [
    {
      postImage: {
        title: "alt text tile 1",
        file: {
          url: image1,
        },
      },
      link: "/",
      title: "5 Lessons Learned from COVID-19 Reporting",
      subtitle: "The Do’s and Dont’s of Reporting",
      postDate: "March 17, 2021",
      linkLabel: "Read More >",
    },
    {
      postImage: {
        title: "alt text tile 2",
        file: {
          url: image2,
        },
      },
      link: "/",
      title: "Is CRM Really Worth the Investment?",

      subtitle: "How Small Business Can Realize ROI on a CRM",
      postDate: "February 18, 2021",
      linkLabel: "Read More >",
    },
    {
      postImage: {
        title: "alt text tile 1",
        file: {
          url: image1,
        },
      },
      link: "/",
      title: "5 Lessons Learned from COVID-19 Reporting",
      subtitle: "The Do’s and Dont’s of Reporting",
      postDate: "March 17, 2021",
      linkLabel: "Read More >",
    },
    {
      postImage: {
        title: "alt text tile 2",
        file: {
          url: image2,
        },
      },
      link: "/",
      title: "Is CRM Really Worth the Investment?",
      subtitle: "How Small Business Can Realize ROI on a CRM",
      postDate: "February 18, 2021",
      linkLabel: "Read More >",
    },
  ],
};
