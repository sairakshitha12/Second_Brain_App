import { useState } from "react";
import { Button } from "../components/button"
import { Input } from "../components/input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Links, NavLink, useNavigate } from "react-router-dom";
import { Link } from "lucide-react";
export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const navigate = useNavigate();

  function validate() {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "Username is required.";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function signup() {
    if (!validate()) return;

    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, { username, password });
      navigate("/Signin")
    } catch (error) {
      setErrors({ username: "Signup failed, try again later." });
      console.error(error);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="p-8 shadow-lg  bg-white rounded-xl min-h-52 space-y-4">
        
        {/* Username */}
        <div >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div >
          <Input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Button */}
        <div className="flex justify-center items-center mt-3">
          <Button onClick={signup} loading={false} text="Signup" size="md" variant="secondary" fullWidth={true}>
            Signup
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-3 text-center">
         Already have an account?{" "}
         
        <NavLink to="/signin" className="text-blue-600 hover:underline">
         Sign in
        </NavLink>
        </p>
      

      </div>
    </div>
  );
}