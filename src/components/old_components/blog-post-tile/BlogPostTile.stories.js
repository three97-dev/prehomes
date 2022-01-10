import React from "react";

import BlogPostTile from "./BlogPostTile";

import BlogPostImage from "../../../assets/old_assets/pages/blog/blog-tile-img1-webhd.png";

export default {
  title: "Blog/Blog Post Tile",
  component: BlogPostTile,
};
const Template = args => (
  <div style={{ margin: "20px", display: "flex" }}>
    <BlogPostTile {...args} />
  </div>
);
export const Default = Template.bind({});
Default.args = {
  postImage: {
    mock: BlogPostImage
  },
  link: "/",
  title: "5 Lessons Learned from COVID-19 Reporting",
  subtitle: "The Do’s and Dont’s of Reporting",
  postDate: "March 17, 2021",
  linkLabel: "Read More >",
};
