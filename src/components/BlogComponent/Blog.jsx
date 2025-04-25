import { useLoaderData } from "react-router-dom";
import BlogCommentSection from "./BlogCommentSection";
import { Helmet } from "react-helmet-async";
import AddToWishlistButton from "../CommonComponent/AddToWishlistButton";
import UpdateBlogButton from "../CommonComponent/UpdateBlogButton";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../AuthenticationComponent/Loading";
import DeleteBlogButton from "../CommonComponent/DeleteBlogButton";

const Blog = () => {
  const blogInfo = useLoaderData();
  const { user } = useContext(AuthContext);
  const {
    _id,
    image,
    category,
    title,
    author,
    author_email,
    published,
    short_description,
    long_description,
  } = blogInfo && blogInfo;

  return (
    <main className="mb-6 space-y-8">
      <Helmet>
        <title>{title} | MORE BLOGS</title>
      </Helmet>
      {!blogInfo ? (
        <Loading />
      ) : (
        <>
          <section className="">
            <div className={`container relative aspect-auto`}>
              <img
                src={image}
                alt=""
                className="bg-custom-primary max-w-full m-auto"
              />
            </div>
          </section>

          <section className="">
            <div className="container grid justify-items-center ">
              <h6 className="text-custom-primary">- {category} -</h6>
              <h3 className="font-Cinzel font-normal sectionHeaderWidth text-center">
                {title}
              </h3>
              <div className="flex items-center justify-center gap-1">
                <p className="text-custom-primary">{author}</p>
                <p className="text-gray-500">/ {published}</p>
              </div>
              <div className="mt-4 flex items-center justify-center gap-3">
                {user?.email === author_email && (
                  <>
                    <UpdateBlogButton
                      _id={_id}
                      buttonClass={"p-1.5"}
                      iconClass={"text-lg"}
                    />

                    <DeleteBlogButton
                      _id={_id}
                      buttonClass={"p-1.5"}
                      iconClass={"text-lg"}
                    />
                  </>
                )}
                <AddToWishlistButton
                  _id={_id}
                  image={image}
                  title={title}
                  category={category}
                  buttonClass={"p-1.5"}
                  iconClass={"text-lg"}
                />
              </div>
            </div>
          </section>

          <section className="">
            <div className="container">
              <p className="mt-2 font-bold first-letter:text-custom-primary first-letter:text-3xl first-letter:font-Cinzel">
                {short_description}
              </p>
            </div>
          </section>

          <section className="">
            <div
              className="!whitespace-pre-wrap container itsLongDispriction"
              dangerouslySetInnerHTML={{ __html: long_description }}
            ></div>
          </section>

          <BlogCommentSection
            blog_id={_id}
            author_email={author_email}
            user={user}
          />
        </>
      )}
    </main>
  );
};

export default Blog;
