const tweetModel = (id, username, body) => ({
    [id]:
        {username: username,
        body: body,
        date: new Date(),}
});

export default tweetModel;