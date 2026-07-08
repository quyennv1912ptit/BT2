import React, { useState } from "react";
import { validateFullName, validateEmail, validatePassword, validatePhoneNumber } from "../../utils/validators";

const RegisterModal = ({ setActiveModal }) => {
    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState("");

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [phoneNumber, setPhoneNumber] = useState("")
    const [phoneNumberError, setPhoneNumberError] = useState("")

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const trimmedName = fullName.trim();
        const trimmedEmail = email.trim();
        const trimmedPhoneNumber = phoneNumber.trim();

        const nameErr = validateFullName(trimmedName);
        const emailErr = validateEmail(trimmedEmail);
        const passwordErr = validatePassword(password);
        const phoneErr = validatePhoneNumber(trimmedPhoneNumber);

        setFullNameError(nameErr);
        setEmailError(emailErr);
        setPasswordError(passwordErr);
        setPhoneNumberError(phoneErr);

        if(!nameErr && !emailErr && !passwordErr && !phoneErr) {
            alert("Đăng ký thành công, vui lòng đăng nhập");
            if (setActiveModal) {
                setActiveModal("login");
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={() => setActiveModal(null)}>X</button>
                <h2>Đăng ký</h2>
                <form onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <label>Họ và tên:</label>
                        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
                        <span>{fullNameError}</span>
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                        <span>{emailError}</span>
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu:</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <span>{passwordError}</span>
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại:</label>
                        <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                        <span>{phoneNumberError}</span>
                    </div>
                    <button type="submit">Xác nhận</button>
                </form>
            </div>
        </div>
    )
};

export default RegisterModal;