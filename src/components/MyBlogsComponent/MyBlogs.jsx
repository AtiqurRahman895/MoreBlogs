import { Helmet } from "react-helmet-async";
import HomeHeroSection from "../HomeComponent/HomeHeroSection";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../AuthenticationComponent/Loading";
import TopBlogCard from "../HomeComponent/TopBlogCard";
import { AuthContext } from "../../Provider/AuthProvider";

const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const headerTitle = "Your Blogs";
  const headerSubtext = "All the blogs you added in one place";


  useEffect(() => {
    const params = { query: {author_email: user.email}, sort: { _id: -1 } };
    axios
      .get("https://more-blogs-server.vercel.app/myBlogs", {
        params,
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.length === 0) {
          setNotFound(true);
        } else {
          setBlogs(res.data);
          setNotFound(false);
        }
      })
      .catch((error) => {
        console.error("Error finding Your blogs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, user.email]);

  return (
    <main>
      <Helmet>
        <title>My Blogs | MORE BLOGS</title>
      </Helmet>
      <HomeHeroSection
        headerTitle={headerTitle}
        headerSubtext={headerSubtext}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          {notFound ? (
            <div className=" grid justify-items-center gap-3 py-10">
              <img
                src={"./notFound.svg"}
                alt={`not available`}
                className="w-[200px]"
              />
              <h3 className="font-extrabold text-center text-custom-primary">
                You have not added any blogs yet!
              </h3>
            </div>
          ) : (
            <section className="py-20">
              <div className="container space-y-6">
                <h5 className="text-custom-primary">
                  Total blogs:{blogs.length}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {blogs.map((blog, index) => (
                    <TopBlogCard
                      key={index}
                      blog={blog}
                      setLoading={setLoading}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default MyBlogs;


