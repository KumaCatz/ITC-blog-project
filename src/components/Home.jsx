import { React } from 'react';
import CreateTweet from './CreateTweet';
import TweetsList from './TweetsList';

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