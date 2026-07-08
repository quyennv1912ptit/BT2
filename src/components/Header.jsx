import React from "react";

const Header = ({ isLoggedIn, setIsLoggedIn, setView, openModal }) => {
    return <header className="header-container">
        <h1>React App</h1>
        <nav className="header-menu">
            <button onClick={() => setView("home")}>Trang chủ</button>
            {!isLoggedIn &&
                <>
                    <button onClick={() => openModal("register")}>Đăng ký</button>
                    <button onClick={() => openModal("login")}>Đăng nhập</button>
                </>
            }

            {isLoggedIn && 
                <>
                    <button onClick={() => setView("manage")}>Quản lý bài viết</button>
                    <button onClick={() => setIsLoggedIn(false)}>Đăng xuất</button>
                </>
            }
        </nav>
    </header>
};

export default Header;