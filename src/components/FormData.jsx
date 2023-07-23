import { useState, useEffect } from "react";
import fetchTweet from "./fetchTweet";

const FormData = () => {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tweets, setTweets] = useState([]);
    const initialForm = {
        username: 'KumaCat',
        body: '',
        date: new Date().toISOString(),
    };
    const [tweetData, setTweetData] = useState(initialForm);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setTweetData({
            ...tweetData,
            [name]: value,
        })
        if (value.length == 140) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (tweetData.body == '') {return}
        setLoading(true);
        const newTweet = await fetchTweet(tweetData);

        setTweets([...tweets, newTweet]);
        setLoading(false);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://64b90fb679b7c9def6c0853b.mockapi.io/tweet');
                //remind myself to delete the key afterwards
                const data = await response.json();
                setTweets(data);
                setLoading(false);
            } catch(e) {
                console.log(e)
            }};
        fetchData();
    }, [])

    return {
        tweets,
        loading,
        disabled,
        tweetData,
        handleChange,
        handleSubmit,
    }
}

export default FormData;