import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Pages/HomePage";
import ManagePosts from "./components/Pages/ManagePostsPage";
import LoginModal from "./components/Pages/LoginPagel";
import RegisterModal from "./components/Pages/RegisterPage";
import PostDetail from "./components/Pages/PostDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { getPosts } from "./api/postApi";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getPosts();
        setPosts(res.data.posts);
      } catch (e) {
        setError(e.response?.data?.message || "Không thể tải danh sách bài viết. Vui lòng thử lại!");
      } finally {
        setIsLoading(false);
      }
    };
    if (posts.length === 0) {
      fetchPosts();
    }
  }, []);

  return (
    <div className="app-container">
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={posts}
              setPosts={setPosts}
              isLoading={isLoading}
              error={error}
            />
          }
        />
        <Route
          path="/manage-posts"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ManagePosts posts={posts} setPosts={setPosts} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={<RegisterModal />}
        />
        <Route
          path="/login"
          element={<LoginModal setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/posts/:id"
          element={<PostDetail />}
        />
        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />
      </Routes>
    </div>
  );
};

export default App;