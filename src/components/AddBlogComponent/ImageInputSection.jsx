import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const ImageInputSection = ({image,setImage,goodImage,setGoodImage}) => {
    const handleImageChange = (e) => {
        const url = e.target.value;
        setImage(url); // Reset error

        const img = new Image();
        img.onload = () => setGoodImage(url); 
        img.onerror = () => {
            setGoodImage(false);
        };
        img.src = url; 
    };
    return (
        <header className="">
            <div className={`container relative ${goodImage?"aspect-auto":"bg-custom-primary aspect-[4/2.5] sm:aspect-[4/1.5]"}`}>
                <img src={goodImage?goodImage:""} alt="" className="bg-custom-primary max-w-full m-auto" />

                {/* Image */}
                <div className="input-box absolute grid justify-items-center content-center top-0 bottom-0 right-0 left-0">

                    <label htmlFor="image" className="input-label relative hover:[&_.absolute]:animate-none [&_.absolute]:animate-ping">
                        <MdOutlineAddPhotoAlternate className={`absolute ${goodImage?"text-custom-primary":"text-white "} ![animation-duration:1.5s] text-4xl xs:text-7xl`} />
                        <MdOutlineAddPhotoAlternate className={`${goodImage?"text-custom-primary":"text-white "} text-5xl xs:text-7xl`} />
                    </label>
                    <div className="input-field label form-control h-fit absolute focus-within:static scale-0 focus-within:scale-100">
                        <input onChange={handleImageChange} value={image} placeholder='Add Cover Image' type='url' name="image" id="image" className="input bg-white focus:!bg-white input-bordered !outline-none !border-stone-300 rounded-sm" required/>
                    </div>

                </div>

            </div>
        </header>
    );
};

export default ImageInputSection;