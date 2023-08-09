import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import getData from "./getData";
import RegisterModal from "./RegisterModal";
import endpoint from "../data/endpoint";

function Authentication({setIsUser}) {
  const {userData} = useContext(UserContext)
  const [loginData, setLoginData] = useState({}) 
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    const users = await getData(endpoint.users)

    for (const user of users) {
      if (loginData.username == user.username && loginData.password == user.password) {
        setIsUser(true)
        localStorage.setItem('isUser', true);
        userData = 
        navigate('/home')
      } else {
        setLoginError('whoops, username/password error :(')
      }
    }
  }

  const handleLoginInput = (value, key) => {
    setLoginData((pre) => {
        return {
            ...pre,
            [key]: value
        }
    })
  }
  return (
    <>
      <div className="bg-white shadow-md rounded px-8 w-1/2 pb-6 pt-4 mt-6 mx-auto flex flex-col justify-center items-center">
        <form className="flex flex-col justify-center items-center">
          <div className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">Blog 3000</div>
          <div className="mb-4">
            <input type='text' placeholder='Username' name='username' onChange={(e) => handleLoginInput(e.target.value, 'username')} className='shadow appearance-none text-center border rounded py-2 px-3 text-gray-700 leading-tight focus:placeholder-white' />
          </div>
          <div className="mb-4">
            <input type='text' placeholder='Password' onChange={(e) => handleLoginInput(e.target.value, 'password')} className='shadow appearance-none border rounded text-center py-2 px-3 text-gray-700 leading-tight focus:placeholder-white' />
          </div>

          <button onClick={handleLogin} className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150">Login</button>
        </form>
        <div className="text-red-500">{loginError}</div>
        <RegisterModal />
      </div>
      <button onClick={() => localStorage.clear()}>clear cache</button>
    </>
  )
}

export default Authentication