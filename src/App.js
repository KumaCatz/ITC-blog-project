import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Authentication from './pages/Authentication';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NoMatch from './pages/NoMatch';
import getData from './components/getData';
import postData from './components/postData';
import { TweetsContext } from './contexts/TweetsContext';
import { UserContext } from './contexts/UserContext';
import { tweetURL } from './data/constants';
import date from './data/date';

// nextStep: change userData to a reducer, so I can change in the login/register and profile pages without changing setUserData and exporting manually all the time

function App() {
  const [isUser, setIsUser] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [tweetsList, setTweetsList] = useState([]);
  const [username, setUsername] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [numberOfTweets, setNumberOfTweets] = useState(0);
  const [pageNumber, setPageNumber] = useState(1)
  const [isMore, setIsMore] = useState(false)
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

  const url = new URL(tweetURL)
  url.searchParams.append('sortBy', 'date');
  url.searchParams.append('order', 'desc');
  url.searchParams.append('completed', false);
  url.searchParams.append('page', pageNumber);
  url.searchParams.append('limit', 10);
  

  async function firstTweet() {
    const response = await fetch(url)
    const data = await response.json()
    if (data != '') {setNumberOfTweets(data[0].id)}
  }

  useEffect(() => {
    firstTweet()
  }, [])

  async function getMoreTweets() {
    setIsLoading(true)
    try {
      const data = await getData(url)
      setTweetsList(prevTweets => {
          return [...prevTweets, ...data]
        });
      setIsLoading(false)
      setIsMore(data.length > 0)  
    } catch(error) {
      alert(error)
    }
  }

  useEffect(() => {
    getMoreTweets()
  }, [pageNumber])

  useEffect(() => {
    if (localStorage.length != 0) {
      const isUser = localStorage.getItem('isUser')
      setIsUser(isUser)
      const userData = JSON.parse(localStorage.getItem('userData'))
      setUserData(userData)
      // console.log(localStorage)
    }
  }, [])

  useEffect(() => {
    setFormData((pre)=> {
      return {
        ...pre,
        username: userData.username
      }
    })
  }, [userData])

  
  const handleNewTweet = async (e) => {
    e.preventDefault();
    if (formData.body == '') {return}

    setIsLoading(true);
    const newTweet = await postData('https://64b90fb679b7c9def6c0853b.mockapi.io/tweet', formData);
    setNumberOfTweets(newTweet.id);
    setTweetsList([newTweet, ...tweetsList]);
    setIsLoading(false);
  }

  const handleChangeProfile = async (e) => {
    e.preventDefault();

    if (e.target.name == 'change-profile') {
      setFormData((pre) => {
        return {
          ...pre,
          'username': username
        }
      })
      console.log(formData)
    }
  }

  const handleInput = (e) => {
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
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
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
        isDisabled,
        isLoading,
        numberOfTweets,
        formData,
        pageNumber,
        isMore,
        username,
        setIsUser,
        setFormData,
        setPageNumber,
        handleInput,
        handleNewTweet,
        handleChangeProfile}}>
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