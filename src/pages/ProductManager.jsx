import { useEffect, useRef, useState } from 'react'
import { Modal } from 'bootstrap'
import { Toast } from 'bootstrap';
import axios from 'axios'

import List from '../components/List';
import Card from '../components/Card';
import MyModal from '../components/Modal';
import ToastAlert from '../components/Toast';

console.clear();

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

// 產品管理元件
const ProductManager = ({
    isAuthor
}) => {
// 卡片預覽相關
const [productsData,setProductsData] = useState([]);
const [productId,setProductId] = useState('');
const [unitProduct,setUnitProduct] = useState(null);
const handleOnClickView = product => setUnitProduct(product);
useEffect(()=>{
    getProductsData();
},[isAuthor]);


// Modal相關
const defaultModalData = {
    title: "",
    category: "",
    origin_price: "",
    price: "",
    unit: "",
    description: "",
    content: "",
    is_enabled: 1,
    imageUrl: "",
    imagesUrl: [],
    rank:""
}
const modalRef = useRef(null);
const myModalRef = useRef(null);
const [modalType,setModalType] = useState('');
const [modalData,setModalData] = useState(defaultModalData);
const imgUploadFileRef = useRef(null);

useEffect(()=>{
    if (isAuthor) {
    myModalRef.current = new Modal(modalRef.current);    
    }
},[]);

const openModal = (changeModalType) => {
    setModalType(changeModalType);
    myModalRef.current.show();
}

const closeModal = () => {
    myModalRef.current.hide();
}

const handleOnChangeModal = (e) => {
    const {name,value,type,checked} = e.target;
    setModalData(prev => ({
    ...prev,
    [name]:type === 'checkbox'?checked :value
    }));
};

const handleOnClickModal = async(changeModalType) => {
    switch (changeModalType) {
    case 'new':
        await postModalData();
        break;
    case 'edit':
        await putModalData();
        break;
    case 'delete':
        await removeModalData();
        break;
    default:
        break;
    }
    await getProductsData();
    closeModal();
};

const addImg = () => {
    setModalData(prev=>{
    if (prev.imagesUrl) {
        const newImgArr = [...prev.imagesUrl];
        newImgArr.push('');
        return {...prev,imagesUrl:newImgArr};
    }else{
        return {...prev,imagesUrl:['']};
    }
    });
};

const removeImg = (index) => {
    setModalData(prev=>{
    const newImgArr = [...prev.imagesUrl];
    newImgArr.splice(index,1);
    return {...prev,imagesUrl:newImgArr};
    });
}

const handleOnChangeImg = (e,index) => {
    const {value} = e.target;
    setModalData(prev=>{
    const newImgArr = [...prev.imagesUrl];
    newImgArr[index]=value;
    return {...prev,imagesUrl:newImgArr}
    });
}; 

const handleUploadImg = (e) => {
    imgUploadFileRef.current = e.target.files[0]
    postImgFile();
};


// API相關
// 取得產品 api
const getProductsData = async (page = 1) => {
    try {
    const res = await axios.get(`${baseUrl}/api/${apiPath}/admin/products?page=${page}`);
    setProductsData(Object.values(res.data.products));
    setPageInfo(res.data.pagination);
    } catch (err) {
    setToastMessage(`${err.response?.data?.message}`);
    openToast();
    }
};
// 新增產品 api
const postModalData = async () => {
    const updateDataFormat = {
    data:{
        ...modalData,
        origin_price:Number(modalData.origin_price),
        price:Number(modalData.price),
        is_enabled:modalData.is_enabled? 1: 0
    }
    }
    try {
    await axios.post(`${baseUrl}/api/${apiPath}/admin/product`,updateDataFormat);
    setToastMessage('成功發起劇會');
    openToast();
    } catch (err) {
    setToastMessage(`${err.response?.data?.message}`);
    openToast();
    }
};
// 編輯產品 api
const putModalData = async () => {
    const updateDataFormat = {
    data:{
        ...modalData,
        origin_price:Number(modalData.origin_price),
        price:Number(modalData.price),
        is_enabled:modalData.is_enabled? 1: 0,
        rank:modalData.rank?modalData.rank:''
    }
    }
    try {
    await axios.put(`${baseUrl}/api/${apiPath}/admin/product/${productId}`,updateDataFormat);
    setToastMessage('成功更新劇會');
    openToast();
    setUnitProduct(modalData);
    } catch (err) {
    setToastMessage(`${err.response?.data?.message}`);
    openToast();
    }
};
// 刪除產品 api
const removeModalData = async () => {
    try {
    await axios.delete(`${baseUrl}/api/${apiPath}/admin/product/${productId}`);
    setToastMessage('成功刪除劇會');
    openToast();
    } catch (err) {
    setToastMessage(`${err.response?.data?.message}`);
    openToast();
    }
};
// 上傳圖片 api
const postImgFile = async () => {
    const imgFormat = new FormData();
    imgFormat.append("file-to-upload",imgUploadFileRef.current);
    try {
    const res = await axios.post(`${baseUrl}/api/${apiPath}/admin/upload`,imgFormat);
    setModalData(prev => ({
        ...prev,
        imageUrl:res.data.imageUrl
    }));
    setToastMessage('成功上傳圖片');
    openToast();
    } catch (err) {
    setToastMessage(`${err.response?.data?.message}`);
    openToast();
    }
};

// Toast相關
const toastRef = useRef(null);
const myToastRef = useRef(null);
const [toastMessage,setToastMessage] = useState('');

useEffect(()=>{
    if (isAuthor) {
    myToastRef.current = Toast.getOrCreateInstance(toastRef.current)
    }
},[]);

const openToast = () => {
    myToastRef.current.show();
};

const closeToast = () => {
    myToastRef.current.hide();
};

// Pagination相關
const [pageInfo,setPageInfo] = useState({});

return (
    <>
    <div className="container">
    <div className="row gy-4">
        <div className="col-xl-8">
        <List
        productsData={productsData}
        handleOnClickView={handleOnClickView}
        openModal={openModal}
        setProductId={setProductId}
        setModalData={setModalData}
        defaultModalData={defaultModalData}
        pageInfo={pageInfo}
        getProductsData={getProductsData}/>
        </div>
        <div className="col-xl-4">
        {unitProduct && (<Card unitProduct={unitProduct}/>)}
        </div>
    </div>
    </div>
    <MyModal
    modalRef={modalRef}
    modalType={modalType}
    closeModal={closeModal}
    modalData={modalData}
    handleOnChangeModal={handleOnChangeModal}
    handleOnClickModal={handleOnClickModal}
    addImg={addImg} removeImg={removeImg}
    handleOnChangeImg={handleOnChangeImg}
    handleUploadImg={handleUploadImg}/>

    <ToastAlert
    toastRef={toastRef}
    closeToast={closeToast}
    toastMessage={toastMessage}/>
    </>
)
};

export default ProductManager