import React, { useContext } from "react";
import { TweetsContext } from "../contexts/TweetsContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import postData from "./postData";
import getData from "./getData";

export default function RegisterModal() {
  const {handleInput, setIsUser, setFormData} = useContext(TweetsContext);
  const {setUserData, userData} = useContext(UserContext)
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate()
  const userURL = 'https://64b90fb679b7c9def6c0853b.mockapi.io/user'

  function exitModal() {
    setShowModal(false)
    setUserData({
      id: '',
      username: '',
      password: '',
    })
  }
  
  const handleRegister = async (e) => {
    e.preventDefault();

    if (userData.password == '' || userData.username == '') {return}
    await postData(userURL, userData);

    setFormData((pre) => {
      return {
        ...pre,
        'username': userData.username
      }
    })
    setIsUser(true)
    localStorage.setItem('isUser', true);
    const users = await getData(userURL)
    localStorage.setItem('userData', JSON.stringify({
      id: users.length,
      username: userData.username,
      password: userData.password,
    }))
    setShowModal(false)
    navigate('/home')
  }

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 m-4 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create new account
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Welcome!
                  </h3>
                </div>
                <form>
                {/*body*/}
                <div className="relative p-6 flex-auto flex-col">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                    <input type='text' name='register-username' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Username" onChange={ handleInput } />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input type='password' name='register-password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" onChange={ handleInput } />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={ exitModal }
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    name='register-user'
                    onClick={ handleRegister }
                  >
                    Register
                  </button>
                </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}