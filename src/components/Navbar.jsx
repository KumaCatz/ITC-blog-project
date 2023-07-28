import { Link } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { TweetsContext } from "../App";

import { useState } from "react"; //example

function Navbar() {
    const {numberOfTweets} = useContext(TweetsContext);

    const [time, setTime] = useState(0) //also example
    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime((par) => par + 1)
        }, 1000);

        return () => {
            clearInterval(intervalID);
        }
    }, [])

    return (
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li>Tweets published so far: {numberOfTweets}</li>
                <li>seconds passed: {time}</li>
            </ul>
        </nav>

    )
}
export default Navbar