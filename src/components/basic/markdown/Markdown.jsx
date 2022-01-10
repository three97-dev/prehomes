import React from "react";

import { BLOCKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import "./Markdown.css";

const Markdown = ({ data, config }) => {
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className={config && config.h1 ? config.h1 : "markdown-default"}>{children}</h1>
      ),

      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className={config && config.h2 ? config.h2 : "markdown-default"}>{children}</h2>
      ),

      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className={config && config.h3 ? config.h3 : "markdown-default"}>{children}</h3>
      ),

      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className={config && config.h4 ? config.h4 : "markdown-default"}>{children}</h4>
      ),

      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={config && config.p ? config.p : "markdown-default"}>{children}</p>
      ),
    },
  };

  return <div>{renderRichText(data, options)}</div>;
};

export default Markdown;
