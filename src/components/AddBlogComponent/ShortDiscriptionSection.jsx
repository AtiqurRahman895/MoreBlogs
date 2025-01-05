import { MdRateReview } from "react-icons/md";

const ShortDiscriptionSection = ({short_discription,setShort_discription}) => {
    
    const temporary_short_discription="This section is dedicated to crafting a concise and engaging summary of your blog. Use at least 10 words to capture the essence of your blog's message. A well-written short description will spark curiosity and encourage readers to explore further."
    
    return (
        <section className="">
            <div className="container">

                {/* Short Discription */}
                <div className="input-box flex relative">

                    <div className="input-field form-control w-full absolute focus-within:static scale-0 focus-within:scale-100">
                        <textarea 
                            onChange={(e)=>setShort_discription(e.target.value)} 
                            value={short_discription} 
                            placeholder='Short Discription' 
                            name="short_discription" 
                            id="short_discription" 
                            className="textarea textarea-ghost textarea-bordered !outline-none !border-stone-300 rounded-sm h-32" 
                        />
                    </div>
                    <label htmlFor="short_discription" className="input-label py-0 [&_svg]:hover:animate-none [&_svg]:animate-pulse">
                        <b className=''>
                            <MdRateReview className='text-custom-primary text-xl ![animation-duration:1.5s] inline mr-2' />
                            Short Discription: {short_discription?short_discription:temporary_short_discription}
                        </b>

                    </label>

                </div>
            </div>
        </section>
    );
};

export default ShortDiscriptionSection;