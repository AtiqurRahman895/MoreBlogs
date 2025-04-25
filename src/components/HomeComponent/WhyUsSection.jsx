import { AiFillMessage } from "react-icons/ai";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoIosCompass } from "react-icons/io";
import { RiRefreshFill } from "react-icons/ri";
import { ReactSVG } from "react-svg";

const WhyUsSection = () => {
    const reasonList=[
        {
            icon:<BsGlobeCentralSouthAsia className="text-custom-primary text-[80px] lg:text-[112px] m-auto"/>,
            reasonName:"Diverse Topics",
            reasonText:"Covers fashion, lifestyle, travel, and more with engaging content."
        },
        {
            icon:<AiFillMessage className="text-custom-primary text-[80px] lg:text-[112px] m-auto"/>,
            reasonName:"Community-Driven",
            reasonText:"Readers can interact, comment, and share their thoughts easily.."
        },
        {
            icon:<IoIosCompass className="text-custom-primary text-[80px] lg:text-[112px] m-auto"/>,
            reasonName:"Easy Navigation",
            reasonText:"Well-organized categories make browsing simple and seamless."
        },
        {
            icon:<RiRefreshFill className="text-custom-primary text-[80px] lg:text-[112px] m-auto"/>,
            reasonName:"Regular Updates",
            reasonText:"Fresh and high-quality content is added frequently for readers."
        }
    ]
  return (
    <section className="pb-20">
        <div className="container space-y-12">
            <div className="text-center font-bold">
            <h3 className="text-custom-primary">Why Choose Us?</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-x-6 gap-y-10">
                    {reasonList.map((reason, index) => (
                    <div
                        key={index}
                        className="space-y-4 duration-500"
                    >
                        {
                            reason.icon
                        }
                        <div className="text-center space-y-2">
                            <h4 className="">{reason.reasonName}</h4>
                            <p>{reason.reasonText}</p>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    </section>
  );
};

export default WhyUsSection;
