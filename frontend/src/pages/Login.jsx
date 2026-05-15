function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:31080/auth/login";
  };

  return (
    <div className="container mt-5 text-center">
      <h2>登入系統</h2>

      <button className="btn btn-primary mt-3" onClick={handleLogin}>
        使用 Portal 登入
      </button>
    </div>
  );
}

export default Login;