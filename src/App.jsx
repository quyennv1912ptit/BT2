import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/MainContents/Home";
import ManagePosts from "./components/MainContents/ManagePosts";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";
import PostDetail from "./components/MainContents/PostDetail";

const App = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);

  return (
    <div className="app-container">
      <Header
        isLoggedIn={isloggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Routes>
        <Route
          path="/"
          element={<Home posts={posts} setPosts={setPosts}/>} 
        />
        <Route
          path="/manage-posts"
          element={
            isloggedIn ? (
              <ManagePosts
                posts = {posts}
                setPosts={setPosts}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/register"
          element={<RegisterModal />}
        />
        <Route
          path="/login"
          element={<LoginModal setIsLoggedIn={setIsLoggedIn}/>}
        />
        <Route
          path="/posts/:id"
          element={<PostDetail />}
        />
      </Routes>
    </div>
  );
};

export default App;