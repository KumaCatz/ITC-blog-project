import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

function NoMatch() {
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('isUser') == false) {
      setTimeout(() => {
        navigate('/')
      }, 2200)  
    }
  }, [])

  return(
    <div>
      <p>Sorry, couldn't find your page.</p>
      <p>Redirecting...</p>
    </div>
  )
}

export default NoMatch