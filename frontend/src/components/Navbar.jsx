import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Collapse } from "bootstrap";

function Navbar({ isLogin, setIsLogin }) {
  const navigate = useNavigate();
  const collapseRef = useRef(null);
  const bsCollapseRef = useRef(null);

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogin");
    navigate("/");
  };

  // 初始化 Bootstrap Collapse
  useEffect(() => {
    if (collapseRef.current) {
      bsCollapseRef.current = new Collapse(collapseRef.current, { toggle: false });
    }
  }, []);

  // 收起 Navbar
  const collapseNavbar = () => {
    if (bsCollapseRef.current) bsCollapseRef.current.hide();
  };

  // 點擊空白處收起
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (collapseRef.current && !collapseRef.current.contains(event.target)) {
        collapseNavbar();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        {/* 左側系統名稱 */}
        <Link className="navbar-brand" to="/">
          NCU 選課助手
        </Link>

        {/* 漢堡按鈕 */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => bsCollapseRef.current && bsCollapseRef.current.toggle()}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 右側選單 */}
        <div className="collapse navbar-collapse justify-content-end" ref={collapseRef}>
          <ul className="navbar-nav">

            {/* 共用 */}
            <li className="nav-item">
              <Link className="nav-link" to="/announcement" onClick={collapseNavbar}>
                選課公告
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/courses" onClick={collapseNavbar}>
                課程查詢
              </Link>
            </li>

            {/* 未登入 */}
            {!isLogin && (
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={collapseNavbar}>
                  登入系統
                </Link>
              </li>
            )}

            {/* 已登入 */}
            {isLogin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/enroll" onClick={collapseNavbar}>
                    課程加退選
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/schedule" onClick={collapseNavbar}>
                    我的課表
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-3"
                    onClick={() => { handleLogout(); collapseNavbar(); }}
                  >
                    登出
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;