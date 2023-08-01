import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useTweetSearch(pageNumber) {
    const url = 'https://64b90fb679b7c9def6c0853b.mockapi.io/tweet'

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [tweetsList, setTweetsList] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: url,
            params: { page: pageNumber },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setTweetsList(prevTweets => {
                return [...prevTweets, ...res.data]
            })
            setHasMore(res.data > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [pageNumber])
    return { loading, error, tweetsList, hasMore }
}

//dont need this now honestly