import Slider from "react-slick";
import TopBlogCard from "./TopBlogCard";
import useScreenWidth from "../../Hooks/useScreenWidth";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../AuthenticationComponent/Loading";

const TopBlogs = () => {
  const screenWidth = useScreenWidth();
  const [slideToShow, setSlideToShow] = useState(1);

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [topBlogs, setTopBlogs] = useState([]);

  // const TopBlogsList = [
  //   {
  //     category: "Creative",
  //     title: "Life Is Adventure",
  //     image: "https://i.ibb.co.com/09q7twb/transmission.jpg",
  //     _id: 1,
  //   },
  //   {
  //     category: "Fashion",
  //     title: "Bicycle & Road",
  //     image: "https://i.ibb.co.com/NTWc3k6/breaking.jpg",
  //     _id: 2,
  //   },
  //   {
  //     category: "Lifestyle",
  //     title: "Choose Trendy Clothes",
  //     image: "https://i.ibb.co.com/MVczhgC/engine.jpg",
  //     _id: 3,
  //   },
  //   {
  //     category: "Nature",
  //     title: "Find Your Place",
  //     image: "https://i.ibb.co.com/JmqfLC5/tyre.jpg",
  //     _id: 4,
  //   },
  //   {
  //     category: "Travel",
  //     title: "Start Day Positive",
  //     image: "https://i.ibb.co.com/PgcSh2q/painting.jpg",
  //     _id: 5,
  //   },
  //   {
  //     category: "Personal Finance",
  //     title: "Quote Which Make You Think",
  //     image: "https://i.ibb.co.com/zPbgzzT/ac.jpg",
  //     _id: 6,
  //   },
  // ];

  useEffect(() => {
    if (screenWidth >= 1280) {
      setSlideToShow(3);
    } else if (screenWidth >= 768) {
      setSlideToShow(2);
    } else {
      setSlideToShow(1);
    }
  }, [screenWidth]);

  useEffect(() => {
    const params = { limit: 6, sort: { word_count: -1 } };
    setLoading(true);
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
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    // speed: 500,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  return (
    <section className="pt-4 pb-20">
      <div className="container space-y-4">
        <div className="text-center text-custom-primary">
          <h5 className="font-bold">Top Blogs</h5>
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
                  Unable to find top blogs!
                </h3>
              </div>
            ) : (
              <div className="sm:px-[10%] md:px-0">
                <Slider className="slick-slider" {...settings}>
                  {topBlogs.map((blog, index) => (
                    <TopBlogCard key={index} blog={blog} />
                  ))}
                </Slider>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TopBlogs;
