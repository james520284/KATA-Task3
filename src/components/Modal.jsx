
console.clear();

// Modal元件
const MyModal = ({
    modalRef,
    modalType,
    closeModal,
    modalData,
    handleOnChangeModal,
    handleOnClickModal,
    addImg,
    removeImg,
    handleOnChangeImg,
    handleUploadImg
}) => {

const {title,category,unit,origin_price,price,description,content,is_enabled,imageUrl,imagesUrl,rank}=modalData;

return(
    <>
    <div className="modal fade" id="myModal" tabIndex="-1" ref={modalRef}>
    <div className="modal-dialog modal-xl">
        <div className="modal-content">
        <div className={`modal-header 
            ${modalType ==='new'?'bg-warning text-dark':
            (modalType==='edit'?'bg-info text-dark':'bg-danger text-light')}`}>
            <h1 className="modal-title fs-5" id="addModal">
            {modalType ==='new'?'新增劇會':
            (modalType==='edit'?'編輯劇會':'刪除劇會')}</h1>
            <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
        </div>
        {
            modalType==='delete'?
            (<p className='mt-3 ms-3'>您確定要刪除「{title}」嗎？</p>):
            (
            <div className="modal-body text-center">
                <div className="row">
                <div className="col-4">
                    <h6>主圖</h6>
                    <div className="form-group my-3 text-start">
                        <label htmlFor='imageUpload' className='form-label '>檔案上傳</label>
                        <input
                        id='imageUpload'
                        name='imageUpload'
                        type="file"
                        accept=".jpg,.jpeg,png"
                        className='form-control'
                        onChange={handleUploadImg}
                        />
                        
                    </div>
                    <div className="form-group text-start">
                    <label htmlFor='imageUrl' className='form-label'>或附圖片連結</label>
                    <input
                    id='imageUrl'
                    name='imageUrl'
                    type="text"
                    className='form-control'
                    placeholder='貼上圖片連結'
                    value={imageUrl}
                    onChange={handleOnChangeModal}
                    />
                    </div>
                    {
                    imageUrl&&
                    (<>
                    <div className='my-2'>
                        <img src={imageUrl} alt="主圖" className='img-cover'/>
                    </div>
                    {
                        (!imagesUrl || imagesUrl.length === 0 ) &&
                        <button type="button" className='btn btn-outline-primary w-100' onClick={addImg}> 新增圖片</button>
                    }
                    </>)
                    }
                    {
                    imagesUrl &&
                    imagesUrl.map((img,index)=>
                    <div className='mt-3 p-2 border rounded' key={index}>
                        <div className="form-group ">
                        <label htmlFor='imageUrl' className='form-label'>副圖{index+1}</label>
                        <input
                        id={`imageUrl${index+1}`}
                        name={`imageUrl${index+1}`}
                        type="text"
                        className='form-control'
                        placeholder='請貼上圖片連結'
                        value={imagesUrl[index]}
                        onChange={(e)=>handleOnChangeImg(e,index)}
                        />
                        </div>
                        {
                        imagesUrl[index]&&
                        (
                            <>
                            <div className='my-2'>
                            <img src={img}
                            alt={`副圖${index+1}`}
                            className='img-cover'/>
                        </div>
                        <div className="btn-group w-100">
                            {
                            imagesUrl.length<5 && imagesUrl.length === index+1 &&
                            <button type="button" className='btn btn-outline-primary' onClick={addImg}>新增圖片</button>
                            }
                            <button type="button" className='btn btn-outline-danger' onClick={()=>removeImg(index)}>取消圖片</button>
                        </div>
                            </>
                        )
                        }
                    </div>
                    )
                    }
                    
                </div>
                <div className="col-8">
                    <div className="form-group mb-4">
                    <label htmlFor='title' className='form-label'>標題</label>
                    <input
                    id='title'
                    name='title'
                    type="text"
                    className='form-control'
                    placeholder='請輸入標題'
                    value={title}
                    onChange={handleOnChangeModal}
                    />
                    </div>
                    <div className="row row-cols-2 gy-4">
                    <div className="col">
                        <div className="form-group">
                        <label htmlFor='category' className='form-label'>分類</label>
                        <input
                        id='category'
                        name='category'
                        type="text"
                        className='form-control'
                        placeholder='請輸入分類'
                        value={category}
                        onChange={handleOnChangeModal}
                        />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                        <label htmlFor='unit' className='form-label'>單位</label>
                        <input
                        id='unit'
                        name='unit'
                        type="text"
                        className='form-control'
                        placeholder='請輸入單位'
                        value={unit}
                        onChange={handleOnChangeModal}
                        />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                        <label htmlFor='origin_price' className='form-label'>原價</label>
                        <input
                        id='origin_price'
                        name='origin_price'
                        type="number"
                        min='0'
                        className='form-control'
                        placeholder='請輸入原價'
                        value={origin_price}
                        onChange={handleOnChangeModal}
                        />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                        <label htmlFor='price' className='form-label'>售價</label>
                        <input
                        id='price'
                        name='price'
                        type="number"
                        min='0'
                        className='form-control'
                        placeholder='請輸入售價'
                        value={price}
                        onChange={handleOnChangeModal}
                        />
                        </div>
                    </div>
                    </div>
                    <hr className='my-4'/>
                    <div className="form-group mb-4">
                    <label htmlFor='description' className='form-label'>產品描述</label>
                    <textarea
                    id='description'
                    name='description'
                    type="text"
                    className='form-control'
                    placeholder='請輸入產品描述'
                    value={description}
                    onChange={handleOnChangeModal}
                    />
                    </div>
                    <div className="form-group mb-4">
                    <label htmlFor='content' className='form-label'>說明內容</label>
                    <textarea
                    id='content'
                    name='content'
                    type="text"
                    className='form-control'
                    placeholder='請輸入說明內容'
                    value={content}
                    onChange={handleOnChangeModal}
                    />
                    </div>

                    <div className="form-group mb-4">
                    <label htmlFor='rank' className='form-label'>星級評價</label>
                    <input
                    id='rank'
                    name='rank'
                    type="number"
                    min='1'
                    max='10'
                    className='form-control'
                    placeholder='請選擇1~10顆星'
                    value={rank?rank:''}
                    onChange={handleOnChangeModal}
                    />

                    </div>
                    <div className="form-check text-start">
                    <input
                    className="form-check-input" 
                    type="checkbox" 
                    id="is_enabled"
                    name="is_enabled"
                    checked={is_enabled}
                    onChange={handleOnChangeModal}
                    />
                    <label className="form-check-label" htmlFor="is_enabled">
                        是否上架
                    </label>
                    </div>
                </div>
                </div>
            </div>
            )
        }
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary"  onClick={closeModal}>取消</button>
            <button type="button" className="btn btn-primary" onClick={()=>handleOnClickModal(modalType)}>送出</button>
        </div>
        </div>
    </div>
    </div> 
    </>
)
};

export default MyModal