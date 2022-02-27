import search from "../assets/search.svg";
import favorite from "../assets/button/favorite-black.svg";
import developer from "../assets/hero/developer-icon.svg";
import city from "../assets/hero/city-icon.svg";

const headerLinks = [
  {
    link: "/search",
    name: "Search",
    image: search,
  },
  {
    link: "/cities",
    name: "Cities",
    image: city,
  },
  {
    link: "/developers",
    name: "Developers",
    image: developer,
  },
  {
    link: "/user-dashboard",
    name: "Favourites",
    image: favorite,
  },
];

export default headerLinks;
