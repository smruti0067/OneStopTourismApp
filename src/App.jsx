import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/custom/Hero'
import Chatbot from './chatbot/index'

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user data exists in localStorage
    const user = localStorage.getItem('user')
    setIsUserLoggedIn(!!user)
  }, [])

  return (
    <>
      <Hero/>
      {isUserLoggedIn && <Chatbot/>}
    </>
  )
}

export default App
