import { useContext, useState } from "react";
import { TweetsContext } from "../contexts/TweetsContext";
import { UserContext } from "../contexts/UserContext";

function Profile() {
    const {userData, setUserData} = useContext(UserContext)
    const {setFormData, handleChange, formData, username} = useContext(TweetsContext);
    const [newPassord, setNewPassword] = useState('')
    const [newUsername, setNewUsername] = useState('')

    async function updateUserData(e) {
        e.preventDefault();

        const updatedUserData = {
            'username': newUsername,
            'password': newPassord,
        }
      
        const jsonString = JSON.stringify(updatedUserData);
    
        const url = 'https://64b90fb679b7c9def6c0853b.mockapi.io/user/3';
    
        const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonString
        };
        try {
            const response = await fetch(url, options)
            const data = await response.json()
            setUserData((pre) => {
                return {
                    ...pre,
                    username: data.username,
                    password: data.password,
                }
            })
            setFormData((pre) => {
                return {
                    ...pre,
                    username:data.username,
                }
            })
            console.log('fetch using put method:', data)
        } catch (e) {
            console.log(e)
        }
        try {
            const response = await fetch('https://64b90fb679b7c9def6c0853b.mockapi.io/user')
            const data = await response.json()
            console.log('fetch using get method:', data)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div>
            <h1>Profile</h1>
            <form name='change-profile'
            onSubmit={ updateUserData }>
                <div>User Name</div>
                <input type='text'
                name='change-username'
                defaultValue={ formData.username }
                onChange={(e) => {setNewUsername(e.target.value)}}
                className="text-black" />
                <div>Password</div>
                <input type='password'
                name='change-password'
                defaultValue={ userData.password }
                onChange={(e) => setNewPassword(e.target.value)}
                className="text-black" />
                <div>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default Profile