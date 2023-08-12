import { Link } from 'react-router-dom';
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TweetsContext } from "../contexts/TweetsContext";

function Navbar() {
  const {numberOfTweets, setIsUser} = useContext(TweetsContext);
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.clear()
    setIsUser(false)
    navigate('..')
  }

  return (
    <ul className='flex flex-row justify-around my-6'>
      <li className='mr-6'>
        <div className='text-black text-xl font-bold'>Tweets published so far: {numberOfTweets}</div>
      </li>
      <li className='mr-6'>
        <Link to='/home'><button className='text-blue-800 hover:text-blue-900 text-xl font-bold'>Home</button></Link>
      </li>
      <li className='mr-6'>
        <Link to='/profile'><button className='text-blue-800 hover:text-blue-900 text-xl font-bold'>Profile</button></Link>
      </li>
      <li>
        <button className='text-red-500 hover:text-red-800 text-xl font-bold' onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  )
}
export default Navbar