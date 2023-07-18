import './App.css';
import { useState } from 'react';
import tweetModel from './components/tweetModel';
import TextBox from './components/TextBox';
import GenerateTweet from './components/GenerateTweet';

function App() {
  const [tweets, setTweets] = useState([]);
  const [id, setId] = useState(0);

  function handleGenerate(e) {
    const { value } = e.target;

    const newTweet = tweetModel(id, 'KumaCat', value);
    console.log(newTweet)
    setTweets([...tweets, newTweet]);
    setId(id++);
  }

  return (
    <div className="App">
      <TextBox handleGenerate={ handleGenerate } />
      <GenerateTweet />
    </div>
  );
}

export default App;
