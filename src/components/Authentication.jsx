import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

function Authentication({setIsUser}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
      <input type='text' placeholder='username' name='username' onChange={ (e) => setUsername(e.target.value) } />
      <input type='text' placeholder='password' />
      <button onClick={userValidation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">enter</button>
    </form>
    <button onClick={() => localStorage.clear()}>clear cache</button>
    </>
  )
}

export default Authentication