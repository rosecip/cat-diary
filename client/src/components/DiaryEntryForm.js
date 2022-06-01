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
    })(!metCatBox.checked)(!ownCatBox.checked)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.postDiaryEntries(newDiaryEntry)
    clearForm()
  }

  return (
    <div className="diary-entry-page">
      <p className="write-diary-entry">write a diary entry</p>
      <ErrorList errors={props.errors} />
        <label className="form-text">
          the date today is:
          <input
            className="form-field diary-form-field-1"
            type="text"
            name="date"
            value={newDiaryEntry.date}
            onChange={onChangeHandler}
          />
        </label>
        <label className="form-text">
          share your experience!
          <input
            className="form-field diary-form-field-2"
            type="text"
            name="entry"
            value={newDiaryEntry.entry}
            onChange={onChangeHandler}
          />
        </label>
      <form onSubmit={handleSubmit}>
        <div className="button-div">
        <input
          type="radio"
          id="metCat"
          name="radioCatButton"
          value={newDiaryEntry.metCat}
          onClick={checkCatStatus}
        />
        <label className="form-text" for="metCat">
          this is my first time meeting {props.name}!{" "}
        </label>
        <br />
        <input
          type="radio"
          id="ownCat"
          name="radioCatButton"
          value={newDiaryEntry.ownCat}
          onClick={checkCatStatus}
        />
        <label className="form-text" for="metCat">
          {props.name} is my cat!
        </label>
        <div>
            <input className="button publish-button" type="submit" value="publish" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default DiaryEntry
