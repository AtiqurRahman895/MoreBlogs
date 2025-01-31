import {  useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { FiFacebook, FiInstagram, FiLinkedin, FiPhone } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";

const SubscribeSection = () => {

    const[email,setEmail]=useState('')

    const linkList=[
        {
            link:"tel:+8801400447787",
            icon: <FiPhone />,
        },
        {
            link:"mailto:goodcar@gmail.com",
            icon: <MdOutlineEmail />,
        },
        {
            link:"/",
            icon: <FiLinkedin />,
        },
        {
            link:"/",
            icon: <FiFacebook />,
        },
        {
            link:"/",
            icon: <FiInstagram />,
        },
        {
            link:"/",
            icon: <FaXTwitter />,
        },
        // {
        //     link:"/",
        //     icon: <TfiGoogle />,
        // },


    ]


    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Thank you For subscribing!")
        e.target.reset()
        setEmail("")
    };

    return (
        <section className={`py-20 bg-[url(https://i.ibb.co.com/93vKSfZ/hero-background.jpg)] bg-fixed`}>
            <div className="container flex flex-col md:flex-row items-start gap-8 md:gap-4 text-white">
                <div className="">
                    <div className="xs:w-[90%] xl:w-[70%]">
                        <h3 className="">Stay Connected with Us!</h3>
                        <p className="">Join our community of readers and receive the latest updates, stories, and insights straight to your inbox.</p>
                        <div className="mt-8 flex items-center gap-3">
                            {
                                linkList.map((link,index)=>(
                                    <Link key={index} to={link.link} className="primaryButton2 activePrimaryButton2 p-2 [&>*]:text-[18px]">
                                        {link.icon}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className="p-6 xs:p-8 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm w-full md:max-w-md space-y-4">
                    <h3 className="">Subscribe now!</h3>
                    <form onSubmit={handleSubmit} className="card-body p-0 space-y-4">

                        <div className="form-control">
                            <label htmlFor="email" className="label">
                                <span className="">Email</span>
                            </label>
                            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="..." value={email} name="email" id="email" className="input input-ghost input-bordered" required />
                        </div>

                        <div className="text-center">
                           <button className="btn w-[50%] bg-custom-primary border border-custom-primary hover:bg-white text-white hover:text-custom-primary ">Subscribe</button>
                        </div>
                
                    </form>
                
                </div>

            </div>
        </section>
    );
};

export default SubscribeSection;