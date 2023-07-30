import { useContext, useRef } from 'react';
import { TweetsContext } from '../App';
import Loading from './Loading';

import '../css/TweetsList.css';

function TweetsList() {
    const {tweetsList, loading} = useContext(TweetsContext);
    console.log(tweetsList)
    if (tweetsList.length == 0) return;


    return (
        <>
            {tweetsList.map(tweet => {
                // if (tweetsList.length === index + 1) {
                //     return <div ref={ lastTweetElementRef}></div>
                // }
                <div key={ tweet.id } className='tweet'>
                <header>
                    <div>{ tweet.username }</div>
                    <div>{ tweet.date }</div>
                </header>
                <div>{ tweet.body }</div>
                </div>
                }).reverse()}
            {loading ? <Loading /> : null}
        </>
    );
}

export default TweetsList