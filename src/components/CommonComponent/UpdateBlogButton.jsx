import { CgPen } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const UpdateBlogButton = ({_id,buttonClass,iconClass}) => {
    // console.log(_id)
    return (
        <>
          <Link
            to={`/update_blog/${_id}`}
            className={`ReadThisBlogButton primaryButton2 activePrimaryButton2 ${buttonClass}`}
          >
            <CgPen className={`${iconClass}`} />
          </Link>
          <Tooltip
            anchorSelect=".ReadThisBlogButton"
            className="!bg-custom-primary"
          >
            Update this blog!
          </Tooltip>
        </>
    );
};

export default UpdateBlogButton;