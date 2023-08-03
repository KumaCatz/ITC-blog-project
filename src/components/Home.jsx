import { React, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TweetsContext } from "../App";
import CreateTweet from './CreateTweet';
import TweetsList from './TweetsList';

import '../css/Home.css'

const Home = () => {
  const {setIsUser} = useContext(TweetsContext);
  const navigate = useNavigate()

  function handleExit() {
    localStorage.clear()
    setIsUser(false)
    navigate('..')
  }

  return (
    <div className="Home">
      <button onClick={handleExit}>exit</button>
      <CreateTweet />
      <TweetsList />
    </div>
  )
}

export default Home