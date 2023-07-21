import '../css/CreateTweet.css'

function CreateTweet({ handleChange, handleGenerate, disabled }) {

    return (
        <form>
            <div className='container'>
                <textarea placeholder="What you have in mind..." maxLength={ 140 } onChange={ handleChange }></textarea>
                <input type='submit' value='Tweet' disabled={ disabled } onClick={ handleGenerate } />
            </div>
        </form>
    )
};

export default CreateTweet;