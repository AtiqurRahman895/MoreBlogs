import { useLocation } from 'react-router-dom';

const UseUrlQuery = (defaultValue="All") => {
    const query = new URLSearchParams(useLocation().search);

    const searchQuery = query.get("searchQuery") || defaultValue;

    let pageNo =parseInt(query.get("page"),10);
    pageNo= isNaN(pageNo)?1:pageNo

    let sort = parseInt(query.get("sort"), 10);
    sort = sort === 1 || sort === -1 ? sort : -1; 

    return {sort,searchQuery,pageNo};
};

export default UseUrlQuery;