import { React } from 'react';
import FormData from './FormData';
import CreateTweet from './CreateTweet';
import Loading from './Loading';
import TweetsList from './TweetsList';
// import tweetModel from './tweetModel';

import '../css/Home.css'

const Home = (props) => {
    const loading = FormData();

    return (
        <div className="Home">
            <CreateTweet {...props} />
            {loading ? <Loading /> : null}
            <TweetsList />
        </div>
    )
}

export default Home