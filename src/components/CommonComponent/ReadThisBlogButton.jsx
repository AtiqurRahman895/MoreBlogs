import { CgReadme } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const ReadThisBlogButton = ({ _id, buttonClass, iconClass }) => {
  return (
    <>
      <Link
        to={`/blog/${_id}`}
        className={`ReadThisBlogButton primaryButton2 activePrimaryButton2 ${buttonClass}`}
      >
        <CgReadme className={`${iconClass}`} />
      </Link>
      <Tooltip
        anchorSelect=".ReadThisBlogButton"
        className="!bg-custom-primary"
      >
        Read this blog!
      </Tooltip>
    </>
  );
};

export default ReadThisBlogButton;
