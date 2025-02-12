import ReadThisBlogButton from "../CommonComponent/ReadThisBlogButton";
import AddToWishlistButton from "../CommonComponent/AddToWishlistButton";
import DeleteFromWishlistButton from "../CommonComponent/DeleteFromWishlistButton";
import { useLocation } from "react-router-dom";

const TopBlogCard = ({ blog,setLoading }) => {
    const location= useLocation() 
    const path= location.pathname
    console.log(path==="/wishlist")
  return (
    <div className="bg-black">
      <div
        className={` aspect-[4/2.5] md:aspect-[4/2.9] bg-cover bg-no-repeat bg-center 
            grid items-center relative [&_.actionBtn]:opacity-0 [&_.actionBtn]:hover:opacity-100`}
        style={{ backgroundImage: `url(${blog.image})` }}
      >
        <div className="p-4 h-fit bg-[rgba(0,0,0,0.5)] backdrop-blur-sm space-y-2 text-white text-center ">
          <b className="text-custom-primary">- {blog.category} -</b>
          <h6 className={`font-Cinzel line-clamp-3 ${path==="/wishlist"?"xl:text-xl":"xs:text-xl "} font-normal`}>{blog.title}</h6>
        </div>

        <div className="actionBtn bg-custom-half-primary backdrop-blur-[3px] absolute top-0 bottom-0 left-0 right-0 grid  items-center justify-center duration-500">
          <div className=" flex gap-4">
            <ReadThisBlogButton
              _id={path==="/wishlist"?blog.blog_id:blog._id}
              buttonClass={"p-2"}
              iconClass={"text-2xl"}
            />
            {
              (path!=="/wishlist" && path!=="/my_blogs") &&
              <AddToWishlistButton
              _id={blog._id} image={blog.image} title={blog.title} category={blog.category}
              buttonClass={"p-2"}
              iconClass={"text-2xl"}
              />
            }
            {
              path==="/wishlist" &&
              <DeleteFromWishlistButton
              _id={blog._id} setLoading={setLoading}
              buttonClass={"p-2"}
              iconClass={"text-2xl"}
              />
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBlogCard;
