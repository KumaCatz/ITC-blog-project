import { useEffect } from "react"


function Authentication({isUser, setIsUser}) {

  function userValidation() {
    setIsUser(true)
    localStorage.setItem('isUser', true);
  }


  return (
    <>
      <div>hi</div>
      <button onClick={userValidation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">enter</button>
      <button onClick={() => localStorage.clear()}>clear cache</button>
    </>
  )
}

export default Authentication