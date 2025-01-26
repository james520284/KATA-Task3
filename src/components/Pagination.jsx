// pagination 元件
const Pagination = ({
    pageInfo,
    getProductsData
}) => {

    const handlePageChange = (page) => {
        getProductsData(page);
    };
return (
    <>
    <nav aria-label="Page navigation ">
        <ul className="pagination mb-0">
            <li className={`page-item ${!pageInfo.has_pre && 'disabled'}`}>
            <a className="page-link" href="#" aria-label="Previous" onClick={()=>handlePageChange(pageInfo.current_page-1)}>
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>
            {
                Array.from({length:pageInfo.total_pages}).map((_,index)=>
                    <li key={index} className={`page-item ${pageInfo.current_page === index+1 && 'active'}`}>
                        <a  className="page-link" href="#" onClick={()=>handlePageChange(index+1)}>{index+1} </a>
                    </li>
                )
            }
            <li className={`page-item ${!pageInfo.has_next && 'disabled'}`}>
            <a className="page-link" href="#" aria-label="Next" onClick={()=>handlePageChange(pageInfo.current_page+1)}>
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
        </ul>
    </nav>
    </>
)
};

export default Pagination