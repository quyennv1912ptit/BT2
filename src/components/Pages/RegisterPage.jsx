import React from "react";
import { validateUserName, validateEmail, validatePassword, validatePhoneNumber } from "../../utils/validators";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../api/authApi";

const RegisterModal = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await registerUser({
                userName: data.userName,
                email: data.email,
                password: data.password,
                phoneNumber: data.phoneNumber,
            });
            alert(res.data.message);
            navigate("/login");
        } catch (error) {
            if (error.response) {
                alert("Lỗi: " + error.response.data.message);
            } else {
                alert("Lỗi kết nối đến máy chủ!");
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={() => navigate("/")}>X</button>
                <h2>Đăng ký</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            {...register("userName", {
                                required: "Vui lòng nhập tên đăng nhập",
                                validate: (value) => validateUserName(value.trim()) || true
                            })}
                        />
                        {errors.userName && <span className="error-text">{errors.userName.message}</span>}
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