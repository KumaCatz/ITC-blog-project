import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import getData from "../components/getData";
import RegisterModal from "../components/RegisterModal";
import endpoint from "../data/endpoint";

function Authentication({setIsUser}) {
  const {setUserData} = useContext(UserContext)
  const [loginData, setLoginData] = useState({}) 
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    const errorMsg = 'whoops, username/password error :('
    const users = await getData(endpoint.users)
    console.log(users)
    if (users.length == 0) setLoginError(errorMsg)

    for (const user of users) {
      if (loginData.username == user.username && loginData.password == user.password) {
        setIsUser(true)
        localStorage.setItem('isUser', true);
        setUserData({
          id: loginData.id,
          username: loginData.username,
          password: loginData.password,
        })
        localStorage.setItem('userData', JSON.stringify({
          id: loginData.id,
          username: loginData.username,
          password: loginData.password,
        }))
        navigate('/home')
      } else {
        setLoginError(errorMsg)
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

  useEffect(() => {
    // console.log('before if statement')
    // console.log('localStorage', localStorage)
    if(localStorage.getItem('isUser') == 'true') {
      navigate('/home')
      // console.log('automatic-login')
    }
  }, [])

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 w-1/3 pb-6 pt-4 mt-6 mx-auto flex flex-col justify-center items-center">
        <form className="flex flex-col justify-center items-center">
          <div className="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">Blog 3000</div>
          <div className="m-4">
            <input type='text' placeholder='Username' name='username' onChange={(e) => handleLoginInput(e.target.value, 'username')} className='shadow appearance-none text-center border rounded py-2 px-3 text-gray-700 leading-tight focus:placeholder-white' />
          </div>
          <div className="m-4">
            <input type='password' placeholder='Password' onChange={(e) => handleLoginInput(e.target.value, 'password')} className='shadow appearance-none text-center border rounded py-2 px-3 text-gray-700 leading-tight focus:placeholder-white' />
          </div>

          <button onClick={handleLogin} className="bg-blue-500 m-4 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150">Login</button>
        </form>
        <div className="text-red-500">{loginError}</div>
        <RegisterModal />
      </div>
      <button onClick={() => localStorage.clear()}>clear cache</button>
    </>
  )
}

export default Authentication