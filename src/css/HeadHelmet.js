import React from "react";
import { Helmet } from "react-helmet";

import LateNovemberBold from "../fonts/late-november/late-november-bold.woff2";
import LateNovember from "../fonts/late-november/late-november.woff2";

import MetropolisBold from "../fonts/metropolis/metropolis-bold.woff2";
import Metropolis from "../fonts/metropolis/metropolis-regular.woff2";

import RosarioBold from "../fonts/rosario/Rosario-Bold.woff2";
import Rosario from "../fonts/rosario/Rosario-Regular.woff2";

// TODO: redo
export default function HeadHelmet({ children }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="preload" as="font" href={LateNovemberBold} type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href={LateNovember} type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href={MetropolisBold} type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href={Metropolis} type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href={RosarioBold} type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href={Rosario} type="font/woff2" crossOrigin="anonymous" />
      </Helmet>
      {children}
    </>
  );
}
