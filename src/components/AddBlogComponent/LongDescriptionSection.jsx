import DOMPurify from "dompurify";
import { MdRateReview } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const LongDescriptionSection = ({
  long_description,
  setLong_description,
  good_long_description,
  setGood_long_description,
  word_count,
  setWord_count,
}) => {
  const temporary_long_description =
    "This section is where your blog truly comes to life—expand your thoughts, provide rich details, and craft a compelling narrative with at least 20 words. Please note: the editor's preview may not perfectly reflect the final appearance, especially for header font sizes. To see how the actual content will appear, check outside the editor preview for the most accurate representation.";

  const customToolbar = [
    [{ header: [4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: ["#d5ae6b", "#000000"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    // [{ align: [] }],
    // ["link"],
    ["clean"],
  ];

  const modules = {
    toolbar: customToolbar,
  };

  const handleLongDiscroptionChange = (value) => {
    setLong_description(value);

    const sanitizedHtml = DOMPurify.sanitize(value, {
      KEEP_CONTENT: true,
      ALLOWED_ATTR: ["style"],
      ADD_ATTR: ["style"],
      FORBID_ATTR: [],
      FORBID_TAGS: ["script", "style"],
      ALLOWED_TAGS: [
        "p",
        "h4",
        "h5",
        "h6",
        "b",
        "br",
        "strong",
        "em",
        "u",
        "s",
        "ul",
        "ol",
        "li",
        "span",
      ],
      ALLOWED_CSS: {
        properties: ["color"],
        allowedValues: {
          color: ["#000000", "#d5ae6b"],
        },
      },
      FORBID_CSS: {
        properties: ["position", "z-index", "display", "visibility"],
      },
    });

    // Remove extra spaces (leading/trailing) from sanitized HTML
    const cleanedHtml = sanitizedHtml.trim();

    // Set the cleaned HTML to long description state
    setGood_long_description(cleanedHtml);

    // Extract plain text and count words
    const plainText = cleanedHtml.replace(/<[^>]+>/g, " "); // Replace HTML tags with spaces
    const words = plainText.trim().split(/\s+/).filter(Boolean);
    setWord_count(words.length);
  };
  return (
    <section className="pb-10">
      <div className="container">
        {/* Long Description */}
        <div className="input-box flex relative">
          <div className="input-field w-full absolute focus-within:static scale-0 focus-within:scale-100">
            <ReactQuill
              onChange={handleLongDiscroptionChange}
              value={long_description}
              placeholder="Long Description"
              id="long_description"
              name="long_description"
              modules={modules}
              className="h-60"
              theme="snow"
            />
            <input
              type="checkbox"
              name="show_long_description"
              id="show_long_description"
              className="opacity-0"
            />
          </div>

          <label
            htmlFor="show_long_description"
            className=" input-label py-0 [&_svg]:hover:animate-none [&_svg]:animate-pulse"
          >
            <div className="">
              <MdRateReview className="text-custom-primary text-xl ![animation-duration:1.5s] inline mr-2" />
              {good_long_description && word_count > 1 ? (
                <>
                  <p className="inline">Long Description: {word_count} words</p>
                  <div
                    className="!whitespace-pre-wrap itsLongDispriction"
                    dangerouslySetInnerHTML={{ __html: good_long_description }}
                  ></div>
                </>
              ) : (
                <p className="inline">
                  Long Description: {temporary_long_description}
                </p>
              )}
            </div>
          </label>
        </div>
      </div>
    </section>
  );
};

export default LongDescriptionSection;
