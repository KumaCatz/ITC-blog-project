
function Profile({ handleChange, handleSubmit, tweetForm }) {

    return (
        <div>
            <h1>Profile</h1>
            <h2>User Name</h2>
            <form name='username'
            onSubmit={ handleSubmit }>
                <input type='text'
                name='username'
                value={ tweetForm.username }
                onChange={ handleChange } />
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default Profile