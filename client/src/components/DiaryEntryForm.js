import React, { useState } from "react"
import ErrorList from "../components/layout/ErrorList"

const DiaryEntry = (props) => {
  const [newDiaryEntry, setNewDiaryEntry] = useState({
    metCat: false,
    ownCat: false,
    date: "",
    entry: "",
  })

  const onChangeHandler = (event) => {
    setNewDiaryEntry({
      ...newDiaryEntry,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const metCatBox = document.getElementById("metCat")
  const ownCatBox = document.getElementById("ownCat")

  const checkCatStatus = () => {
    if (metCatBox.checked) {
      setNewDiaryEntry({
        ...newDiaryEntry,
        metCat: true,
        ownCat: false,
      })
    } else {
      if (ownCatBox.checked) {
        setNewDiaryEntry({
          ...newDiaryEntry,
          metCat: false,
          ownCat: true,
        })
      }
    }
  }

  const clearForm = () => {
    setNewDiaryEntry({
      metCat: false,
      ownCat: false,
      date: "",
      entry: "",
    })
    (!metCatBox.checked)
    (!ownCatBox.checked)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.postDiaryEntries(newDiaryEntry)
    clearForm()
  }

  return (
    <div>
      <h1>Did you meet this cat?</h1>
      <ErrorList errors={props.errors} />
      <form onSubmit={handleSubmit}>
        <input
          type="radio"
          id="metCat"
          name="radioCatButton"
          value={newDiaryEntry.metCat}
          onClick={checkCatStatus}
        />
        <label for="metCat">This is my first time meeting {props.name}! </label>
        <br />
        <input
          type="radio"
          id="ownCat"
          name="radioCatButton"
          value={newDiaryEntry.ownCat}
          onClick={checkCatStatus}
        />
        <label for="metCat">{props.name} is my cat!</label>
        <label>
          When?
          <input type="text" name="date" value={newDiaryEntry.date} onChange={onChangeHandler} />
        </label>
        <label>
          Share your experience =^.^=
          <input type="text" name="entry" value={newDiaryEntry.entry} onChange={onChangeHandler} />
        </label>
        <div>
          <input type="submit" value="Publish Diary Entry" />
        </div>
      </form>
    </div>
  )
}

export default DiaryEntry
