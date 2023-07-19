import '../css/CreateTweet.css'

function CreateTweet({ handleChange, handleGenerate }) {

    return (
        <div className='container'>
            <textarea placeholder="What you have in mind..." maxLength={ 140 } onChange={ handleChange }></textarea>
            <button onClick={ handleGenerate }>Tweet</button>
        </div>
    )
};

export default CreateTweet;