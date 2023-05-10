import React, { useState } from 'react'
import Signup from './Signup/Signup'
import Signin from './Signin/Signin'

export default function Authentication() {
  const [isLogin, setIsLogin] = useState(true)

  const handleSignup = () => {
    setIsLogin(true)
  }

  const handleSignin = () => {
    setIsLogin(false)
  }

  if (!isLogin) {
    return <Signup onClick={handleSignup} onSignUp={handleSignup} />
  }
  return <Signin onClick={handleSignin} />
}
