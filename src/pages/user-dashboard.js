import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { StaticImage } from "gatsby-plugin-image";

import {
  Header,
  HeroSection,
  SliderSmallTiles,
  ContactRealtorFormSection,
  FloorPlans,
  Footer,
  ModalCongratulations,
} from "../components";

import { options } from "../utils/filterOptions";

const UserDashboardPage = () => {
  const [favoriteProjects, setFavoriteProjects] = useState(null);
  const [favoriteFloorPlans, setFavoriteFloorPlans] = useState(null);
  const [isModalCongratulationsOpen, setIsModalCongratulationsOpen] = useState(false);

  const session = useSelector(state => state.session);

  useEffect(() => {
    const greeting = JSON.parse(localStorage.getItem("greeting"));

    if (greeting && session.isLoggedIn && session.hubspotContact === "created") {
      setIsModalCongratulationsOpen(true);
      localStorage.removeItem("greeting");
    }
    async function fetchPageData(email) {
      try {
        const [projectsRes, floorPlansRes] = await Promise.all([
          axios.post("/.netlify/functions/getFavoriteProjectsResolved", { email }),
          axios.post("/.netlify/functions/getFavoriteFloorPlansResolved", { email }),
        ]);
        setFavoriteProjects(projectsRes.data);
        setFavoriteFloorPlans(floorPlansRes.data);
      } catch (err) {
        console.error("Failed to fetch page data:", err);
      }
    }
    if (session.isLoggedIn) {
      fetchPageData(session.email);
      localStorage.removeItem("greeting");
    }
  }, [session, setFavoriteProjects, setFavoriteFloorPlans]);

  return (
    <div>
      <ModalCongratulations
        modalIsOpen={isModalCongratulationsOpen}
        onClose={() => {
          setIsModalCongratulationsOpen(false);
        }}
        title="Welcome to Your Dashboard."
        content="user-dashboard"
      />
      <Header logoLink="/" />
      <HeroSection
        image={
          <StaticImage
            src="../assets/user-dashboard/dashboard-hero.png"
            alt="Dashboard hero section background"
            className="-z-10 w-full h-screen md:h-500px"
          />
        }
        title={session.name ? `Hi, ${session.name}` : null}
        isUserDashboard
        isStaticImage
      />
      <SliderSmallTiles
        arrowsColor="black-gray-2"
        mainTitle="My Favourites"
        helpMarkTooltip="My Favorites Tooltip"
        showNoProjects={true}
        showHelpMark={true}
        smallTileData={favoriteProjects}
        bgWrapperClasses="bg-white-pink md:bg-light-gray"
        paddingTitleClasses="pt-95px"
        paddingSliderClasses="pt-70px pb-50px"
      />
      {favoriteFloorPlans ? <FloorPlans floors={favoriteFloorPlans} options={options} className="mx-auto" /> : null}
      <ContactRealtorFormSection />
      <Footer />
    </div>
  );
};

export default UserDashboardPage;
