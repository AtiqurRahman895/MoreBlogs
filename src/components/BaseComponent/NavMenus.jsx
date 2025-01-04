

import { AiFillHome } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { GiQueenCrown } from "react-icons/gi";
import { BsDatabaseFillCheck } from "react-icons/bs";

const NavMenus = () => {

  return (
    <>
      <li className="w-fit">
        <NavLink to={"/"} className="hover:bg-transparent flex items-center gap-1 pb-1 mb-1"><AiFillHome /> Home</NavLink>
      </li>

      <li className="w-fit">
        <NavLink to={"/all_blogs"} className="hover:bg-transparent flex items-center gap-1 pb-1 mb-1"><IoNewspaper />All blogs</NavLink>
      </li>
      
      <li className="w-fit">
        <NavLink to={"/add_blog"} className="hover:bg-transparent flex items-center gap-1 pb-1 mb-1"><MdRateReview />Add Blog</NavLink>
      </li>

      <li className="w-fit">
        <NavLink to={"/wishlist"} className="hover:bg-transparent flex items-center gap-1 pb-1 mb-1"><FaHeart />My Wishlist</NavLink>
      </li>

      <li className="w-fit">
        <NavLink to={"/featured"} className="hover:bg-transparent flex items-center gap-1 pb-1 mb-1"><GiQueenCrown />Featured</NavLink>
      </li>

      <li className="w-fit">
        <NavLink to={"/my_blogs"} className="hover:bg-transparent flex items-center gap-1 pb-1 mb-1"><BsDatabaseFillCheck />My Blogs</NavLink>
      </li>      

    </>
  );
};

export default NavMenus;
