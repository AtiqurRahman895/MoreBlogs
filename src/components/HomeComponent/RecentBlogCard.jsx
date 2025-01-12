import AddToWishlistButton from "../CommonComponent/AddToWishlistButton";
import ReadThisBlogButton from "../CommonComponent/ReadThisBlogButton";

const RecentBlogCard = ({ blog }) => {
  return (
    <div className="space-y-5 text-black mb-10">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full aspect-[3/2] object-cover object-center"
      />
      <div className="">
        <h6 className="text-custom-primary font-bold text-center text-sm">
          - {blog.category} -
        </h6>
        <h4 className="text-center px-4 font-Cinzel font-normal">
          {blog.title}
        </h4>
        <p className="mt-2 first-letter:text-custom-primary first-letter:text-3xl first-letter:font-Cinzel">
          {blog.short_discription}...
        </p>
        <div className="mt-4 flex items-center justify-center gap-1">
          <p className="text-custom-primary">{blog.author}</p>
          <p className="text-gray-500">/ {blog.published}</p>
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <ReadThisBlogButton
            _id={blog._id} 
            buttonClass={"p-1.5"}
            iconClass={"text-lg"}
          />
          <AddToWishlistButton
            _id={blog._id} image={blog.image} title={blog.title} category={blog.category}
            buttonClass={"p-1.5"}
            iconClass={"text-lg"}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentBlogCard;
