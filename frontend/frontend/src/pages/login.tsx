import { Button } from "../components/button"
import { Input } from "../components/input"
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "lucide-react";
export function Signin(){
      const usernameRef = useRef<HTMLInputElement>();
        const passwordRef = useRef<HTMLInputElement>();
        const navigate=useNavigate();
           
    async  function signin(){
               const username=usernameRef.current.value;
               const password=passwordRef.current.value;
          const response= await axios.post(BACKEND_URL+"/api/v1/signin",{
                    username,
                    password
               })
              const jwt=response.data.token;
              localStorage.setItem("token",jwt);
              navigate("/home")
        }
    
    return(
        <div className="h-screen w-screen bg-gray-200 flex 
         justify-center items-center">
            <div className="p-9 shadow-lg bg-white rounded-xl min-h-52 border border-slate-200  min-w-48">
                <div className="pb-3">
           <Input ref={usernameRef} placeholder="Username"></Input>
            </div>
           <Input ref={passwordRef} placeholder="Password"></Input>
          
           <div className="flex justify-center items-center mt-4 ">
           <Button onClick={signin} loading={false} variant="secondary" size="md" text="Signin" fullWidth={true}/>
           </div>
           <p className="text-sm text-gray-600 mt-3 text-center">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </NavLink>
        </p>
            </div>
        </div>
    )
}