import { Helmet } from "react-helmet-async";
import HomeHeroSection from "../HomeComponent/HomeHeroSection";
import BlogsSection from "./BlogsSection";

const AllBlogs = () => {
    const headerTitle="MoreBlogs"
    const headerSubtext="Creative, Fashion, Lifestyle, Nature & Travel"
    return (
        <main className='space-y-10'>
            <Helmet>
                <title>All Blogs | MORE BLOGS</title>
            </Helmet>
            <HomeHeroSection headerTitle={headerTitle} headerSubtext={headerSubtext} />
            <BlogsSection />

        </main>
    );
};

export default AllBlogs;