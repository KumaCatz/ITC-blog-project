import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import CreateTweet from './CreateTweet';
import TweetsList from './TweetsList';

import '../css/Home.css'

const Home = () => {
  const {userData} = useContext(UserContext)

  return (
    <div className="Home">
      <div>Hey {userData.username}!</div>
      <CreateTweet />
      <TweetsList />
    </div>
  )
}

export default Home