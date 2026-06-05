import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate=useNavigate()

  function handleLogin() {
    if(username&&password)
     { navigate("/Dashboard")}
    else{
      alert(`ورود با نام کاربری: ${username}`)
    }
    
  }

  return (
    
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5"
    }}>

      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "12px",
        width: "350px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
          ورود به سیستم
        </h2>

        <div style={{ marginBottom: "16px" }}>
          <label>نام کاربری</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "6px",
              borderRadius: "8px", border: "1px solid #ddd", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label>رمز عبور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "6px",
              borderRadius: "8px", border: "1px solid #ddd", boxSizing: "border-box" }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{ width: "100%", padding: "12px", backgroundColor: "#1677ff",
            color: "white", border: "none", borderRadius: "8px",
            fontSize: "16px", cursor: "pointer" }}
        >
          ورود
        </button>
      </div>
    </div>
    
  )
  
}

export default Login