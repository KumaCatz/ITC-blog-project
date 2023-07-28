import { React } from 'react';
import { useContext } from "react";
import { TweetsContext } from "../App";
import CreateTweet from './CreateTweet';
import Loading from './Loading';
import TweetsList from './TweetsList';

import '../css/Home.css'

const Home = () => {
    const {loading} = useContext(TweetsContext);

    return (
        <div className="Home">
            <CreateTweet />
            {loading ? <Loading /> : null}
            <TweetsList />
        </div>
    )
}

export default Home