import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageInputSection from "./ImageInputSection";
import ShortDiscriptionSection from "./ShortDiscriptionSection";
import LongDiscriptionSection from "./LongDiscriptionSection";
import CategoryInputSection from "./CategoryInputSection";
import TitleInputSection from "./TitleInputSection";

const AddBlog = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);

  const [image, setImage] = useState();
  const [goodImage, setGoodImage] = useState(false);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const author = user?.displayName;
  const author_email = user?.email;
  const published = new Date().toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [short_discription, setShort_discription] = useState("");

  const [long_discription, setLong_discription] = useState("");
  const [good_long_discription, setGood_long_discription] = useState(false);
  const [word_count, setWord_count] = useState(0);

  const handleSubmit = (e) => {
    const short_discription_word_count = short_discription
      .replace(/<[^>]*>/g, " ")
      .trim()
      .split(/\s+/).length;

    e.preventDefault();

    if (!user?.email && !user?.displayName) {
      toast.error(
        "Currently you are not Logged in. Login first to Publish a Blog!"
      );
      navigate("/login");
      return;
    } else if (short_discription_word_count < 10) {
      toast.warning(
        `Please lenghten Short Discription to 10 or more word! (Currently has ${short_discription_word_count} words)`
      );
      return;
    } else if (word_count < 20) {
      toast.warning(
        `Please lenghten Long Discription to 20 or more word! (Currently has ${word_count} words)`
      );
      return;
    } else if (goodImage == false) {
      toast.warning("Invalid image URL. Please provide a valid image!");
      return;
    }

    // console.log(image,category,title,author,author_email,published,short_discription,long_discription,word_count)

    const blogCredentials = {
      image,
      category,
      title,
      author,
      author_email,
      published,
      short_discription,
      long_discription: good_long_discription,
      word_count,
    };

    axios
      .post("http://localhost:8080/addBlog", blogCredentials, {
        withCredentials: true,
      })
      .then(() => {
        e.target.reset();
        toast.success("You have successfully added a Blog!");
        const categoryCredentials = { category };
        return axios.put(
          "http://localhost:8080/updateCategory",
          categoryCredentials
        );
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 403) {
          logoutUser();
          toast.error(error.response.data.message);
          navigate("/login");
        }
        console.error("Error adding Blog:", error);
        toast.error(
          error.response?.data?.message ||
            `Failed to add your Blog or update Category details for ${category}`
        );
      });
  };

  return (
    <main className="">
      <Helmet>
        <title>Add Blog | MORE BLOGS</title>
      </Helmet>
      <form onSubmit={handleSubmit} className="mb-6 space-y-8">
        <ImageInputSection
          image={image}
          setImage={setImage}
          goodImage={goodImage}
          setGoodImage={setGoodImage}
        />

        <section className="">
          <div className="container grid justify-items-center ">
            <CategoryInputSection
              category={category}
              setCategory={setCategory}
            />

            <TitleInputSection title={title} setTitle={setTitle} />
            {/* author and Date */}
            <div className="flex items-center justify-center gap-1">
              <p className="text-custom-primary">{author}</p>
              <p className="text-gray-500">/ {published}</p>
            </div>
          </div>
        </section>

        <ShortDiscriptionSection
          short_discription={short_discription}
          setShort_discription={setShort_discription}
        />

        <LongDiscriptionSection
          long_discription={long_discription}
          setLong_discription={setLong_discription}
          good_long_discription={good_long_discription}
          setGood_long_discription={setGood_long_discription}
          word_count={word_count}
          setWord_count={setWord_count}
        />

        <div className="container text-center">
          <button type="submit" className="primaryButton activePrimaryButton">
            Publish
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddBlog;
