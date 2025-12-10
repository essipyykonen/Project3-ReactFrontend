import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useApi } from "./hooks/useApi";
import "bootstrap/dist/css/bootstrap.min.css";

// Component 1: Login Form
function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const endpoint = isRegister ? "/api/register" : "/api/login";
    try {
      const res = await axios.post(`${API}${endpoint}`, { email, password });
      if (!isRegister) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      } else {
        setIsRegister(false);
        alert("Registration successful! Please login.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">{isRegister ? "Register" : "Login"}</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input className="form-control" type="email" placeholder="Email"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <input className="form-control" type="password" placeholder="Password"
                value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary w-100">
              {isRegister ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <button className="btn btn-link w-100 mt-2" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Already have account? Login" : "Need account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Component 2: Dashboard (Main app)
function Dashboard({ token, handleLogout }) {
  const { data: items, loading, error, create, remove } = useApi("/api/snippets", token);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [filterLang, setFilterLang] = useState("all");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    create({ 
      title: newItem,
      language: "javascript",
      code: "// demo code",
    });
    setNewItem("");
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark px-3 mb-4">
        <span className="navbar-brand">Project 3 App</span>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card p-3">
              <h4>Add New Item</h4>
              <form onSubmit={handleAdd}>
                <input className="form-control mb-2" placeholder="Item Title..."
                  value={newItem} onChange={e => setNewItem(e.target.value)} />
                <button className="btn btn-success w-100" disabled={loading}>
                  {loading ? "Processing..." : "Add Item"}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-8">
            <h4>Your Items</h4>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="form-select mb-3"
              value={filterLang}
              onChange={(e) => setFilterLang(e.target.value)}
            >
              <option value="all">All Languages</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="list-group">
              {items
              .filter(item =>
                item.title?.toLowerCase().includes(search.toLowerCase())
              )
              .map(item => (
                <div key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.title || item.name}</h5>
                    <small className="text-muted">{item._id}</small>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => remove(item._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component 3: Main Layout (Router)
function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          !token ? <Navigate to="/login" /> : <Dashboard token={token} handleLogout={handleLogout} />
        } />
        <Route path="/login" element={
          token ? <Navigate to="/" /> : <Login setToken={setToken} />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;