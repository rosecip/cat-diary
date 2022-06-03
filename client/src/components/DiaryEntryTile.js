import React from "react"
import DeleteDiaryEntry from "./DeleteDiaryEntry"

const DiaryEntryTile = (props) => {
  
  let iveMetCat = ""
  let iOwnCat = ""
  let heart1 = ""
  let heart2 = ""

  if (props.metCat === true) {
    iveMetCat = `this is my first time meeting ${props.name}!`
    heart1 = <p>&hearts;&nbsp;</p>
  } else {
    iveMetCat = ""
    heart1 = ""
  }

  if (props.ownCat === true) {
    iOwnCat = `${props.name} is my cat!`
    heart2 = <p>&hearts;&nbsp;</p>
  } else {
    iOwnCat = ""
    heart2 = ""
  }

  return (
    <div className="diary-entry-tile">
      <p>today is {props.date}</p>
      <p>{props.entry}</p>
      <div className="met-own-cat">
        <p className="cat-heart-line heart">{heart1}</p>
        <p className="cat-heart-line met-cat">{iveMetCat}</p>
      </div>
      <div className="met-own-cat">
        <p className="cat-heart-line heart">{heart2}</p>
        <p className="cat-heart-line own-cat">{iOwnCat}</p>
      </div>
      <div>
        <DeleteDiaryEntry id={props.id} handleDelete={props.handleDelete} />
      </div>
    </div>
  )
}

export default DiaryEntryTile
