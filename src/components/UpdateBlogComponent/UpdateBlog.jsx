import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageInputSection from "../AddBlogComponent/ImageInputSection";
import ShortDescriptionSection from "../AddBlogComponent/ShortDescriptionSection";
import LongDescriptionSection from "../AddBlogComponent/LongDescriptionSection";
import Loading from "../AuthenticationComponent/Loading";
import TitleInputSection from "../AddBlogComponent/TitleInputSection";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const blogInfo = useLoaderData();
  const { user, logoutUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  // const {_id,image,category,title,author,author_email,published,short_description,long_description,word_count}=blogInfo&&blogInfo

  const [image, setImage] = useState(blogInfo?.image);
  // const [goodImage, setGoodImage] = useState(blogInfo?.image);

  // const [category,setCategory]= useState(blogInfo?.category)
  const category = blogInfo?.category;

  const [title, setTitle] = useState(blogInfo?.title);

  const author = blogInfo?.author;
  const published = blogInfo?.published;

  const [short_description, setShort_description] = useState(
    blogInfo.short_description
  );

  const [long_description, setLong_description] = useState(
    blogInfo.long_description
  );
  const [good_long_description, setGood_long_description] = useState(
    blogInfo.long_description
  );
  const [word_count, setWord_count] = useState(blogInfo.word_count);

  useEffect(() => {
    if (user && blogInfo) {
      if (user.email !== blogInfo.author_email) {
        toast.error("You are not authorized to update this blog.");
        navigate("/");
      }
    } else {
      return;
    }
    setLoading(false);
  }, [user, blogInfo, navigate]);

  const handleSubmit = (e) => {
    const short_description_word_count = short_description
      .replace(/<[^>]*>/g, " ")
      .trim()
      .split(/\s+/).length;

    e.preventDefault();

    if (!user?.email && !user?.displayName) {
      toast.error(
        "Currently you are not Logged in. Login first to update this Blog!"
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
      _id: blogInfo._id,
      image,
      category,
      title,
      short_description,
      long_description: good_long_description,
      word_count,
      author_email: blogInfo.author_email,
    };

    axios
      .put("https://more-blogs-server.vercel.app/updateBlog", blogCredentials, {
        withCredentials: true,
      })
      .then(() => {
        e.target.reset();
        toast.success("You have successfully updated this Blog!");
        //   const categoryCredentials = { category };
        // return axios.put("https://more-blogs-server.vercel.app/updateCategory");
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 403) {
          logoutUser();
          toast.error(error.response.data.message);
          navigate("/login");
        }
        console.error("Error updating Blog:", error);
        toast.error(
          error.response?.data?.message || `Failed to update this blog?`
        );
      });
  };

  return (
    <main className="">
      <Helmet>
        <title>Upate Blog | MORE BLOGS</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="mb-6 space-y-8">
          <ImageInputSection image={image} setImage={setImage} />

          <section className="">
            <div className="container grid justify-items-center ">
              <h6 className="text-custom-primary">- {category} -</h6>

              <TitleInputSection title={title} setTitle={setTitle} />

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
      )}
    </main>
  );
};

export default UpdateBlog;
