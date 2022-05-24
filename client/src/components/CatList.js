import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CatTile from "./CatTile"

const CatList = (props) => {
  const [cats, setCats] = useState([])

  const fetchCats = async () => {
    try {
      const response = await fetch("/api/v1/cats")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setCats(responseBody.cats)
    } catch (error) {
      console.log(`error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchCats()
  }, [])

  const catListItems = cats.map((cat) => {
    return (
      <li key={cat.id}>
        <Link to={`/cats/${cat.id}`}>
          <CatTile cat={cat} />
        </Link>
      </li>
    )
  })

  let randomCatId = Math.floor(Math.random() * catListItems.length + 1)
  let catIdLink = `/cats/${randomCatId}`
  const heart = (<p className="button-heart">&hearts;</p>)

  return (
    <div>
      <div className="home-page-buttons">
        <Link className="button add-cat" to="/add-new-cat">
          add a new cat
        </Link>
        {heart}
        <Link className="button random-cat" to={catIdLink}>
          random cat
        </Link>
      </div>
      <div className="cat-list-container">{catListItems}</div>
    </div>
  )
}

export default CatList
