export default async function fetchTweet(tweet) {

    const response = await fetch(url, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(tweet)
    })
    const data = await response.json();
    return data;
}