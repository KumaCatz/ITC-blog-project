import { useContext } from "react";
import { TweetsContext } from "../contexts/TweetsContext";

function CreateTweet() {
    const {handleSubmit, handleChange, disabled} = useContext(TweetsContext);

    return (
        <form name='tweet'
        onSubmit={ handleSubmit }>
            <div className='container'>
                <textarea placeholder="Thinking about..."
                name='body'
                maxLength={ 140 }
                onChange={ handleChange }
                className="shadow-lg block p-2.5 w-full text-base text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </textarea>
                <input type='submit'
                value='Tweet'
                disabled={ disabled }
                className="absolute bottom-px right-px bg-amber-100 hover:bg-amber-300 font-bold py-2 px-4 rounded-lg"/>
            </div>
        </form>
    )
};

export default CreateTweet;