import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Announcements from "./pages/Announcements";
import Schedule from "./pages/Schedule";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Enroll from "./pages/Enroll";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  // ⭐ 全域「已選課」
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin");
    if (loginStatus === "true") {
      setIsLogin(true);
    }
  }, []);

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