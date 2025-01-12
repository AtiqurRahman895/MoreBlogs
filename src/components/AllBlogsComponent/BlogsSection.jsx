import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../AuthenticationComponent/Loading";
import TopScrollBar from "./TopScrollBar";
import RecentBlogCard from "../HomeComponent/RecentBlogCard";
import { TransferLists } from "../../Contexts/TransferLists";

const BlogsSection = () => {
  const { searchQuery, setSearchQuery } = useContext(TransferLists);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // console.log(typeof searchQuery)
    const params = {
      query:
        searchQuery == "All"
          ? { category: null }
          : { $text: { $search: searchQuery } },
    };
    setLoading(true);

    axios
      .get("http://localhost:8080/blogs", { params })
      .then((res) => {
        if (res.data.length === 0) {
          setNotFound(true);
        } else {
          setBlogs(res.data);
          setNotFound(false);
        }
      })
      .catch((error) => {
        console.error("Error finding blogs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery]);

  return (
    <section className="mb-10">
      <div className="container space-y-10">
        <TopScrollBar blogCount={blogs.length} />

        <div className="">
          {loading ? (
            <Loading />
          ) : (
            <>
              {notFound ? (
                <div className="m-20 grid justify-items-center gap-3">
                  <img
                    src={"./notFound.svg"}
                    alt={`not available`}
                    className="w-[200px]"
                  />
                  <h3 className="font-extrabold text-center text-custom-primary">
                    {searchQuery !== "All"
                      ? "Unable to load Blogs"
                      : "No blogs available in this category!"}
                  </h3>
                </div>
              ) : (
                // columns-[290px] md:columns-[350px] space-y-6
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog, index) => (
                    <RecentBlogCard key={index} blog={blog} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
