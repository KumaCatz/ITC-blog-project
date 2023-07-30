import { React, useEffect, useState, createContext, useRef, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import useTweetSearch from './components/useTweetSearch';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import fetchTweet from './components/fetchTweet';

import './App.css';

export const TweetsContext = createContext(null);

function App() {
  const [loading, setLoading] = useState(false);
  const [tweetsList, setTweetsList] = useState([]);
  const [username, setUsername] = useState('KumaCat');
  const [formData, setFormData] = useState ({
    username: username || '',
    body: '',
    date: new Date().toISOString(),
  });
  const [disabled, setDisabled] = useState(false);
  const [numberOfTweets, setNumberOfTweets] = useState();

  const observer = useRef()
  const [pageNumber, setPageNumber] = useState(1);
  const { error, hasMore } = useTweetSearch(pageNumber)


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url)
        const data = await response.json();
        setNumberOfTweets(data.length);
        setTweetsList(data);
        setLoading(false);
      } catch(e) {
          console.log(e)
      }};
    fetchData();
  }, [setTweetsList, setLoading])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name} = e.target;

    if (name == 'tweet') {
      if (formData.body == '') {return}

      setLoading(true);
      setPageNumber(1);
      const newTweet = await fetchTweet(formData);
      setNumberOfTweets(newTweet.id);
      setTweetsList([...tweetsList, newTweet]);
      setLoading(false);
    }
    if (name == 'username') {
      setFormData((pre) => {
        return {
          ...pre,
          [name]: username
        }
      })
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    if (name == 'body') {
      setFormData((pre) => {
        return {
          ...pre,
          [name]: value
        }
      })
      if (value.length == 140) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }  
    }
    if (name == 'username') {
      setUsername(value);
    }
  }

  return (
      <TweetsContext.Provider value={{tweetsList,
        disabled,
        loading,
        numberOfTweets,
        formData,
        handleSubmit,
        handleChange}}>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </TweetsContext.Provider>
  )
}

export default App