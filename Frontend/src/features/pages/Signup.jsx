import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      })

      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Server error. Check backend logs.");
    };
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg flex flex-col gap-4 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <button className="bg-blue-600 p-2 rounded hover:bg-blue-700">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
