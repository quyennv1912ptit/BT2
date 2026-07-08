import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./components/MainContents/Home";
import ManagePosts from "./components/MainContents/ManagePosts";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";

const App = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("home")
  const [activeModal, setActiveModal] = useState(null)

  const [posts, setPosts] = useState([]);

  return (
    <div className="app-container">
      <Header
        isLoggedIn={isloggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setView={setCurrentView}
        openModal={setActiveModal}
      />
      {currentView === "home" && <Home posts={posts} setPosts={setPosts}/>}
      {currentView === "manage" && isloggedIn && <ManagePosts posts={posts} setPosts={setPosts} activeModal={activeModal} setActiveModal={setActiveModal} />}
      {activeModal === "login" && <LoginModal setActiveModal={setActiveModal} setIsLoggedIn={setIsLoggedIn} />}
      {activeModal === "register" && <RegisterModal setActiveModal={setActiveModal} />}
    </div>
  );
};

export default App;