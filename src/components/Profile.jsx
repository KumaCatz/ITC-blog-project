import FormData from './FormData';

function Profile() {
    const { tweetData, handleChange, handleSubmit } = FormData();

    return (
        <div>
            <h1>Profile</h1>
            <h2>User Name</h2>
            <form name='username'
            onSubmit={ handleSubmit }>
                <input type='text'
                name='username'
                value={ tweetData.username }
                onChange={ handleChange } />
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default Profile