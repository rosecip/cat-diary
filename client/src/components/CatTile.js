import React from "react"

const CatTile = (props) => {
  return (
    <div className="cat-tile">
        <img className="cat-image list-cat-image" src={props.cat.image} />
          <p className="cat-tile-name">{props.cat.name}</p>
    </div>
  )
}

export default CatTile
