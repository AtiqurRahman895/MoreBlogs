import Masonry from "react-responsive-masonry";
import useScreenWidth from "../../Hooks/useScreenWidth";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../AuthenticationComponent/Loading";
import RecentBlogCard from "./RecentBlogCard";

const RecentBlogsSection = () => {
  const screenWidth = useScreenWidth();
  const [columnsCount, setColumnsCount] = useState();

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    if (screenWidth >= 1024) {
      setColumnsCount(3);
    } else if (screenWidth >= 640) {
      setColumnsCount(2);
    } else {
      setColumnsCount(1);
    }
  }, [screenWidth]);

  useEffect(() => {
    const params = { limit: 6, sort: { _id: -1 } };
    setLoading(true);
    axios
      .get("http://localhost:8080/blogs", { params })
      .then((res) => {
        // console.log(res.data)
        res.data.length === 0 ? setNotFound(true) : setRecentBlogs(res.data);
      })
      .catch((error) => {
        console.error("Error finding blogs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="pb-16 text-white bg-cover bg-no-repeat bg-center">
      <div className="container space-y-12">
        <div className="text-center font-bold">
          <h3 className="text-custom-primary">Recent Blogs</h3>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            {notFound ? (
              <div className="grid justify-items-center gap-3">
                <img
                  src={"./notFound.svg"}
                  alt={`not available`}
                  className="w-[200px]"
                />
                <h3 className="font-extrabold text-center text-custom-primary">
                  Unable to find recent blogs!
                </h3>
              </div>
            ) : (
              <Masonry columnsCount={columnsCount} className="!gap-4 md:!gap-6">
                {recentBlogs.map((blog, index) => (
                  <RecentBlogCard key={index} blog={blog} />
                ))}
              </Masonry>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default RecentBlogsSection;
