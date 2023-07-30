import { React, useEffect, useState, useContext, useRef, useCallback } from 'react';
import { TweetsContext } from '../App';
import Loading from './Loading';
import useTweetSearch from './useTweetSearch';

import '../css/TweetsList.css';

function TweetsList() {
  const {tweetsList, loading, setLoading} = useContext(TweetsContext);
  console.log(tweetsList)


  const url = 'https://64b90fb679b7c9def6c0853b.mockapi.io/tweet'//
  const observer = useRef()
  const [pageNumber, setPageNumber] = useState(1)
  const { error, hasMore } = useTweetSearch(pageNumber)
  const lastTweetElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Visible')
        setPageNumber(previousPageNumber => previousPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
    console.log(node)
  }, [loading, hasMore])


  if (tweetsList.length == 0) return;

  return (
    <>
      {loading ? <Loading /> : null}
      {tweetsList.map((tweet, index) => {
        if (index === 0) {
            return <div ref={ lastTweetElementRef } className='tweet'>
              <header>
                <div>{ tweet.username }</div>
                <div>{ tweet.date }</div>
              </header>
              <div>{ tweet.body }</div>
            </div>
        } else {
        return (
          <div key={ tweet.id } className='tweet'>
          <header>
            <div>{ tweet.username }</div>
            <div>{ tweet.date }</div>
          </header>
          <div>{ tweet.body }</div>
          </div>
        )
        }
      }).reverse()}
    </>
  );
}

export default TweetsList