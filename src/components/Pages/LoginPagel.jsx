import React, { useRef } from "react";
import { validateEmail, validatePassword } from "../../utils/validators";
import { useNavigate } from "react-router-dom";

const LoginModal = ({setIsLoggedIn}) => {
    const navigate = useNavigate();

    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const emailError = useRef(null);
    const passwordError = useRef(null);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        const trimmedEmail = email.trim();

        const emailErr = validateEmail(trimmedEmail);
        const passwordErr = validatePassword(password);

        emailError.current.textContent = emailErr;
        passwordError.current.textContent = passwordErr;

        if(!emailErr && !passwordErr) {
            setIsLoggedIn(true);
            navigate("/")
        }
    }; 

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={() => navigate(-1)}>X</button>
                <h2>Đăng nhập</h2>
                <form onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" ref={emailInput}/>
                        <span ref={emailError}></span>
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu:</label>
                        <input type="password" ref={passwordInput}/>
                        <span ref={passwordError}></span>
                    </div>
                    <button type="submit">Xác nhận</button>
                </form>
            </div>
        </div>
    )
};

export default LoginModal;