import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

const DeleteFromWishlistButton = ({
  _id,
  buttonClass,
  iconClass,
  setLoading,
}) => {
  // console.log(_id,buttonClass,iconClass,setLoading)
  const handleDeleteFromWishlistButton = () => {
    const deleteGame = window.confirm(
      `Are you sure about deleting this blog from your wishlist?`
    );

    if (deleteGame) {
      setLoading(true);
      axios
        .delete(`https://more-blogs-server.vercel.app/deleteWishlist/${_id}`)
        .then(() => {
          toast.info(
            `You have successfully deleted one blog from your wishlist`
          );
        })
        .catch(() => {
          toast.error(`Failed to delete one blog from your wishlist`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteFromWishlistButton}
        type="Button"
        className={`DeleteFromWishlistButton primaryButton2 activePrimaryButton2 ${buttonClass}`}
      >
        <MdOutlineDeleteOutline className={`${iconClass}`} />
      </button>
      <Tooltip
        anchorSelect=".DeleteFromWishlistButton"
        className="!bg-custom-primary"
      >
        Delete this blog from wishlist!
      </Tooltip>
    </>
  );
};

export default DeleteFromWishlistButton;
