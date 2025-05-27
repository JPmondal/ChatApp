import React from "react";
import assets from "../assets/assets";
import { useState } from "react";

const Login = () => {
  const [currentStae, setCurrentState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if(currentStae === "Sign Up" && !isSubmitted){
      setIsSubmitted(true)
      return
    }
  };

  return (
    <div className="h-screen flex items-center sm:justify-evenly justify-center gap-8  max-sm:flex-col bg backdrop-blur-2xl">
      <img src={assets.logo_big} className="w-[min(30vw,250px)]" alt="" />
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className="flex flex-col gap-5 p-6 border-2 border-white rounded-xl bg-white/8 text-white w-[min(90vw,320px)]"
      >
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">{currentStae}</p>
          {isSubmitted && (<img onClick={()=>setIsSubmitted(false)} src={assets.arrow_icon} alt="" className="w-4 cursor-pointer" />)}
        </div>
        {currentStae === "Sign Up" && !isSubmitted && (
          <input
            required
            type="text"
            placeholder="Enter Full Name"
            className="font-medium p-2 border-gray-500 border rounded-md focus:outline-none"
          />
        )}
        {!isSubmitted && (
          <>
            <input required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="font-medium p-2 border-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="font-medium p-2 border-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}
        {
          currentStae === "Sign Up" && isSubmitted && (
            <textarea name="
            bio" id="bio" rows="4" className="font-medium  p-2 border-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="provide a short bio..."></textarea>
          )
        }
        <button 
          className="bg-gradient-to-r from-indigo-400 to-violet-500 p-2 rounded-md cursor-pointer"
          type="submit"
        >
          {currentStae === "Sign Up" ? "Sign Up" : "Sign In"}
        </button>
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          <p className="text-xs text-gray-200">Are you agree to our terms ? </p>
        </div>
        <div>
          {currentStae === "Sign Up" ? (
            <p className="text-xs text-gray-200">Already Have Account?  <span className="text-blue-500 cursor-pointer" onClick={()=>{ setCurrentState("Login") ; setIsSubmitted(false)}}>Login Here</span></p>
          ):(
            <p className="text-xs text-gray-200">Create New Account? <span className="text-blue-500 cursor-pointer" onClick={()=> setCurrentState("Sign Up")}>Sign Up Here</span></p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
