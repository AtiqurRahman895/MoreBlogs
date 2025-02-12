import axios from 'axios';
import UseUrlQuery from './UseUrlQuery';
import { useEffect, useMemo, useState } from 'react';

const UseGetBlogs = (limit) => {
    const { sort,searchQuery,pageNo=1 } = UseUrlQuery();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
  
    const memorizedSort = useMemo(() => sort, [sort]);
    const memorizedLimit = useMemo(() => limit, [limit]);
    const memorizedSearchQuery=useMemo(()=> searchQuery,[searchQuery])
    const memorizedPageNo=useMemo(()=> pageNo,[pageNo])
  
    useEffect(() => {
      const params = {
        query:memorizedSearchQuery == "All"? {}: { $text: { $search: memorizedSearchQuery } }, 
        skip:memorizedPageNo == 1? 0: (memorizedPageNo-1)*memorizedLimit, 
        limit:memorizedLimit, 
        sort:{_id:memorizedSort}
      };
      setLoading(true);
  
      axios
        .get("https://more-blogs-server.vercel.app/blogs", { params })
        .then((res) => {
          if (res.data.length === 0) {
            setNotFound(true);
          } else {
            setBlogs(res.data);
            setNotFound(false);
          }
        })
        .catch((error) => {
          console.error("Error finding blogs:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [memorizedSort,memorizedLimit,memorizedSearchQuery,memorizedPageNo]);

    return {blogs,loading,notFound}
};

export default UseGetBlogs;