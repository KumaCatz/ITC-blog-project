const tweetModel = (username, body) => ({
    username: username,
    body: body,
    date: new Date().toString(),
});

export default tweetModel;