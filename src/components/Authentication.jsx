import React, {useReducer, useState} from "react";
import { useNavigate } from "react-router-dom";
import getData from "./getData";
import RegisterModal from "./RegisterModal";
import endpoint from "../data/endpoint";
import { loginReducer, loginReducerActions } from "../reducers/loginReducer";

function Authentication({setIsUser, setUserData}) {
  const [users, dispatchLoginChanges] = useReducer(loginReducer, [])
  const [loginData, setLoginData] = useState({}) 
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    const users = await getData(endpoint.users)

    for (const user of users) {
      if (loginData.username == user.username) {
        if (loginData.password == user.password) {
          setIsUser(true)
          localStorage.setItem('isUser', true);
          navigate('/home')
        }
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
      <form>
        <div>Blog 3000</div>
        <input type='text' placeholder='username' name='username' onChange={(e) => handleLoginInput(e.target.value, 'username')} className='shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        <input type='text' placeholder='password' onChange={(e) => handleLoginInput(e.target.value, 'password')} className='shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">enter</button>
      </form>
      <RegisterModal />
      <button onClick={() => localStorage.clear()}>clear cache</button>
    </>
  )
}

export default Authentication