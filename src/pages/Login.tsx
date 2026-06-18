import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [phoneNumber, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    setError(null);
    setLoading(true);
    try {
      await login(phoneNumber, password);
    } catch {
      setError("نام کاربری یا رمز عبور اشتباه است");
    } finally {
      setLoading(false);
    }
  }

  // بعد از login بر اساس role هدایت کن
  useEffect(() => {
    if (user) {
      if (user.role === "SuperAdmin") navigate("/superadmin/zones");
      else if (user.role === "ZoneAdmin") navigate("/admin");
      else if (user.role === "Guard") navigate("/guard");
      else if (user.role === "Representative") navigate("/rep");
    }
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
          ورود به سیستم
        </h2>

        {error && (
          <div
            style={{ color: "red", marginBottom: "16px", textAlign: "center" }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: "16px" }}>
          <label>شماره موبایل</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label>رمز عبور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1677ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </div>
    </div>
  );
}

export default Login;
