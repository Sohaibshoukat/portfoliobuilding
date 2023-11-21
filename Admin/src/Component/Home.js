import React from 'react'
import "../App.css"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
          <div class="subheader">
        <h2>Welcome To Dashboard</h2>
      </div>

      <div class="dashmainbanner">
        {/* <img src="images/marketing.webp" alt=""> */}
      </div>

      <div class="dashsidemenu">
        <ul>
          <li><Link to={'/Users'}> View Registered Users</Link></li>
        </ul>
      </div>
    </>
  )
}

export default Home