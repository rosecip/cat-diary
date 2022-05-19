import React from "react"

const CatTile = (props) => {
  return (
    <div>
      <h1>{props.cat.name}</h1>
      <p>{props.cat.breed}</p>
      <img src={props.cat.image}/>
    </div>
  )
}

export default CatTile
