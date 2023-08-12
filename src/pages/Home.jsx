import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import CreateTweet from '../components/CreateTweet';
import TweetsList from '../components/TweetsList';

import '../css/Home.css'

const Home = () => {

  return (
    <div className="Home">
      <CreateTweet />
      <TweetsList />
    </div>
  )
}

export default Home