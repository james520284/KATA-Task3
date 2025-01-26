// 卡片元件
const Card = ({
    unitProduct
}) =>{
return (
    <>
    <h5>劇會細節</h5>
    <div className="card">
    <img src={unitProduct.imageUrl} className="card-img-top" alt={unitProduct.title}/>
    <div className="card-body">
        <h5 className="card-title">{unitProduct.title}<span className="badge text-bg-info mx-2">{unitProduct.category}</span><span className={`badge ${unitProduct.rank?'text-bg-warning':'text-bg-secondary'}`}>{unitProduct.rank?`${unitProduct.rank}顆星`:'未評價'}</span></h5>
        <p className="card-text">{unitProduct.description}</p>
        <p className="card-text">{unitProduct.content}</p>
        <h5>更多圖片</h5>
        <div className="row gy-4">
        {
        unitProduct.imagesUrl &&
        unitProduct.imagesUrl.map((img,index) => 
            <div className="col-6" key={index}>
            <div>
                <img src={img} alt="副圖" className='img-cover' />
            </div>
            </div>
        )
        }
        </div>
    </div>
    </div>
    </>
)

};

export default Card
