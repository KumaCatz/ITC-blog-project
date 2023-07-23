export default async function fetchTweet(tweet) {
    const url = 'https://64b90fb679b7c9def6c0853b.mockapi.io/tweet';

    const response = await fetch(url, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(tweet)
    })
    const data = await response.json();
    return data;
}