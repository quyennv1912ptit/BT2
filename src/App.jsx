import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Pages/HomePage";
import ManagePosts from "./components/Pages/ManagePostsPage";
import LoginModal from "./components/Pages/LoginPagel";
import RegisterModal from "./components/Pages/RegisterPage";
import PostDetail from "./components/Pages/PostDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { getPosts } from "./api/postApi";
import { AuthContext } from "./context/AuthContext";
import UserInfoPage from "./components/Pages/UserInfoPage";

const App = () => {
  const { isLoggedIn, user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getPosts();
        setPosts(res.data.data || res.data);
      } catch (e) {
        setError(e.response?.data?.message || "Không thể tải danh sách bài viết. Vui lòng thử lại!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="app-container">
      <Header />
      
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
            <ProtectedRoute>
              <ManagePosts posts={posts} setPosts={setPosts} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-info"
          element={
            <ProtectedRoute>
              <UserInfoPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/register"
          element={<RegisterModal />}
        />
        
        <Route
          path="/login"
          element={<LoginModal />}
        />
        
        <Route
          path="/posts/:slug"
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