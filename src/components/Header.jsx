import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn, Logout } = useContext(AuthContext);
    const { darkTheme, toggleDarkTheme } = useContext(ThemeContext);

    const handleLogout = () => {
        Logout();
        navigate("/");
    };

    return (
        <header className="header-container">
            <div className="header-logo">
                <h1>React App</h1>
            </div>
            
            <nav className="header-menu">
                <NavLink to="/" end className="nav-link">
                    Trang chủ
                </NavLink>
                
                {!isLoggedIn ? (
                    <>
                        <NavLink to="/register" className="nav-link">Đăng ký</NavLink>
                        <NavLink to="/login" className="nav-link">Đăng nhập</NavLink>
                    </>
                ) : (
                    <>
                    <NavLink to="/manage-posts" className="nav-link">Quản lý bài viết</NavLink>
                    <NavLink to="/user-info" className="nav-link">Thông tin người dùng</NavLink>
                    
                    </>
                )}
            </nav>

            <div className="header-actions">
                {isLoggedIn && (
                    <div className="user-info">
                        <span>Xin chào, <strong>{user?.userName}</strong>!</span>
                        <span className="role-badge">[{user?.role}]</span>
                        <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
                    </div>
                )}
                
                <button className="theme-toggle-btn" onClick={toggleDarkTheme}>
                    {darkTheme ? "☀️ Sáng" : "🌙 Tối"}
                </button>
            </div>
        </header>
    );
};

export default Header;