import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLogin, setIsLogin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogin");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        
        {/* 左側系統名稱 */}
        <Link className="navbar-brand" to="/">
          NCU 選課助手
        </Link>

        {/* 右側選單 */}
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">

            {/* 共用 */}
            <li className="nav-item">
              <Link className="nav-link" to="/announcement">
                選課公告
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/courses">
                課程查詢
              </Link>
            </li>

            {/* 未登入 */}
            {!isLogin && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  登入系統
                </Link>
              </li>
            )}

            {/* 已登入 */}
            {isLogin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/enroll">
                    課程加退選
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/schedule">
                    我的課表
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-3"
                    onClick={handleLogout}
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