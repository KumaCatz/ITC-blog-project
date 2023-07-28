export default async function fetchTweet(tweet) {
    const url = new URL('https://64b90fb679b7c9def6c0853b.mockapi.io/tweet');
    url.searchParams.append('completed', false);
    url.searchParams.append('page', 1);
    url.searchParams.append('limit', 10);

    const response = await fetch(url, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(tweet)
    })
    const data = await response.json();
    return data;
}