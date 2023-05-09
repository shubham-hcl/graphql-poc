import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const checkUserToken = () => {
    const accessToken = localStorage.getItem('access-token')
    if (!accessToken || accessToken === 'undefined') {
      setIsLoggedIn(false)
      return navigate('/login')
    }
    setIsLoggedIn(true)
  }
  useEffect(() => {
    checkUserToken()
  }, [isLoggedIn])
  return <React.Fragment>{isLoggedIn ? children : null}</React.Fragment>
}
export default AuthProvider
