import { useState, useContext } from 'react';
import FormData from './FormData';

import '../css/TweetsList.css';

import { TweetsListContext } from '../App';

function TweetsList() {
    const tweetsList = useContext(TweetsListContext);

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