import { React, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Authentication from './components/Authentication';
import Home from './components/Home';
import Profile from './components/Profile';
import NoMatch from './components/NoMatch';
import postData from './components/postData';
import date from './data/date';

import './App.css';

import { TweetsContext } from './contexts/TweetsContext';

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

  const navigate = useNavigate()

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
    if (name == 'change-username') {
      setFormData((pre) => {
        return {
          ...pre,
          'username': username
        }
      })
      console.log(formData)
    }
    if (name == 'register-user') {
      if (userData.password == '' || userData.username == '') {return}
      console.log(userData)
      const newUser = await postData('https://64b90fb679b7c9def6c0853b.mockapi.io/user', userData);
      setIsUser(true)
      localStorage.setItem('isUser', true);
      navigate('/home')
      setFormData((pre) => {
        return {
          ...pre,
          'username': userData.username
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
      <TweetsContext.Provider value={{tweetsList,
        disabled,
        loading,
        numberOfTweets,
        formData,
        pageNumber,
        hasMore,
        userData,
        setIsUser,
        setUserData,
        setPageNumber,
        handleSubmit,
        handleChange}}>
        {isUser ? <Navbar /> : null}
        <Routes>
          <Route index element={<Authentication
          isUser= {isUser}
          setIsUser={setIsUser} />} />
          {isUser ? <Route path='/home' element={<Home />} /> : null }
          {isUser ? <Route path='/profile' element={<Profile />} /> : null }
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </TweetsContext.Provider>
  )
}

export default App