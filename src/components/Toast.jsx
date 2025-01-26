// Toast元件
const ToastAlert = ({
    toastRef,
    closeToast,
    toastMessage
}) => {
return (
    <>
    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" ref={toastRef}>
    <div className="toast-header">
        <strong className="me-auto">互動提示</strong>
        <button type="button" className="btn-close" aria-label="Close" onClick={closeToast}></button>
    </div>
    <div className="toast-body text-white">
        {toastMessage}
    </div>
    </div>
    </>
)
};

export default ToastAlert