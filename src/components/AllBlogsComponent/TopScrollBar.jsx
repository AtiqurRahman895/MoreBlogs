import { useEffect, useState } from "react";
import { TbAdjustmentsFilled } from "react-icons/tb";
import UseUrlQuery from "../../Hooks/UseUrlQuery";
import { useNavigate } from "react-router-dom";
import { FaSortNumericUpAlt } from "react-icons/fa";

const TopScrollBar = ({ blogCount }) => {
  const {sort,searchQuery} = UseUrlQuery();
  const navigate =useNavigate()
  const [categoryList, setCategoryList] = useState([]);
  const [sortButtonText, setSortButtonText] = useState("Newest");

  useEffect(()=>{

      const allCategoryList=["All","Creative", "Lifestyle", "Travel", "Fashion", "Nature", "Personal Finance",]

      const remainingCategories=allCategoryList.filter(categoryName=>categoryName !== searchQuery)
      setCategoryList(remainingCategories)

  },[searchQuery])

  const handleSearchInput=(e)=>{
    e.preventDefault();
    navigate(`?sort=${sort}&searchQuery=${e.target.searchInput.value}&page=1`);
    e.target.reset();
  }

  const handleSortButton=()=>{
    if(sort===-1){
      navigate(`?sort=${1}&searchQuery=${searchQuery}&page=1`);
      setSortButtonText("Oldest")
    }else{
      navigate(`?sort=${-1}&searchQuery=${searchQuery}&page=1`);
      setSortButtonText("Newest")
    }
  }

  return (
    <div className="allBlogsTopScrollBar space-y-6">

      <form onSubmit={handleSearchInput} className="flex justify-center">
        {/* <div className="form-control max-w-md min-w-[280px]">
          <input type="search" name='searchInput' id='searchInput' placeholder="Search..." 
           className="input input-ghost !text-custom-primary rounded-sm outline-none focus:outline-none border-custom-primary 
           focus:border-custom-primary input-bordered" required />
        </div> */}

        <label className="input input-ghost !text-custom-primary rounded-none outline-none focus:!outline-none border-custom-primary 
           focus:border-custom-primary input-bordered flex items-center gap-2">
          <input type="search" name='searchInput' id='searchInput' placeholder="Search..."/>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>

      </form>



      <div className="flex justify-center">
        <div className="flex gap-2 items-center overflow-x-scroll overflow-y-scroll hide-scrollbar rounded-sm ">
            <button
                onClick={handleSortButton}
                type="button"
                className="flex items-center gap-1 primaryButton !bg-transparent hover:!bg-custom-primary !text-custom-primary hover:!text-white"
            >
                <FaSortNumericUpAlt className=""/>Sort: {sortButtonText}
            </button>

            <button
                type="button"
                className="flex items-center gap-1 primaryButton"
            >
                <TbAdjustmentsFilled className="text-[18px]"/>Filter: {searchQuery}
            </button>
            <div className="flex gap-2">

                {categoryList.map((categoryName, index) => (
                <button
                    key={index}
                    onClick={() => navigate(`?sort=${sort}&searchQuery=${categoryName}&page=1`)}
                    className={`bg-gray-200 !text-black hover:bg-gray-200 hover:scale-105 text-sm cursor-pointer px-4 py-[.56rem] duration-500 rounded-sm border-none text-inherit flex-shrink-0`}
                >
                    {categoryName}
                </button>
                ))}

            </div>
        </div>
      </div>

      <h6 className="text-custom-primary">{searchQuery === "All" ? `All Blogs(${blogCount})` : `Result for ${searchQuery}(${blogCount})`}</h6>



    </div>
  );
};

export default TopScrollBar;
