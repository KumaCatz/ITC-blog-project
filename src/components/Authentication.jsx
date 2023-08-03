import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./RegisterModal";

function Authentication({setIsUser}) {
  const navigate = useNavigate()

  function userValidation(e) {
    e.preventDefault()
    setIsUser(true)
    localStorage.setItem('isUser', true);
    navigate('/home')
  }

  return (
    <>
      <form>
        <div>Log In</div>
        <input type='text' placeholder='username' name='username' className='shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        <input type='text' placeholder='password' className='shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        <button onClick={userValidation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">enter</button>
      </form>
      <Modal />
      <button onClick={() => localStorage.clear()}>clear cache</button>
    </>
  )
}

export default Authentication