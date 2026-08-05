import React from "react";
import { validateFullName, validateEmail, validatePassword, validatePhoneNumber } from "../../utils/validators";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const RegisterModal = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        alert("Đăng ký thành công, vui lòng đăng nhập");
        navigate("/login");
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={() => navigate("/")}>X</button>
                <h2>Đăng ký</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Họ và tên:</label>
                        <input
                            type="text"
                            {...register("fullName", {
                                required: "Vui lòng nhập họ và tên",
                                validate: (value) => validateFullName(value.trim()) || true
                            })}
                        />
                        {errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="text"
                            {...register("email", {
                                required: "Vui lòng nhập email",
                                validate: (value) => validateEmail(value.trim()) || true
                            })}
                        />
                        {errors.email && <span className="error-text">{errors.email.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu:</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Vui lòng nhập mật khẩu",
                                validate: (value) => validatePassword(value) || true
                            })}
                        />
                        {errors.password && <span className="error-text">{errors.password.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Số điện thoại:</label>
                        <input
                            type="text"
                            {...register("phoneNumber", {
                                required: "Vui lòng nhập số điện thoại",
                                validate: (value) => validatePhoneNumber(value.trim()) || true
                            })}
                        />
                        {errors.phoneNumber && <span className="error-text">{errors.phoneNumber.message}</span>}
                    </div>

                    <button type="submit">Xác nhận</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;