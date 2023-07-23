import { useEffect } from 'react';
import FormData from './FormData';

import '../css/TweetsList.css'

function TweetsList() {
    const tweets = FormData();
    useEffect(() => {
    console.log('hi')    })
    console.log('hi')

    // const tweetList = tweets.map(tweet =>
    //     <div key={ tweet.id } className='tweet'>
    //         <header>
    //             <div>{ tweet.username }</div>
    //             <div>{ tweet.date }</div>
    //         </header>
    //         <div>{ tweet.body }</div>
    //     </div>
    // ).reverse();

    // return <div>{ tweetList }</div>;

    return (
        <>
            {tweets.map(tweet =>
        <div key={ tweet.id } className='tweet'>
            <header>
                <div>{ tweet.username }</div>
                <div>{ tweet.date }</div>
            </header>
            <div>{ tweet.body }</div>
        </div>
    ).reverse()}
        </>
    )
}

export default TweetsList