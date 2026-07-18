import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn}) => {
    const navigate = useNavigate();
    const logout = () => {
        setIsLoggedIn(false);
        navigate("/");
    };
    return <header className="header-container">
        <h1>React App</h1>
        <nav className="header-menu">
            <NavLink 
                to="/" 
                end 
                className="nav-link"
            >
                Trang chủ
            </NavLink>
            {!isLoggedIn &&
                <>
                    <NavLink to="/register" className="nav-link">Đăng ký</NavLink>
                    <NavLink to="/login" className="nav-link">Đăng nhập</NavLink>
                </>
            }
            {isLoggedIn && 
                <>
                    <NavLink to="/manage-posts"  className="nav-link">Quản lý bài viết</NavLink>
                    <button onClick={logout}>Đăng xuất</button>
                </>
            }
        </nav>
    </header>
};

export default Header;