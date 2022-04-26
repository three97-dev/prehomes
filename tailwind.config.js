require("dotenv").config();

module.exports = {
  purge: process.env.PREVIEW_ENV === "true" ? false : ["./src/**/*.js"],
  variants: {
    extend: {
      backgroundColor: ["active", "focus-visible", "disabled", "hover"],
      textColor: ["active", "focus-visible"],
      borderColor: ["active", "hover", "focus-visible"],
      borderWidth: ["hover", "focus-visible"],
      padding: ["focus-visible"],
      outline: ["focus", "focus-visible"],
    },
  },
  theme: {
    minHeight: {
      "600px": "600px",
      "321px": "321px",
    },
    extend: {
      dropShadow: {
        tile: "10px 10px 5px rgba(0, 0, 0, 0.15)",
      },
      zIndex: {
        "-20": "-20",
        "-10": "-10",
        100: "100",
      },
    },
    screens: {
      sm: "390px",
      "sm+": "600px",
      md: "834px",
      "md+": "1100px",
      lg: "1366px",
      "lg+": "1500px",
      xl: "1920px",
    },
    colors: {
      "white-gray": "#FFFBFB",
      "light-blue": "#E9F1FF",
      blue: "#4285F4",
      "premium-gray": "#515151",
      beige: "#E5E5E5",
      "white-pink": "#FFEEEE",
      "cream-white": "#FFFEF9",
      "cream-pink": "#FFF9EC",
      "simple-cream": "#FDFCF8",
      "red-color-error": "#F15D5E",
      "red-color-error-2": "#AF0000",
      "dark-orange": "#AC9986",
      "dark-creamy": "#AB9785",
      "dark-green": "#8A7E61",
      "gray-border": "#C4C4C4",
      "black-gray": "#202020",
      "dark-brown": "#181818",
      "light-black": "#343434",
      "white-asphalt": "#8C8B8B",
      "light-gray": "#FBFBFB",
      "light-grey-2": "#C4C4C4",
      tundora: "#404040",
      silver: "#F0F0F1",
      "dark-silver": "#C9C0C0",
      "dark-gray": "#8B8B8B",
      gray: "#757575",
      whitesmoke: "#F4F4F4",
      black: "#000",
      white: "#FFFFFF",
      transparent: "transparent",
      "mild-purple": "#B9A4E8",
      "deep-purple": "#7043D4",
      "light-purple": "#F5F1FF",
      "minty-green": "#2DE2D9",
      "mild-black": "#363636",
      "placeholder-color": "#B3B3B3",
      grey: "#848484",
    },
    spacing: {
      "0px": "0rem",
      "1px": "0.1rem",
      "2px": "0.2rem",
      "3px": "0.3rem",
      "4px": "0.4rem",
      "5px": "0.5rem",
      "6px": "0.6rem",
      "7px": "0.7rem",
      "8px": "0.8rem",
      "9px": "0.9rem",
      "10px": "1rem",
      "11px": "1.1rem",
      "12px": "1.2rem",
      "13px": "1.3rem",
      "14px": "1.4rem",
      "15px": "1.5rem",
      "16px": "1.6rem",
      "17px": "1.7rem",
      "18px": "1.8rem",
      "19px": "1.9rem",
      "20px": "2rem",
      "21px": "2.1rem",
      "22px": "2.2rem",
      "23px": "2.3rem",
      "24px": "2.4rem",
      "25px": "2.5rem",
      "26px": "2.6rem",
      "27px": "2.7rem",
      "28px": "2.8rem",
      "29px": "2.9rem",
      "30px": "3rem",
      "31px": "3.1rem",
      "32px": "3.2rem",
      "33px": "3.3rem",
      "34px": "3.4rem",
      "35px": "3.5rem",
      "36px": "3.6rem",
      "37px": "3.7rem",
      "38px": "3.8rem",
      "39px": "3.9rem",
      "40px": "4rem",
      "41px": "4.1rem",
      "42px": "4.2rem",
      "43px": "4.3rem",
      "44px": "4.4rem",
      "45px": "4.5rem",
      "46px": "4.6rem",
      "47px": "4.7rem",
      "48px": "4.8rem",
      "49px": "4.9rem",
      "50px": "5rem",
      "51px": "5.1rem",
      "52px": "5.2rem",
      "53px": "5.3rem",
      "54px": "5.4rem",
      "55px": "5.5rem",
      "56px": "5.6rem",
      "57px": "5.7rem",
      "58px": "5.8rem",
      "60px": "6rem",
      "61px": "6.1rem",
      "62px": "6.2rem",
      "63px": "6.3rem",
      "64px": "6.4rem",
      "65px": "6.5rem",
      "66px": "6.6rem",
      "68px": "6.8rem",
      "69px": "6.9rem",
      "70px": "7rem",
      "71px": "7.1rem",
      "72px": "7.2rem",
      "73px": "7.3rem",
      "74px": "7.4rem",
      "75px": "7.5rem",
      "76px": "7.6rem",
      "77px": "7.7rem",
      "78px": "7.8rem",
      "79px": "7.9rem",
      "80px": "8rem",
      "81px": "8.1rem",
      "82px": "8.2rem",
      "83px": "8.3rem",
      "84px": "8.4rem",
      "85px": "8.5rem",
      "86px": "8.6rem",
      "87px": "8.7rem",
      "88px": "8.8rem",
      "89px": "8.9rem",
      "90px": "9rem",
      "91px": "9.1rem",
      "92px": "9.2rem",
      "93px": "9.3rem",
      "94px": "9.4rem",
      "95px": "9.5rem",
      "96px": "9.6rem",
      "97px": "9.7rem",
      "98px": "9.8rem",
      "100px": "10rem",
      "101px": "10.1rem",
      "102px": "10.2rem",
      "103px": "10.3rem",
      "104px": "10.4rem",
      "107px": "10.7rem",
      "108px": "10.8rem",
      "110px": "11rem",
      "111px": "11.1rem",
      "112px": "11.2rem",
      "113px": "11.3rem",
      "114px": "11.4rem",
      "115px": "11.5rem",
      "116px": "11.6rem",
      "117px": "11.7rem",
      "119px": "11.9rem",
      "120px": "12rem",
      "121px": "12.1rem",
      "122px": "12.2rem",
      "123px": "12.3rem",
      "124px": "12.4rem",
      "125px": "12.5rem",
      "126px": "12.6rem",
      "127px": "12.7rem",
      "128px": "12.8rem",
      "130px": "13rem",
      "131px": "13.1rem",
      "132px": "13.2rem",
      "133px": "13.3rem",
      "134px": "13.4rem",
      "135px": "13.5rem",
      "136px": "13.6rem",
      "137px": "13.7rem",
      "138px": "13.8rem",
      "139px": "13.9rem",
      "140px": "14rem",
      "141px": "14.1rem",
      "142px": "14.2rem",
      "143px": "14.3rem",
      "144px": "14.4rem",
      "146px": "14.6rem",
      "147px": "14.7rem",
      "148px": "14.8rem",
      "150px": "15rem",
      "152px": "15.2rem",
      "153px": "15.3rem",
      "154px": "15.4rem",
      "155px": "15.5rem",
      "156px": "15.6rem",
      "160px": "16rem",
      "164px": "16.4rem",
      "165px": "16.5rem",
      "166px": "16.6rem",
      "167px": "16.7rem",
      "168px": "16.8rem",
      "170px": "17rem",
      "172px": "17.2rem",
      "174px": "17.4rem",
      "175px": "17.5rem",
      "176px": "17.6rem",
      "177px": "17.7rem",
      "178px": "17.8rem",
      "179px": "17.9rem",
      "180px": "18rem",
      "183px": "18.3rem",
      "182px": "18.2rem",
      "185px": "18.5rem",
      "187px": "18.7rem",
      "188px": "18.8rem",
      "190px": "19rem",
      "192px": "19.2rem",
      "194px": "19.4rem",
      "196px": "19.6rem",
      "197px": "19.7rem",
      "200px": "20rem",
      "202px": "20.2rem",
      "203px": "20.3rem",
      "205px": "20.5rem",
      "210px": "21rem",
      "212px": "21.2rem",
      "213px": "21.3rem",
      "215px": "21.5rem",
      "216px": "21.6rem",
      "217px": "21.7rem",
      "218px": "21.8rem",
      "219px": "21.9rem",
      "221px": "22.1rem",
      "222px": "22.2rem",
      "225px": "22.5rem",
      "232px": "23.2rem",
      "233px": "23.3rem",
      "236px": "23.6rem",
      "237px": "23.7rem",
      "239px": "23.9rem",
      "241px": "24.1rem",
      "242px": "24.2rem",
      "246px": "24.6rem",
      "247px": "24.7rem",
      "250px": "25rem",
      "251px": "25.1rem",
      "252px": "25.2rem",
      "253px": "25.3rem",
      "254px": "25.4rem",
      "255px": "25.5rem",
      "257px": "25.7rem",
      "260px": "26rem",
      "262px": "26.2rem",
      "263px": "26.3rem",
      "265px": "26.5rem",
      "268px": "26.8rem",
      "269px": "26.9rem",
      "270px": "27rem",
      "276px": "27.6rem",
      "277px": "27.7rem",
      "278px": "27.8rem",
      "280px": "28rem",
      "284px": "28.4rem",
      "285px": "28.5rem",
      "288px": "28.8rem",
      "291px": "29.1rem",
      "292px": "29.2rem",
      "294px": "29.4rem",
      "295px": "29.5rem",
      "298px": "29.8rem",
      "300px": "30rem",
      "303px": "30.3rem",
      "305px": "30.5rem",
      "306px": "30.6rem",
      "308px": "30.8rem",
      "310px": "31rem",
      "312px": "31.2rem",
      "313px": "31.3rem",
      "316px": "31.6rem",
      "318px": "31.8rem",
      "320px": "32rem",
      "323px": "32.3rem",
      "326px": "32.6rem",
      "327px": "32.7rem",
      "328px": "32.8rem",
      "329px": "32.9rem",
      "330px": "33.2rem",
      "332px": "33rem",
      "333px": "33.3rem",
      "336px": "33.6rem",
      "344px": "34.4rem",
      "346px": "34.6rem",
      "347px": "34.7rem",
      "349px": "34.9rem",
      "350px": "35rem",
      "352px": "35.2rem",
      "353px": "35.3rem",
      "354px": "35.4rem",
      "356px": "35.6rem",
      "357px": "35.7rem",
      "360px": "36rem",
      "362px": "36.2rem",
      "367px": "36.7rem",
      "370px": "37rem",
      "374px": "37.4rem",
      "377px": "37.7rem",
      "378px": "37.8rem",
      "379px": "37.9rem",
      "388px": "38.8rem",
      "390px": "39rem",
      "391px": "39.1rem",
      "392px": "39.2rem",
      "398px": "39.8rem",
      "400px": "40rem",
      "405px": "40.5rem",
      "406px": "40.6rem",
      "413px": "41.3rem",
      "414px": "41.4rem",
      "416px": "41.6rem",
      "419px": "41.9rem",
      "424px": "42.4rem",
      "428px": "42.8rem",
      "432px": "43.2rem",
      "439px": "43.9rem",
      "441px": "44.1rem",
      "442px": "44.2rem",
      "444px": "44.4rem",
      "446px": "44.6rem",
      "450px": "45rem",
      "456px": "45.6rem",
      "457px": "45.7rem",
      "462px": "46.2rem",
      "463px": "46.3rem",
      "465px": "46.5rem",
      "467px": "46.7rem",
      "475px": "47.5rem",
      "479px": "47.9rem",
      "481px": "48.1rem",
      "486px": "48.6rem",
      "490px": "49rem",
      "491px": "49.1rem",
      "495px": "49.5rem",
      "500px": "50rem",
      "501px": "50.1rem",
      "505px": "50.5rem",
      "507px": "50.7rem",
      "509px": "50.9rem",
      "512px": "51.2rem",
      "523px": "52.3rem",
      "524px": "52.4rem",
      "525px": "52.5rem",
      "526px": "52.6rem",
      "528px": "52.8rem",
      "531px": "53.1rem",
      "533px": "53.3rem",
      "535px": "53.5rem",
      "536px": "53.6rem",
      "538px": "53.8rem",
      "540px": "54rem",
      "552px": "55.2rem",
      "560px": "56rem",
      "561px": "56.1rem",
      "565px": "56.5rem",
      "580px": "58rem",
      "584px": "58.4rem",
      "587px": "58.7rem",
      "591px": "59.1rem",
      "602px": "60.2rem",
      "620px": "62rem",
      "625px": "62.5rem",
      "629px": "62.9rem",
      "632px": "63.2rem",
      "637px": "63.7rem",
      "640px": "64rem",
      "642px": "64.2rem",
      "650px": "65rem",
      "652px": "65,2rem",
      "672px": "67.2rem",
      "674px": "67.4rem",
      "682px": "68.2rem",
      "690px": "69rem",
      "691px": "69.1rem",
      "695px": "69.5rem",
      "712px": "71.2rem",
      "714px": "71.4rem",
      "716px": "71.6rem",
      "720px": "72rem",
      "721px": "72.1rem",
      "745px": "74.5rem",
      "750px": "75rem",
      "760px": "76rem",
      "765px": "76.5rem",
      "766px": "76.6rem",
      "768px": "76.8rem",
      "771px": "77.1rem",
      "775px": "77.5rem",
      "790px": "79rem",
      "834px": "83.4rem",
      "843px": "84.3rem",
      "844px": "84.4rem",
      "852px": "85.2rem",
      "858px": "85.8rem",
      "871px": "87.1rem",
      "880px": "88rem",
      "886px": "88.6rem",
      "890px": "89rem",
      "896px": "89.6rem",
      "904px": "90.4rem",
      "912px": "91.2rem",
      "924px": "92.4rem",
      "930px": "93rem",
      "948px": "94.8rem",
      "972px": "97.2rem",
      "985px": "98.5rem",
      "990px": "99rem",
      "1012px": "101.2rem",
      "1076px": "107.6rem",
      "1080px": "108rem",
      "1088px": "108.8rem",
      "1096px": "109.6rem",
      "1111px": "111.1rem",
      "1112px": "111.2rem",
      "1147px": "114.7rem",
      "1175px": "117.5rem",
      "1183px": "118.3rem",
      "1185px": "118.5rem",
      "1189px": "118.9rem",
      "1196px": "119.6rem",
      "1198px": "119.8rem",
      "1205px": "120.5rem",
      "1215px": "121.5rem",
      "1227px": "122.7rem",
      "1238px": "123.8rem",
      "1242px": "124.2rem",
      "1262px": "126.2rem",
      "1265px": "126.5rem",
      "1338px": "133.8rem",
      "1366px": "136.6rem",
      "1400px": "140rem",
      "1453px": "145.3rem",
      "1458px": "145.8rem",
      "1640px": "164rem",
      "1691px": "169.1rem",
      "1900px": "190rem",
      "1920px": "192rem",
      "2061px": "206.1rem",
      "screen-xs": "39rem",
      "screen-sm": "48rem",
      "screen-md": "83.4rem",
      "screen-lg": "136.6rem",
      "screen-xl": "192rem",
      max: "max-content",
      "1/4": "25%",
    },
    maxWidth: {
      //   "screen-xs": "39rem",
      //   "screen-sm": "48rem",
      //   "screen-md": "83.4rem",
      //   "screen-lg": "136.6rem",
      //   "screen-xl": "192rem",
      "154px": "15.4rem",
      "168px": "16.8rem",
      "160px": "16rem",
      "173px": "17.3rem",
      "200px": "20rem",
      "237px": "23.7rem",
      "241px": "24.1rem",
      "242px": "24.2rem",
      "246px": "24.6rem",
      "250px": "25rem",
      "260px": "26rem",
      "268px": "26.8rem",
      "278px": "27.8rem",
      "316px": "31.6rem",
      "318px": "31.8rem",
      "321px": "32.1rem",
      "328px": "32.8rem",
      "339px": "33.9rem",
      "349px": "34.9rem",
      "350px": "35rem",
      "352px": "35.2rem",
      "363px": "36.3rem",
      "414px": "41.4rem",
      "423px": "42.3rem",
      "430px": "43rem",
      "444px": "44.4rem",
      "451px": "45.1rem",
      "470px": "47rem",
      "496px": "49.6rem",
      "500px": "50rem",
      "535px": "53.5rem",
      "536px": "53.6rem",
      "539px": "53.9rem",
      "619px": "61.9rem",
      "632px": "63.2rem",
      "642px": "64.2rem",
      "672px": "67.2rem",
      "674px": "67.4rem",
      "680px": "68rem",
      "720px": "72rem",
      "728px": "72.8rem",
      "812px": "81.2rem",
      "904px": "90.4rem",
      "1088px": "108.8rem",
      "1105px": "110.5rem",
      "1118px": "111.8rem",
      "1122px": "112.2rem",
      "1124px": "112.4rem",
      "1126px": "112.6rem",
      "1130px": "113rem",
      "1162px": "116.2rem",
      "1246px": "124.6rem",
      "1272px": "127.2rem",
      "1319px": "131.9rem",
      "1340px": "134rem",
      "1366px": "136.6rem",
      "1440px": "144rem",
      "1550px": "155rem",
      full: "100%",
      none: "none",
    },
    minWidth: {
      "136px": "13.6rem",
      "360px": "36rem",
      "440px": "44rem",
      "700px": "70rem",
    },
    borderRadius: {
      "5px": "0.5rem",
      "8px": "0.8rem",
      "9px": "0.9rem",
      "10px": "1rem",
      "15px": "1.5rem",
      "16px": "1.6rem",
      "24px": "2.4rem",
      "28px": "2.8rem",
      "32px": "3.2rem",
      "50px": "5rem",
      "80px": "8rem",
      "100px": "10rem",
      full: "999.9rem",
    },
    fontFamily: {
      rosario: ["Rosario", "Roboto", "Arial", "sans-serif"],
      metropolis: ["Metropolis", "Roboto", "Arial", "sans-serif"],
      "late-november": ["Late November", "Roboto", "Arial", "sans-serif"],
      poppins: ["Poppins", "Roboto", "Arial", "sans-serif"],
      pangram: ["Pangram", "Roboto", "Arial", "sans-serif"],
    },
    fontSize: {
      h1: [
        "4.2rem",
        {
          lineHeight: "5.4rem",
        },
      ],
      h2: [
        "2.8rem",
        {
          lineHeight: "3.8rem",
        },
      ],
      h3: [
        "2.2rem",
        {
          lineHeight: "3rem",
        },
      ],
      h4: [
        "1.8rem",
        {
          lineHeight: "2.4rem",
        },
      ],
      body: [
        "1.6rem",
        {
          lineHeight: "2rem",
          letterSpacing: "0.002em",
        },
      ],
      footer: [
        "1.4rem",
        {
          lineHeight: "1.8rem",
        },
      ],
      stats: [
        "6rem",
        {
          lineHeight: "6.4rem",
        },
      ],
      paginator: [
        "1.8rem",
        {
          lineHeight: "2.4rem",
        },
      ],
      ourApproachSmall: [
        "1.5rem",
        {
          lineHeight: "2rem",
          letterSpacing: "0.002em",
        },
      ],
      ourApproachWeb: [
        "3.5rem",
        {
          lineHeight: "5.2rem",
          letterSpacing: "0.05em",
        },
      ],
      ourApproachWebhd: [
        "5.5rem",
        {
          lineHeight: "7.5rem",
          letterSpacing: "0.02em",
        },
      ],
      testimonialsTablet: [
        "1.7rem",
        {
          lineHeight: "2.3rem",
        },
      ],
      testimonialsWebhd: [
        "2.3rem",
        {
          lineHeight: "3.2rem",
        },
      ],
      "10px": "1rem",
      "11px": "1.1rem",
      "12px": "1.2rem",
      "13px": "1.3rem",
      "14px": "1.4rem",
      "16px": "1.6rem",
      "18px": "1.8rem",
      "20px": "2rem",
      "22px": "2.2rem",
      "23px": "2.3rem",
      "24px": "2.4rem",
      "26px": "2.6rem",
      "28px": "2.8rem",
      "29px": "2.9rem",
      "32px": "3.2rem",
      "33px": "3.3rem",
      "36px": "3.6rem",
      "40px": "4.0rem",
      "42px": "4.2rem",
      "46px": "4.6em",
      "47px": "4.7rem",
      "48px": "4.8rem",
      "53px": "5.3rem",
    },
    lineHeight: {
      "11px": "1.1rem",
      "12px": "1.2rem",
      "14px": "1.4rem",
      "16px": "1.6rem",
      "17px": "1.7rem",
      "18px": "1.8rem",
      "19px": "1.9rem",
      "20px": "2rem",
      "22px": "2.2rem",
      "23px": "2.3rem",
      "24px": "2.4rem",
      "26px": "2.6rem",
      "29px": "2.9rem",
      "30px": "3.0rem",
      "35px": "3.5rem",
      "31px": "3.1rem",
      "40px": "4rem",
      "42px": "4.2rem",
      "43px": "4.3rem",
      "44px": "4.4rem",
      "49px": "4.9rem",
      "50px": "5rem",
      "54px": "5.4rem",
      "61px": "6.1rem",
    },
  },
};
