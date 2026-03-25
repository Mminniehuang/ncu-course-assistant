function Login({ setIsLogin }) {
  const handleLogin = () => {
    localStorage.setItem("isLogin", "true");
    setIsLogin(true);
    window.location.href = "/";
  };

  return (
    <div className="container mt-5 text-center">
      <h2>登入系統</h2>

      <button className="btn btn-primary mt-3" onClick={handleLogin}>
        模擬登入
      </button>
    </div>
  );
}

export default Login;