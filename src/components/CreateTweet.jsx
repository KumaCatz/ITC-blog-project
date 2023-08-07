import { useContext } from "react";
import { TweetsContext } from "../contexts/TweetsContext";

function CreateTweet() {
    const {handleSubmit, handleChange, disabled} = useContext(TweetsContext);

    return (
        <form name='tweet'
        onSubmit={ handleSubmit }>
            <div className='container'>
                <textarea placeholder="I'm thinking..."
                name='body'
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