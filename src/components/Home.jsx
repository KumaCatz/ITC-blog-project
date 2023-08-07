import React from 'react';
import CreateTweet from './CreateTweet';
import TweetsList from './TweetsList';

import '../css/Home.css'

const Home = () => {

  return (
    <div className="Home">
      <CreateTweet />
      <div>What's on your mind?</div>
      <TweetsList />
    </div>
  )
}

export default Home