import { useContext } from "react";
import { TweetsContext } from "../App";

function Profile() {
    const {handleSubmit, handleChange, formData} = useContext(TweetsContext);

    return (
        <div>
            <h1>Profile</h1>
            <h2>User Name</h2>
            <form name='username'
            onSubmit={ handleSubmit }>
                <input type='text'
                name='username'
                defaultValue={ formData.username }
                onChange={ handleChange }
                className="text-black" />
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default Profile