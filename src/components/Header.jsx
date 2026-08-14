import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn, Login, Logout } = useContext(AuthContext);
    const handleLogout = () => {
        Logout();
        navigate("/");
    };
    return <header className="header-container">
        <h1>React App</h1>
        {
            isLoggedIn && (
                <>
                    <span>Xin chào, {user.userName}!</span>
                    <span>Role: {user.role}</span>
                </>
            )
        }
        <nav className="header-menu">
            <NavLink
                to="/"
                end
                className="nav-link"
            >
                Trang chủ
            </NavLink>
            {!isLoggedIn ?
                <>
                    <NavLink to="/register" className="nav-link">Đăng ký</NavLink>
                    <NavLink to="/login" className="nav-link">Đăng nhập</NavLink>
                </>
                :
                <>
                    <NavLink to="/manage-posts" className="nav-link">Quản lý bài viết</NavLink>
                    <button onClick={handleLogout}>Đăng xuất</button>
                </>
            }
        </nav>
    </header>
};

export default Header;