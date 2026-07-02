import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login, getProfile } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      redirectUser();
    }
  }, []);

  const redirectUser = async () => {
    try {
      const response = await getProfile();

      const user = response.data;

      if (user.role === "CUSTOMER") {
        navigate("/products");
      } else if (user.role === "SELLER") {
        navigate("/seller/products");
      } else if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      }
    } catch {
      localStorage.removeItem("token");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const loginResponse = await login({
        email,
        password,
      });

      const token = loginResponse.data;

      localStorage.setItem("token", token);

      const profileResponse = await getProfile();

      const profile = profileResponse.data;

      localStorage.setItem("role", profile.role);

      if (profile.role === "CUSTOMER") {
        navigate("/products");
      } else if (profile.role === "SELLER") {
        navigate("/seller/products");
      } else if (profile.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/products");
      }
    } catch {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Login</h2>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>

              {message && (
                <div
                  className="
                                    alert alert-danger mt-3
                                    "
                >
                  {message}
                </div>
              )}

              <hr />

              <Link to="/register" className="btn btn-success">
                New User? Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
