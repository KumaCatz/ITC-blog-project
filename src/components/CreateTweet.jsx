import { useContext } from "react";
import { TweetsContext } from "../App";

function CreateTweet() {
    const {handleSubmit, handleChange, disabled} = useContext(TweetsContext);

    return (
        <form name='tweet'
        onSubmit={ handleSubmit }>
            <div className='container'>
                <textarea placeholder="What you have in mind..."
                name='body'
                maxLength={ 140 }
                onChange={ handleChange }>
                </textarea>
                <input type='submit'
                value='Tweet'
                disabled={ disabled }/>
            </div>
            <button onClick={() => localStorage.clear()}>exit</button>
        </form>
    )
};

export default CreateTweet;