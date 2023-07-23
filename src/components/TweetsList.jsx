import { useEffect } from 'react';
import FormData from './FormData';

import '../css/TweetsList.css'

function TweetsList() {
    const { tweets, setTweets, setLoading } = FormData();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://64b90fb679b7c9def6c0853b.mockapi.io/tweet');
                //remind myself to delete the key afterwards
                const data = await response.json();
                console.log(data)
                setTweets(data);
                setLoading(false);
            } catch(e) {
                console.log(e)
            }};
        fetchData();
    }, [setTweets, setLoading])

    if (tweets.length == 0) return;

    const tweetList = tweets.map(tweet =>
        <div key={ tweet.id } className='tweet'>
            <header>
                <div>{ tweet.username }</div>
                <div>{ tweet.date }</div>
            </header>
            <div>{ tweet.body }</div>
        </div>
    ).reverse();

    return <div>{ tweetList }</div>;
}

export default TweetsList