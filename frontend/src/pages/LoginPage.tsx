
import { Component, useState } from "react";
import Onboarding from "@/components/Onboarding";
import PatientDashboard from "@/components/PatientDashboard";
import CaretakerDashboard from "@/components/CaretakerDashboard";
import { Button } from "@/components/ui/button";
import { Users, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

type UserType = "patient" | "caretaker" | null;

const LoginPage = () => {
const navigate = useNavigate()
const [showLoginCard, switchCards] = useState(true)
const [userDetails, setUserDetails] = useState({name : '',email : '', password : '',role : 'patient'})
const [loginError, setLoginError] = useState('')


const onSuccessLogin = async () => {
  try{
      const API = 'http://localhost:3000/login'
      const loginDetails = {
        email : userDetails.email,
        password : userDetails.password
      }
      const loginOptions = {
        method : 'POST',
        body : JSON.stringify(loginDetails),
        headers : {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        }
        
      }
      const loginFetch = await fetch(API, loginOptions)
      const loginRes = await loginFetch.json()
      if(loginFetch.ok){
        Cookies.set("jwt_token",loginRes.token,{expires : 1})
        setLoginError("")
        navigate('/')
      }else{
        setLoginError(loginRes.error)
      }

    }catch(e){
      console.log({error:e.message, "helo":"heh"})
    }
}

const onLogin = async (event) => {
    event.preventDefault()
    onSuccessLogin()
    
}

const onCreateAccount = async (event) =>{
  event.preventDefault()
  try{
     const API = 'http://localhost:3000/register'
      const newUserDetails = {
        name : userDetails.name,
        email : userDetails.email,
        password : userDetails.password,
        role : userDetails.role
      }
      const options = {
        method : 'POST',
        body : JSON.stringify(newUserDetails),
        headers : {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        }
      }
      const response = await fetch(API, options)
      const responseData = await response.json()
      if(response.ok){
        setLoginError("")
        onSuccessLogin() 
      }else{
        setLoginError(responseData.error)
      }

  }catch(e){
    console.log({error : e.message})
  }

}

const onUpdateName = (e) => setUserDetails(pre => ({...pre, name : e.target.value}))
const onUpdateEmail = (e) => setUserDetails(pre => ({...pre, email : e.target.value}))
const onUpdatePassword = (e) => setUserDetails(pre => ({...pre, password : e.target.value}))
const onUpdateRole = (e) => setUserDetails(pre => ({...pre, role : e.target.value}))

const toggleCards = () => {
  switchCards(pre => !pre)
  setLoginError("")
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
      
      {showLoginCard ? 
      <form onSubmit={onLogin} className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {/* Email Input */}
        <div className="relative">
          <input
            onChange={onUpdateEmail}
            type="email"
            id="email"
            name="email"
            placeholder=" "
            required
            className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-blue-500"
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
          >
            Email
          </label>
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            onChange={onUpdatePassword}
            type="password"
            id="password"
            name="password"
            placeholder=" "
            required
            className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-blue-500"
          />
          <label
            htmlFor="password"
            className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
          >
            Password
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          Login
        </button>
         <button
          onClick={toggleCards}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          Create New Account
        </button>
        {loginError.length !== 0 && <p className="text-red-500">{loginError}</p>}
      </form>
      : 
      <form onSubmit={onCreateAccount} className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>
        {/* Name Input */}
        <div className="relative">
          <input
            onChange={onUpdateName}
            type="text"
            id="name"
            name="name"
            placeholder=" "
            required
            className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-blue-500"
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
          >
            Name
          </label>
        </div>
        {/* Email Input */}
        <div className="relative">
          <input
            onChange={onUpdateEmail}
            type="email"
            id="email"
            name="email"
            placeholder=" "
            required
            className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-blue-500"
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
          >
            Email
          </label>
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            onChange={onUpdatePassword}
            type="password"
            id="password"
            name="password"
            placeholder=" "
            required
            className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-blue-500"
          />
          <label
            htmlFor="password"
            className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
          >
            Password
          </label>
        </div>
        {/* role  */}
        <div className="relative">
          <select
            onChange={onUpdateRole}
            id="role"
            name="role"
            required
            className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-blue-500"
          >
            <option value="patient">Patient</option>
            <option value="caretaker">Caretaker</option>
          </select>
          <label
            htmlFor="name"
            className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
          >
            Role
          </label>
        </div>

        {/* create Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          Create New Account
        </button>
        <button
          onClick={toggleCards}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          Already Have Account Login Here
        </button>
        {loginError.length !== 0 && <p className="text-red-500">{loginError}</p>}
      </form>
      }
    </div>
  );
};

export default LoginPage;
