import { React, useEffect, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Profile from './components/Profile';
import fetchTweet from './components/fetchTweet';

import './App.css';

export const TweetsListContext = createContext(null);

function App() {
  const [loading, setLoading] = useState(true);
  const [tweetsList, setTweetsList] = useState([]);
  const initialForm = {
    username: 'KumaCat',
    body: '',
    date: new Date().toISOString(),
  };
  const [tweetForm, setTweetForm] = useState(initialForm); //former 'tweetData'
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
          const response = await fetch('https://64b90fb679b7c9def6c0853b.mockapi.io/tweet');
          //remind myself to delete the key afterwards
          const data = await response.json();
          setTweetsList(data);
          setLoading(false);
      } catch(e) {
          console.log(e)
      }};
    fetchData();
  }, [setTweetsList, setLoading])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tweetForm.body == '') {return}
    setLoading(true);
    const newTweet = await fetchTweet(tweetForm);

    setTweetsList([...tweetsList, newTweet]);
    setLoading(false);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    setTweetForm({
        ...tweetForm,
        [name]: value,
    })
    if (value.length == 140) {
        setDisabled(true)
    } else {
        setDisabled(false)
    }
  }


  return (
      <TweetsListContext.Provider value={ tweetsList }>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home tweetsList={ tweetsList }
              tweetForm={ tweetForm }
              setTweetForm={ setTweetForm } 
              disabled={ disabled }
              setDisabled={ setDisabled }
              handleSubmit={ handleSubmit }
              handleChange={ handleChange } />}
            />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </TweetsListContext.Provider>
  )
}

export default App;
