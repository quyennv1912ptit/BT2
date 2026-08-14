import React, { useContext, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../api/authApi";

const LoginModal = () => {
    const navigate = useNavigate();
    const {isLoggedIn, Login} = useContext(AuthContext);
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    
    const onSubmit = async (data) => {
        try {
            const res = await loginUser({
                userName: data.userName,
                password: data.password,
            });
            const {message, user, token} = res.data;
            Login(user, token);
            alert(message);
            navigate("/")
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
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            {...register("userName", {
                                required: "Vui lòng nhập tên đăng nhập",
                                setValueAs: v => v.trim(),
                            })
                            }
                        />
                        {errors.userName && <span className="error-text">{errors.userName.message}</span>}
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu:</label>
                        <input
                            type="password"
                            {
                            ...register("password", {
                                required: "Vui lòng nhập mật khẩu",
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