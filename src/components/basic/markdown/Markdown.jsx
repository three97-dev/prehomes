import React from "react";

import ReactMarkdown from "react-markdown";

import "./Markdown.css";

const Markdown = ({ data, config, className }) => {
  const components = {
    h1: ({ node, level, ...props }) => (
      <h1 className={config && config.h1 ? config.h1 : "markdown-default"} {...props} />
    ),
    h2: ({ node, level, ...props }) => (
      <h2 className={config && config.h2 ? config.h2 : "markdown-default"} {...props} />
    ),
    h3: ({ node, level, ...props }) => (
      <h3 className={config && config.h3 ? config.h3 : "markdown-default"} {...props} />
    ),
    h4: ({ node, level, ...props }) => (
      <h4 className={config && config.h4 ? config.h4 : "markdown-default"} {...props} />
    ),
    p: ({ node, ...props }) => <p className={config && config.p ? config.p : "markdown-default"} {...props} />,
    a: ({ node, level, ...props }) => (
      <a className={config && config.a ? config.a : "markdown-default"} {...props} />
    ),
    u: ({node, ...props}) => <u style={{textDecoration: 'underline'}} {...props} />,
  };

  return (
    <div className={className}>
      <ReactMarkdown components={components}>{data}</ReactMarkdown>
    </div>
  );
};

export default Markdown;
