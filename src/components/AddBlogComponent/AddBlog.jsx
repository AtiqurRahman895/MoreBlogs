import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageInputSection from "./ImageInputSection";
import ShortDescriptionSection from "./ShortDescriptionSection";
import LongDescriptionSection from "./LongDescriptionSection";
import CategoryInputSection from "./CategoryInputSection";
import TitleInputSection from "./TitleInputSection";

const AddBlog = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);

  const [image, setImage] = useState();
  // const [goodImage, setGoodImage] = useState(false);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const author = user?.displayName;
  const author_email = user?.email;
  const published = new Date().toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [short_description, setShort_description] = useState("");

  const [long_description, setLong_description] = useState("");
  const [good_long_description, setGood_long_description] = useState(false);
  const [word_count, setWord_count] = useState(0);

  const handleSubmit = (e) => {
    const short_description_word_count = short_description
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
    } else if (short_description_word_count < 10) {
      toast.warning(
        `Please lenghten Short Description to 10 or more word! (Currently has ${short_description_word_count} words)`
      );
      return;
    } else if (word_count < 20) {
      toast.warning(
        `Please lenghten Long Description to 20 or more word! (Currently has ${word_count} words)`
      );
      return;
    } else if (!image) {
      toast.warning(
        "You must upload a image. Only JPG, PNG, GIF image files are allowed, and the maximum file size is 10MB. Please select an appropriate image file to proceed!"
      );
      return;
    }

    // console.log(image,category,title,author,author_email,published,short_description,long_description,word_count)

    const blogCredentials = {
      image,
      category,
      title,
      author,
      author_email,
      published,
      short_description,
      long_description: good_long_description,
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
        <ImageInputSection image={image} setImage={setImage} />

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

        <ShortDescriptionSection
          short_description={short_description}
          setShort_description={setShort_description}
        />

        <LongDescriptionSection
          long_description={long_description}
          setLong_description={setLong_description}
          good_long_description={good_long_description}
          setGood_long_description={setGood_long_description}
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
