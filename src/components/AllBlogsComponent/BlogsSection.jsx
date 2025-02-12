import Loading from "../AuthenticationComponent/Loading";
import TopScrollBar from "./TopScrollBar";
import RecentBlogCard from "../HomeComponent/RecentBlogCard";
import UseUrlQuery from "../../Hooks/UseUrlQuery";
import UseGetBlogs from "../../Hooks/UseGetBlogs";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import NextPreButtons from "../CommonComponent/NextPreButtons"

const BlogsSection = () => {
  const limit = 6
  const { searchQuery } = UseUrlQuery();
  const {blogs,loading,notFound}= UseGetBlogs(limit)
  const [blogCount, setBlogCount] = useState(0);

  const memorizedSearchQuery=useMemo(()=> searchQuery,[searchQuery])

  const fetchBlogCount = async () => {
    const params = {
      query:
        memorizedSearchQuery == "All"
          ? {}
          : { $text: { $search: memorizedSearchQuery } },
    };
    await axios.get("https://more-blogs-server.vercel.app/blog-count", { params })
    .then((res) => {
      setBlogCount(res.data)
    })
    .catch((error) => {
      console.error("Error counting blogs:", error);
    })
    
  };
  
  useEffect(() => {
    fetchBlogCount()
  }, [memorizedSearchQuery]);

  

  return (
    <section className="py-20">
      <div className="container space-y-10">
        <TopScrollBar blogCount={blogCount} />

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog, index) => (
                    <RecentBlogCard key={index} blog={blog} />
                  ))}
                </div>
              )}

              <NextPreButtons limit={limit} totalContents={blogCount} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
