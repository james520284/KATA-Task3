import { useEffect, useState } from 'react'
import axios from 'axios'

import Login from './pages/Login';
import ProductManager from './pages/ProductManager';

console.clear();

const baseUrl = import.meta.env.VITE_BASE_URL;

// =====================================================
// 父元素元件
const App = () => {
  const defaultUserInfo = {username: "",password: ""};
  const [userInfo,setUserInfo] = useState(defaultUserInfo);
  
 // 登入 api
  const handleOnChangeLogin = (e) =>{
    const {name,value} = e.target;
    setUserInfo(prev => ({...prev,[name]: value}));
  };
  const postSignin = async () => {
    try {
      const res = await axios.post(`${baseUrl}/admin/signin`,userInfo);
      const {token,expired} = res.data;      
      document.cookie =`myToken=${token}; expires=${new Date(expired)};`
      setIsAuthor(true);
    } catch (err) {
      console.error(err);
    }
  };
  const handleOnSubmitSignin =async (e) => {
    e.preventDefault();
    await postSignin();
    setUserInfo(defaultUserInfo);
  };

  // 登入驗證 api
  const [isAuthor,setIsAuthor] = useState(false);
  const checkLogin =async () => {
    try {
      await axios.post(`${baseUrl}/api/user/check`);
      setIsAuthor(true);
    } catch (err) {
      setIsAuthor(false);
    }
  };

  useEffect(()=>{
    const checkAuth = async () => {
    const getToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common['Authorization'] = getToken;
    
    await checkLogin(); 
  };

  checkAuth();
  },[]);


  return (
    <>
      {
        isAuthor ? (
        <>
        <ProductManager
        isAuthor={isAuthor}
        />
        </>
        ) : (
        <Login
        handleOnChangeLogin={handleOnChangeLogin}
        handleOnSubmitSignin={handleOnSubmitSignin}
        userInfo={userInfo}
        />
        )
      }
    </>
  )
}

export default App
