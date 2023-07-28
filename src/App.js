import { React, useEffect, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Home from './components/Home';
import Profile from './components/Profile';
import fetchTweet from './components/fetchTweet';

import './App.css';

export const TweetsContext = createContext(null);

function App() {
  const [loading, setLoading] = useState(true);
  const [tweetsList, setTweetsList] = useState([]);
  const [username, setUsername] = useState('KumaCat');
  const [formData, setFormData] = useState ({
    username: username || '',
    body: '',
    date: new Date().toISOString(),
  });
  const [disabled, setDisabled] = useState(false);
  const [numberOfTweets, setNumberOfTweets] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
          const response = await fetch('https://64b90fb679b7c9def6c0853b.mockapi.io/tweet');
          //remind myself to delete the key afterwards
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
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </TweetsContext.Provider>
  )
}

export default App