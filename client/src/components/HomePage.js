import React from "react"
import { Link } from "react-router-dom"

const HomePage = (props) => {

  return (
    <div className="home-page">
      <p className="welcome">welcome to cat diary!</p>
      <Link to="/cats">
        <p className="meet-the-cats">
          &hearts;&nbsp;meet the cats&nbsp;&hearts;
        </p>
      </Link>
    </div>
  )
}

export default HomePage
