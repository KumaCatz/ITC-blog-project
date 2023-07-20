import '../css/TweetsList.css'

function TweetsList({ tweets }) {
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