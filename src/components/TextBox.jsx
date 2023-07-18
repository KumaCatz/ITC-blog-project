import { useState } from 'react';
import '../css/TextBox.css'
import tweet from './tweet';

function TextBox() {
    const [tweets, setTweets] = useState([])
    function handleGenerate() {
        
    }

    return (
        <div className='container'>
            <textarea placeholder="What you have in mind..."></textarea>
            <button onClick='handleGenerate'>Tweet</button>
        </div>
    )
};

export default TextBox;