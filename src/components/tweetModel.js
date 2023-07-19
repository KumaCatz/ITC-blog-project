const tweetModel = (id, username, body) => ({
    id: id,
    username: username,
    body: body,
    date: new Date().toString(),
});

export default tweetModel;