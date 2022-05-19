import React from "react"

const DiaryEntryTile = (props) => {
  let metCat = ""
  let ownCat = ""

  if (props.metCat === true) {
    metCat = "This is my first time meeting this cat!"
  } else {
    metCat = ""
  }

  if (props.ownCat === true) {
    ownCat = "This is my cat!"
  } else {
    ownCat = ""
  }

  return (
    <div>
      diary entry:
      <h3>{metCat}</h3>
      <h3>{ownCat}</h3>
      <h3>{props.date}</h3>
      <p>{props.entry}</p>
    </div>
  )
}

export default DiaryEntryTile
