import './App.css';
import { useState } from 'react';
import tweetModel from './components/tweetModel';
import CreateTweet from './components/CreateTweet';
import TweetsList from './components/TweetsList';

function App() {
  const [body, setBody] = useState('');
  const [id, setId] = useState(0);
  const [tweets, setTweets] = useState([]);

  function handleChange(e) {setBody(e.target.value)}

  function handleGenerate() {
    const newTweet = tweetModel(id, 'KumaCat', body);

    setTweets([...tweets, newTweet]);
    setId(id + 1);
  }

  return (
    <div className="App">
      <CreateTweet handleChange={ handleChange } handleGenerate={ handleGenerate } />
      <TweetsList tweets={ tweets } />
    </div>
  )
}

export default App;
