import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import Loading from "../AuthenticationComponent/Loading";
import { TransferLists } from "../../Contexts/TransferLists";
import { useNavigate } from "react-router-dom";

const AllCategoriesSection = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(TransferLists);

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [categories, setCategories] = useState([]);

  // const categoryList=[
  //     {
  //         category:"Creative",
  //         totalBlogs:"64",
  //         rank:"01"
  //     },
  //     {
  //         category:"Lifestyle",
  //         totalBlogs:"50",
  //         rank:"02"
  //     },
  //     {
  //         category:"Travel",
  //         totalBlogs:"42",
  //         rank:"03"
  //     },
  //     {
  //         category:"Fashion",
  //         totalBlogs:"35",
  //         rank:"04"
  //     },
  //     {
  //         category:"Nature",
  //         totalBlogs:"20",
  //         rank:"05"
  //     },
  //     {
  //         category:"Personal Finance",
  //         totalBlogs:"15",
  //         rank:"06"
  //     },
  // ]

  useEffect(() => {
    const params = { sort: { totalBlogs: -1 } };
    setLoading(true);
    axios
      .get("https://more-blogs-server.vercel.app/categories", { params })
      .then((res) => {
        res.data.length === 0 ? setNotFound(true) : setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error finding categories:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCategoryButton = (category) => {
    setSearchQuery(category);
    navigate("/all_blogs");
  };

  return (
    <section className="pb-16 mb-6 bg-white">
      <div className="container space-y-12">
        <div className="text-center font-bold">
          <h3 className="text-custom-primary">All Categories</h3>
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
                  Unable to Load Categories!
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                  <div
                    onClick={() => handleCategoryButton(category.category)}
                    key={index}
                    className="relative overflow-hidden bg-custom-primary
                                        [&>*]:text-white px-6 py-10 space-y-2 rounded-md duration-500 hover:scale-[1.02]"
                  >
                    <ReactSVG
                      src={`./categorySvg/${category.category}.svg`}
                      className="w-20 lg:w-28"
                    />
                    <div className="flex gap-1 flex-wrap items-baseline">
                      <h4 className="">{category.category}</h4>
                      <p>({category.totalBlogs})</p>
                    </div>
                    <h1 className="mb-0 pb-0 absolute right-0 bottom-0 opacity-20 text-5xl">
                      0{index + 1}
                    </h1>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllCategoriesSection;
