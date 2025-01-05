import DOMPurify from "dompurify";
import { MdRateReview } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const LongDiscriptionSection = ({long_discription,setLong_discription,good_long_discription,setGood_long_discription,word_count,setWord_count}) => {

    const temporary_long_discription="This section is where your blog truly comes to life—expand your thoughts, provide rich details, and craft a compelling narrative with at least 20 words. Please note: the editor's preview may not perfectly reflect the final appearance, especially for header font sizes. To see how the actual content will appear, check outside the editor preview for the most accurate representation."

    const customToolbar = [
        [{ header: [ 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: ['#d5ae6b', '#000000'] }],
        [{ list: "ordered" }, { list: "bullet" }],
        // [{ align: [] }], 
        // ["link"],
        ["clean"], 

      ];
    
      const modules = {
        toolbar: customToolbar,
      };
    
    
    const handleLongDiscroptionChange = (value) => {
        setLong_discription(value);

        const sanitizedHtml = DOMPurify.sanitize(value, {
            KEEP_CONTENT: true,
            ALLOWED_ATTR: ['style'],
            ADD_ATTR: ['style'],
            FORBID_ATTR: [], 
            FORBID_TAGS: ['script', 'style'],
            ALLOWED_TAGS: ['p', 'h4', 'h5', 'h6', 'b', 'br', 'strong', 'em', 'u', 's','ul', 'ol', 'li','span'],
            ALLOWED_CSS: {
                properties: ['color'],
                allowedValues: {
                    color: ['#000000', '#d5ae6b'],
                },
            },
            FORBID_CSS: {
                properties: ['position', 'z-index', 'display', 'visibility'],
            },
        });
        
        // setGood_long_discription(plainText)
        // const words = plainText.replace(/<[^>]*>/g, " ").trim().split(/\s+/);
        // setWord_count(words.length);

        // Remove extra spaces (leading/trailing) from sanitized HTML
        const cleanedHtml = sanitizedHtml.trim();
    
        // Set the cleaned HTML to long description state
        setGood_long_discription(cleanedHtml);
            
        // Extract plain text using textContent
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cleanedHtml;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
            
        // Split by spaces and filter empty strings
        const words = plainText.trim().split(/\s+/).filter(Boolean);
        setWord_count(words.length);
    };
    return (
        <section className="pb-10">
            <div className="container">

                {/* Long Discription */}
                <div className="input-box flex relative">

                    <div className="input-field w-full absolute focus-within:static scale-0 focus-within:scale-100">
                        <ReactQuill
                            onChange={handleLongDiscroptionChange}
                            value={long_discription}
                            placeholder='Long Discription'
                            id="long_discription" 
                            name="long_discription"
                            modules={modules}
                            className='h-60'
                            theme="snow"
                        />
                        <input type="checkbox" name="show_long_discription" id="show_long_discription" className='opacity-0' />

                    </div>

                    <label htmlFor="show_long_discription" className=" input-label py-0 [&_svg]:hover:animate-none [&_svg]:animate-pulse">
                        <div className=''>
                            <MdRateReview className='text-custom-primary text-xl ![animation-duration:1.5s] inline mr-2' />
                            {good_long_discription && word_count>1?
                                <>
                                    <p className="inline">Long Discription: {word_count} words</p>
                                    <div className='!whitespace-pre-wrap itsLongDispriction' dangerouslySetInnerHTML={{__html:good_long_discription}}></div>
                                </>
                                :
                                <p className='inline'>Long Discription: {temporary_long_discription}</p>
                            } 
                        </div>
                    </label>

                </div>
            </div>
        </section>
    );
};

export default LongDiscriptionSection;