import { Helmet } from 'react-helmet-async';
import HomeHeroSection from './HomeHeroSection';
import TopBlogs from './TopBlogs';
import RecentBlogsSection from './RecentBlogsSection';
import AllCategoriesSection from './AllCategoriesSection';
import SubscribeSection from './SubscribeSection';

const Home = () => {
    const headerTitle="MoreBlogs"
    const headerSubtext="Creative, Fashion, Lifestyle, Nature & Travel"
    return (
        <main className=''>
            <Helmet>
                <title>Home | MORE BLOGS</title>
            </Helmet>
            <HomeHeroSection headerTitle={headerTitle} headerSubtext={headerSubtext}/>
            <TopBlogs/>
            <RecentBlogsSection/>
            <AllCategoriesSection/>
            <SubscribeSection/> 
        </main>
    );
};

export default Home;