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
      <div className='flex flex-row justify-around my-6'>
            <Link to='/home'><button className='rounded-sm bg-teal-800 w-64'>Home</button></Link>
            <Link to='/profile'><button className='rounded-sm bg-teal-800 w-64'>Profile</button></Link>
            <div className='rounded-sm bg-sky-700 w-64 text-center'>Tweets published so far: {numberOfTweets}</div>
            <button className='rounded-sm bg-sky-700 w-64 text-center' onClick={handleLogout}>Logout</button>
      </div>
    )
}
export default Navbar