import { MdRateReview } from "react-icons/md";

const CategoryInputSection = ({category,setCategory}) => {
    const categoryList = [
        "Creative",
        "Lifestyle",
        "Travel",
        "Fashion",
        "Nature",
        "Personal Finance",
    ];
    return (
                <div className="input-box flex relative">

                    <div className="input-field form-control min-w-[250px] absolute focus-within:static scale-0 focus-within:scale-100">
                        <select
                            name="category"
                            onChange={(e)=>setCategory(e.target.value)}
                            value={category}
                            id="category"
                            className="select my-2 select-ghost select-bordered !outline-none !border-gray-300 rounded-sm"
                            required
                        >
                            <option value={""} disabled hidden>
                            Pick one
                            </option>
                            {categoryList.map((categoryName, index) => (
                            <option key={index} value={categoryName}>
                                {categoryName}
                            </option>
                            ))}
                        </select>
                    </div>
                    <label htmlFor="category" className="text-custom-primary input-label label py-0 gap-2 items-center [&_svg]:hover:animate-none [&_svg]:animate-pulse">
                        <h6>
                            {category?`- ${category} -`:"Category?"}
                            <MdRateReview className='text-xl ![animation-duration:1.5s] inline ml-2' />
                        </h6>
                    </label>

                </div>
    );
};

export default CategoryInputSection;