import { React, useContext, useRef, useCallback } from 'react';
import { TweetsContext } from "../contexts/TweetsContext";
import LoadingList from './LoadingList';
import LoadingTweet from './LoadingTweet';

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
    <div className='flex flex-col items-center space-y-4'>
      {loading ? <LoadingTweet /> : null}
      {tweetsList.map((tweet, index) => {
        if (index == tweetsList.length - 1) {
            return <div ref={ lastTweetElementRef } key={ index } className='bg-white p-4 rounded-lg shadow-lg w-1/2'>
              <header>
                <div className='text-lg font-bold'>{ tweet.username }</div>
                <div>{ tweet.date }</div>
              </header>
              <div>{ tweet.body }</div>
            </div>
        } else {
        return (
          <div key={ index } className='bg-white p-4 rounded-lg shadow-lg w-1/2'>
          <header>
            <div className='text-lg font-bold'>{ tweet.username }</div>
            <div>{ tweet.date }</div>
          </header>
          <div>{ tweet.body }</div>
          </div>
        )
        }
      })}
      {loading ? <LoadingList /> : null}
    </div>
  )
}

export default TweetsList