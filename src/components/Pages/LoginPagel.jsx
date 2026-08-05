import React, { useRef } from "react";
import { validateEmail, validatePassword } from "../../utils/validators";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginModal = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setIsLoggedIn(true);
        navigate("/")
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={() => navigate("/")}>X</button>
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="text"
                            {
                            ...register("email", {
                                required: "Vui lòng nhập email",
                                validate: (value) => validateEmail(value.trim()) || true
                            })
                            }
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu:</label>
                        <input
                            type="password"
                            {
                            ...register("password", {
                                required: "Vui lòng nhập mật khẩu",
                                validate: (value) => validatePassword(value) || true
                            })
                            }
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <button type="submit">Xác nhận</button>
                </form>
            </div>
        </div>
    )
};

export default LoginModal;