// 登入元件
const Login = ({
    handleOnChangeLogin,
    handleOnSubmitSignin,
    userInfo
}) => {
return(
    <>
    <div className='mx-auto text-center w-50 login-wrap'>
    <h1 className='h2 mb-3'>請先登入</h1>
    <form onSubmit={handleOnSubmitSignin}>
        <div className="form-floating mb-3">
        <input
        type="email"
        className="form-control"
        id="username"
        name="username"
        placeholder="name@example.com"
        value={userInfo.username}
        onChange={handleOnChangeLogin}
        />
        <label htmlFor="username">信箱</label>
        </div>
        <div className="form-floating">
        <input
        type="password"
        className="form-control"
        id="password"
        name="password"
        placeholder="Password"
        value={userInfo.password}
        onChange={handleOnChangeLogin}
        />
        <label htmlFor="password">密碼</label>
        </div>
        <button className='btn btn-primary w-100 mt-2'>登入</button>
    </form>
    </div>
    </>
)
};

export default Login