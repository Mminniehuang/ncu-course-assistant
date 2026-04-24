import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Announcements from "./pages/Announcements";
import Schedule from "./pages/Schedule";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Enroll from "./pages/Enroll";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // 取得當前網址資訊
  const location = useLocation();

  useEffect(() => {
    // 1. 檢查網址參數是否有 ?login=success
    const params = new URLSearchParams(location.search);
    if (params.get("login") === "success") {
      // 如果有，代表剛從 Portal 轉回來，直接設為登入
      localStorage.setItem("isLogin", "true");
      setIsLogin(true);
      
      window.history.replaceState({}, document.title, "/");
    } else {
      // 2. 如果網址沒參數，就走原本的 localStorage 檢查
      const loginStatus = localStorage.getItem("isLogin");
      if (loginStatus === "true") {
        setIsLogin(true);
      }
    }
  }, [location]); // 當網址改變時重新偵測

  return (
    <>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />

      <Routes>
        <Route path="/" element={<Announcements />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/courses" element={<Courses />} />  {/* 任何人都能看 */}
  
        {/* 加退選必須登入 */}
        <Route
          path="/enroll"
          element={
            isLogin ? (
              <Enroll
                selectedCourses={selectedCourses}
                setSelectedCourses={setSelectedCourses}
              />
            ) : (
              <Login setIsLogin={setIsLogin} />
            )
          }
        />

        {/* 課表也必須登入 */}
        <Route
          path="/schedule"
          element={
            isLogin ? (
              <Schedule courses={selectedCourses} setCourses={setSelectedCourses} />
            ) : (
              <Login setIsLogin={setIsLogin} />
            )
          }
        />
      </Routes>
      <Chatbot isLogin={isLogin} />
    </>
  );
}

export default App;