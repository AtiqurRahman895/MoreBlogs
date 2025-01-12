import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from 'react-icons/fa';

const HomeHeroSection = ({headerTitle,headerSubtext}) => {

    return (
        <section className='bg-black'>
            <div className="w-full flex justify-center bg-[url(https://i.ibb.co.com/zb5FnGB/hero-background.jpg)] bg-cover bg-no-repeat bg-bottom py-28">
                <div className="p-6 bg-[rgba(0,0,0,0.5)]">
                    <div className="text-center text-white p-5 border-2 border-white">
                        <h1 className='uppercase font-Sancreek  tracking-widest leading-none'>{headerTitle}</h1>
                        <b className='text-[clamp(0.5625rem,0.4017857142857143rem+0.8035714285714285vw,1.125rem)] 
                         font-Cinzel uppercase flex items-center justify-center gap-1'>
                            <FaStar/> {headerSubtext} <FaStar/>
                        </b>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHeroSection;