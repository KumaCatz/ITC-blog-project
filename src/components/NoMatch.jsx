import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NoMatch() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2200)
  }, [])

  return(
    <div>
      <p>Sorry, couldn't find your page.</p>
      <p>Redirecting...</p>
    </div>
  )
}

export default NoMatch