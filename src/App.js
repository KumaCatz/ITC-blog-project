import './App.css';
import { useState, useEffect } from 'react';
import tweetModel from './components/tweetModel';
import CreateTweet from './components/CreateTweet';
import TweetsList from './components/TweetsList';

function App() {
  let storedTweets = JSON.parse(localStorage.getItem('tweets'));
  let storedId = JSON.parse(localStorage.getItem('id'));
  if (storedTweets == null || storedId == null) {
    storedTweets = [];
    storedId = 0;
  }
  const [body, setBody] = useState('');
  const [id, setId] = useState(storedId);
  const [tweets, setTweets] = useState(storedTweets);

  function handleCache() {
    localStorage.clear()
  }

  function handleChange(e) {setBody(e.target.value)}

  function handleGenerate() {
    const newTweet = tweetModel(id, 'KumaCat', body);

    setTweets([...tweets, newTweet]);
    setId(id + 1);
  }

  useEffect(() => {
    localStorage.setItem('tweets', JSON.stringify(tweets))
    localStorage.setItem('id', JSON.stringify(id))
  }, [ tweets, id ])

  return (
    <div className="App">
      <button onClick={ handleCache } >clear cache</button>
      <CreateTweet handleChange={ handleChange } handleGenerate={ handleGenerate } />
      <TweetsList tweets={ tweets } />
    </div>
  )
}

export default App;
