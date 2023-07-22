import { React, useState, useEffect } from 'react';
import CreateTweet from './CreateTweet';
import Loading from './Loading';
import TweetsList from './TweetsList';
import fetchTweet from './fetchTweet';
import tweetModel from './tweetModel';

import '../css/Home.css'

const Home = () => {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [body, setBody] = useState('');
    const [tweets, setTweets] = useState([]);
  
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://64b90fb679b7c9def6c0853b.mockapi.io/tweet');
                const data = await response.json();
                setTweets(data);
                setLoading(false);
            } catch(e) {
                console.log(e)
            }};
        fetchData();
    }, [])

    function handleChange(e) {
        setBody(e.target.value);
        if(e.target.value.length == 140) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }
    
    async function handleGenerate(e) {
        e.preventDefault();
        if (body == '') {return}
        setLoading(true);
        const newTweet = await fetchTweet(tweetModel('KumaCat', body));

        setTweets([...tweets, newTweet]);
        setLoading(false);
    }

    return (
        <div className="Home">
            <CreateTweet handleChange={ handleChange } disabled={ disabled } handleGenerate={ handleGenerate } />
            {loading ? <Loading /> : null}
            <TweetsList tweets={ tweets } />
        </div>
    )
}

export default Home