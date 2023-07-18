import { useState } from 'react';
import '../css/TextBox.css'
import tweetModel from './tweetModel';

function TextBox() {
    const [tweets, setTweets] = useState([]);
    const [id, setId] = useState(0);
    
    function handleGenerate() {
        const newTweet = tweetModel()
        setTweets(...tweets, )
    }

    return (
        <div className='container'>
            <textarea placeholder="What you have in mind..."></textarea>
            <button onClick='handleGenerate'>Tweet</button>
        </div>
    )
};

export default TextBox;