import React from "react"

const CatTile = (props) => {
  return (
    <div className="cat-tile">
      <div className="cat-image-header">
        <img className="cat-image" src={props.cat.image} />
        </div>
        <div className="cat-name-container">
          <p className="cat-tile-name">{props.cat.name}</p>
        </div>     
    </div>
  )
}

export default CatTile
