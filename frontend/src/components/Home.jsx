import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div>
            <p>Your Succeussfully Logined</p>
            <button><Link to='/'>Go to Register</Link></button>
        </div>
    </div>
  )
}

export default Home