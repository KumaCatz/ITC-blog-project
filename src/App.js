import { React, useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Authentication from './components/Authentication';
import Home from './components/Home';
import Profile from './components/Profile';
import fetchTweet from './components/fetchTweet';
import dateContext from './contexts/dateContext';

import './App.css';

export const TweetsContext = createContext(null);

function App() {
  console.log(localStorage)
  const [isUser, setIsUser] = useState(false)
  console.log(isUser)
  const [loading, setLoading] = useState(false);
  const [tweetsList, setTweetsList] = useState([]);
  const [username, setUsername] = useState('KumaCat');
  const [disabled, setDisabled] = useState(false);
  const [numberOfTweets, setNumberOfTweets] = useState();
  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [formData, setFormData] = useState ({
    username: username || '',
    body: '',
    date: '',
  });

  const url = new URL('https://64b90fb679b7c9def6c0853b.mockapi.io/tweet')
  url.searchParams.append('sortBy', 'date');
  url.searchParams.append('order', 'desc');
  url.searchParams.append('completed', false);
  url.searchParams.append('page', pageNumber);
  url.searchParams.append('limit', 10);

  useEffect(() => {
    async function firstTweet() {
      const response = await fetch(url)
      const data = await response.json()
      if (data != '') {setNumberOfTweets(data[0].id)}
    }
    firstTweet()
  }, [])

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {'content-type':'application/json'},
        })
        const data = await response.json()
        setTweetsList(prevTweets => {
            return [...prevTweets, ...data]
          });
        setLoading(false)
        setHasMore(data.length > 0)
      } catch(error) {
        console.log(error)
      }  
    })()
  }, [pageNumber])

  useEffect(() => {
    const isUser = JSON.stringify(localStorage.getItem('isUser'))
    if (isUser) {
      setIsUser(isUser)
    }
    console.log(isUser)
  }, [isUser])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name} = e.target;

    if (name == 'tweet') {
      if (formData.body == '') {return}

      console.log(formData)
      setLoading(true);
      const newTweet = await fetchTweet(formData);
      setNumberOfTweets(newTweet.id);
      setTweetsList([newTweet, ...tweetsList]);
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
          [name]: value,
          date: dateContext(),
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
        pageNumber,
        hasMore,
        setPageNumber,
        handleSubmit,
        handleChange}}>
        {isUser ? <Navbar /> : null}
        <Routes>
          <Route index element={<Authentication
            isUser= {isUser}
            setIsUser={setIsUser} />}
          />
          <Route path='/Home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </TweetsContext.Provider>
  )
}

export default App