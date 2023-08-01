import { React, useContext, useRef, useCallback } from 'react';
import { TweetsContext } from '../App';
import Loading from './Loading';

import '../css/TweetsList.css';

function TweetsList() {
  const { tweetsList, loading, hasMore, setPageNumber } = useContext(TweetsContext);

  const observer = useRef()
  const lastTweetElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(previousPageNumber => previousPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore, setPageNumber])

  if (tweetsList.length == 0) return null

  return (
    <>
      {loading ? <Loading /> : null}
      {tweetsList.map((tweet, index) => {
        if (index == tweetsList.length - 1) {
            return <div ref={ lastTweetElementRef } key={ index } className='tweet'>
              <header>
                <div>{ tweet.username }</div>
                <div>{ tweet.date }</div>
              </header>
              <div>{ tweet.body }</div>
            </div>
        } else {
        return (
          <div key={ index } className='tweet'>
          <header>
            <div>{ tweet.username }</div>
            <div>{ tweet.date }</div>
          </header>
          <div>{ tweet.body }</div>
          </div>
        )
        }
      })}
      {loading ? <Loading /> : null}
    </>
  )
}

export default TweetsList