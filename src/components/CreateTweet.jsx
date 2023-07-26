
// import '../css/CreateTweet.css'

function CreateTweet({ tweetForm, disabled, handleSubmit, handleChange }) {

    return (
        <form name='tweet'
        onSubmit={ handleSubmit }>
            <div className='container'>
                <textarea placeholder="What you have in mind..."
                name='body'
                value={ tweetForm.body }
                maxLength={ 140 }
                onChange={ handleChange }>
                </textarea>
                <input type='submit'
                value='Tweet'
                disabled={ disabled }/>
            </div>
        </form>
    )
};

export default CreateTweet;