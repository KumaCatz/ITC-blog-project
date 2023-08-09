import { React, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Authentication from './components/Authentication';
import Home from './components/Home';
import Profile from './components/Profile';
import NoMatch from './components/NoMatch';
import getData from './components/getData';
import postData from './components/postData';
import { TweetsContext } from './contexts/TweetsContext';
import { UserContext } from './contexts/UserContext';
import date from './data/date';

import './App.css';

// nextStep: change userData to a reducer, so I can change in the login/register and profile pages without changing setUserData and exporting manually all the time

function App() {
  const [isUser, setIsUser] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tweetsList, setTweetsList] = useState([]);
  const [username, setUsername] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [numberOfTweets, setNumberOfTweets] = useState();
  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [formData, setFormData] = useState ({
    username: username || '',
    body: '',
    date: '',
  });
  const [userData, setUserData] = useState({
    id: '',
    username: '',
    password: '',
  })

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
  }, [tweetsList])

  useEffect(() => {
    (async () => {
      setLoading(true)
      const data = await getData(url)
      setTweetsList(prevTweets => {
          return [...prevTweets, ...data]
        });
      setLoading(false)
      setHasMore(data.length > 0)
    })()
  }, [pageNumber])

  useEffect(() => {
    if (localStorage.length != 0) {
      const isUser = localStorage.getItem('isUser')
      setIsUser(isUser)  
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name} = e.target;

    if (name == 'tweet') {
      if (formData.body == '') {return}

      setLoading(true);
      const newTweet = await postData('https://64b90fb679b7c9def6c0853b.mockapi.io/tweet', formData);
      setNumberOfTweets(newTweet.id);
      setTweetsList([newTweet, ...tweetsList]);
      setLoading(false);
    }
    if (name == 'change-profile') {
      setFormData((pre) => {
        return {
          ...pre,
          'username': username
        }
      })
      console.log(formData)
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    if (name == 'body') {
      setFormData((pre) => {
        return {
          ...pre,
          [name]: value,
          date: date(),
        }
      })
      if (value.length == 140) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }  
    }
    if (name == 'change-username') {
      setUsername(value);
    }
    if (name == 'register-username') {
      setUserData((pre) => {
        return {
          ...pre,
          'username': value
        }
      })
    }
    if (name == 'register-password') {
      setUserData((pre) => {
        return {
          ...pre,
          'password': value
        }
      })
    }
  }

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <TweetsContext.Provider value={{tweetsList,
        disabled,
        loading,
        numberOfTweets,
        formData,
        pageNumber,
        hasMore,
        username,
        setIsUser,
        setFormData,
        setPageNumber,
        handleSubmit,
        handleChange}}>
        {isUser ? <Navbar /> : null}
        <Routes>
          <Route index element={<Authentication
          isUser= {isUser}
          setIsUser={setIsUser}
          setUserData={setUserData} />} />
          {isUser ? <Route path='/home' element={<Home />} /> : null }
          {isUser ? <Route path='/profile' element={<Profile />} /> : null }
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </TweetsContext.Provider>
    </UserContext.Provider>
  )
}

export default App