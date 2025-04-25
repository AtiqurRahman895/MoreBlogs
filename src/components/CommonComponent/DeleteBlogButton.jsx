import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

const DeleteBlogButton = ({ _id, buttonClass, iconClass, setLoading,}) => {
    const navigate= useNavigate()
    const location= useLocation() 
    const path= location.pathname
    const handleDeleteFromWishlistButton = () => {
    const deleteGame = window.confirm(
      `Are you sure about deleting this blog?`
    );

    if (deleteGame) {
        if(!path.includes("/blog")){
            setLoading(true);
        }
      
      axios
        .delete(`https://more-blogs-server.vercel.app/deleteBlog/${_id}`)
        .then(() => {
          toast.info(
            `You have successfully deleted one blog!`
          );
        })
        .catch(() => {
          toast.error(`Unable to delete one blog now! Try again later.`);
        })
        .finally(() => {
            if(path.includes("/blog")){
                navigate(-1)
            }else{
                setLoading(false);
            }
        });
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteFromWishlistButton}
        type="Button"
        className={`DeleteBlogButton primaryButton2 activePrimaryButton2 ${buttonClass}`}
      >
        <MdOutlineDeleteOutline className={`${iconClass}`} />
      </button>
      <Tooltip
        anchorSelect=".DeleteBlogButton"
        className="!bg-custom-primary"
      >
        Delete this blog!
      </Tooltip>
    </>
  );
};

export default DeleteBlogButton;