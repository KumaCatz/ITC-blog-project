import { useContext } from 'react';
import { TweetsContext } from '../App';

import '../css/TweetsList.css';

function TweetsList() {
    const {tweetsList} = useContext(TweetsContext);

    if (tweetsList.length == 0) return;

    const updatedTweetsList = tweetsList.map(tweet =>
        <div key={ tweet.id } className='tweet'>
            <header>
                <div>{ tweet.username }</div>
                <div>{ tweet.date }</div>
            </header>
            <div>{ tweet.body }</div>
        </div>
    ).reverse();

    return <div>{ updatedTweetsList }</div>;
}

export default TweetsList