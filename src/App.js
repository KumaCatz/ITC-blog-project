import './App.css';
import { useEffect, useState } from 'react';
import fetchTweet from './components/fetchTweet';
import tweetModel from './components/tweetModel';
import CreateTweet from './components/CreateTweet';
import Loading from './components/Loading';
import TweetsList from './components/TweetsList';

function App() {
  const [body, setBody] = useState('');
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://64b90fb679b7c9def6c0853b.mockapi.io/tweet');
        const data = await response.json();
        setTweets(data);
        setLoading(false);
      } catch(e) {
        console.log(e)
      }
    }
    fetchData();
  }, [])

  function handleChange(e) {setBody(e.target.value)}

  async function handleGenerate(e) {
    e.preventDefault();
    if (body == '') {return}
    setLoading(true);
    const newTweet = await fetchTweet(tweetModel('KumaCat', body));
    console.log(newTweet);

    setTweets([...tweets, newTweet]);
    setLoading(false);

  }

  return (
    <div className="App">
      <CreateTweet handleChange={ handleChange } handleGenerate={ handleGenerate } />
      {loading ? <Loading /> : null}
      <TweetsList tweets={ tweets } />
    </div>
  )
}

export default App;
