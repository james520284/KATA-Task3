import Pagination from "./Pagination";


// 列表元件
const List = ({
    productsData,
    handleOnClickView,
    openModal,
    setProductId,
    setModalData,
    defaultModalData,
    pageInfo,getProductsData
}) => {
return(
    <>
    <h5>劇會列表</h5>
    <div className="d-flex justify-content-between align-items-center">
        <button type="button" className='btn btn-warning d-block my-4' onClick={()=>{
        openModal('new');
        setModalData(defaultModalData);
        }}>新增劇會</button>
        
        <Pagination
        pageInfo={pageInfo}
        getProductsData={getProductsData}
        />
    </div>

    <table className='table table-light table-striped table-hover align-middle'>
        <thead>
        <tr>
            <th>名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>狀態</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {
            productsData.map((product,index) =>
            <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.origin_price}</td>
                <td>{product.price}</td>
                <td className={`${product.is_enabled?'text-success':'text-danger'}`}>{product.is_enabled?'上架':'下架'}</td>
                <td><div className="btn-group">
                <button type="button" className='btn btn-dark' onClick={()=>handleOnClickView(product)}>查看</button>
                <button type="button" className='btn btn-success' onClick={()=>{
                openModal('edit')
                setModalData(product);
                setProductId(product.id);
                }}>編輯</button>  
                <button type="button" className='btn btn-danger' onClick={()=>{
                openModal('delete');
                setProductId(product.id);
                }}>刪除</button>
                </div></td>
            </tr>
            )
        }
        </tbody>
    </table>
    </>
)
};

export default List