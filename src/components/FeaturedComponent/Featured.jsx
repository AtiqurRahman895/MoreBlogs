import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../AuthenticationComponent/Loading";
import HomeHeroSection from "../HomeComponent/HomeHeroSection";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CgReadme } from "react-icons/cg";
import AddToWishlistButton from "../CommonComponent/AddToWishlistButton";
import ReadThisBlogButton from "../CommonComponent/ReadThisBlogButton";
import { Tooltip } from "react-tooltip";

const Featured = () => {
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [topBlogs, setTopBlogs] = useState([]);

  const [sort, setSort] = useState(false);

  const headerTitle = "Featured";
  const headerSubtext = "Top 10 Blogs Handpicked for You";

  useEffect(() => {
    const params = { limit: 10, sort: { word_count: sort ? 1 : -1 } };

    axios
      .get("https://more-blogs-server.vercel.app/blogs", { params })
      .then((res) => {
        // console.log(res.data)
        res.data.length === 0 ? setNotFound(true) : setTopBlogs(res.data);
      })
      .catch((error) => {
        console.error("Error finding blogs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sort, loading]);

  const handleSortBywords = () => {
    setSort(!sort);
    setLoading(true);
  };

  return (
    <main className="space-y-10">
      <Helmet>
        <title>Featured | MORE BLOGS</title>
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
            <div className=" grid justify-items-center gap-3 pb-10">
              <img
                src={"./notFound.svg"}
                alt={`not available`}
                className="w-[200px]"
              />
              <h3 className="font-extrabold text-center text-custom-primary">
                Unable to load blogs!
              </h3>
            </div>
          ) : (
            <section className="pb-10">
              <div className="container space-y-6">
                {/* <h5 className="text-custom-primary">Total blogs:{blogs.length}</h5> */}
                <div className="max-h-[65svh] overflow-x-auto">
                  <table className="MyReviewTable min-w-[1200px] table table-sm table-pin-rows table-pin-cols">
                    <thead>
                      <tr>
                        <th className="text-center">Rank</th>
                        <td>Blog Title</td>
                        <td
                          className="cursor-pointer"
                          onClick={handleSortBywords}
                        >
                          Total Words
                        </td>

                        <td>Short Description</td>
                        <td>Category</td>
                        <td className="sm:hidden text-center">Actions</td>
                        <th className="hidden sm:table-cell text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-custom-half-primary">
                      {topBlogs.map((blog, index) => (
                        <tr key={index + 1}>
                          <th className="text-center">{index + 1}</th>
                          <td className="max-w-72 line-clamp-3">
                            {blog.title}
                          </td>
                          <td>{blog.word_count}</td>
                          <td className="line-clamp-3 max-w-[900px]">
                            {blog.short_description}
                          </td>
                          <td>{blog.category}</td>
                          <td className="sm:hidden">
                            <div className="flex gap-4 w-full items-center justify-center">
                              <ReadThisBlogButton
                                _id={blog._id}
                                buttonClass={"p-1.5 !rounded-full "}
                                iconClass={"text-lg"}
                              />
                            </div>
                          </td>
                          <th className="hidden sm:table-cell">
                            <div className="flex gap-4 w-full items-center justify-center">
                              <ReadThisBlogButton
                                _id={blog._id}
                                buttonClass={"p-1.5 !rounded-full "}
                                iconClass={"text-lg"}
                              />
                            </div>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th className="text-center">
                          {loading ? (
                            <span className="loading loading-spinner loading-xs text-custom-primary"></span>
                          ) : (
                            "Rank"
                          )}
                        </th>
                        <td>
                          {loading ? (
                            <span className="loading loading-spinner loading-xs text-custom-primary"></span>
                          ) : (
                            "Blog Title"
                          )}
                        </td>
                        <td
                          className="sortButton cursor-pointer"
                          onClick={handleSortBywords}
                        >
                          {loading ? (
                            <span className="loading loading-spinner loading-xs text-custom-primary"></span>
                          ) : (
                            "Total Words"
                          )}
                        </td>
                        <td>
                          {loading ? (
                            <span className="loading loading-spinner loading-xs text-custom-primary"></span>
                          ) : (
                            "Short Description"
                          )}
                        </td>
                        <td>
                          {loading ? (
                            <span className="loading loading-spinner loading-xs text-custom-primary"></span>
                          ) : (
                            "Category"
                          )}
                        </td>
                        <td className="sm:hidden text-center">
                          {loading ? (
                            <span className="loading loading-spinner loading-xs text-custom-primary"></span>
                          ) : (
                            "Actions"
                          )}
                        </td>
                        <th className="hidden sm:table-cell text-center">
                          {loading ? (
                            <span className="loading loading-spinner loading-xs text-custom-primary"></span>
                          ) : (
                            "Actions"
                          )}
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default Featured;
