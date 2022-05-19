import React, { useState, useEffect } from "react"
import DiaryEntryTile from "./DiaryEntryTile.js"
import DiaryEntryForm from "./DiaryEntryForm.js"
import translateServerErrors from "../services/translateServerErrors.js"

const CatShow = (props) => {
  const [cat, setCat] = useState({
    name: "",
    breed: "",
    diaryEntries: [],
  })

  const [errors, setErrors] = useState({})

  const catId = props.match.params.id

  const fetchCat = async () => {
    try {
      const response = await fetch(`/api/v1/cats/${catId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setCat(body.serializedCat)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchCat()
  }, [])

  const postDiaryEntries = async (newDiaryEntry) => {
    try {
      const response = await fetch(`/api/v1/cats/${catId}/diaryEntries`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newDiaryEntry),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const body = await response.json()
        const updatedDiaryEntry = cat.diaryEntries.concat(body.diaryEntry)
        setErrors([])
        setCat({ ...cat, diaryEntries: updatedDiaryEntry })
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const diaryEntryTiles = cat.diaryEntries.map((diaryEntry) => {
    return (
      <DiaryEntryTile
        key={diaryEntry.id}
        metCat={diaryEntry.metCat}
        ownCat={diaryEntry.ownCat}
        date={diaryEntry.date}
        entry={diaryEntry.entry}
      />
    )
  })

  return (
    <div>
      <DiaryEntryForm name={cat.name} postDiaryEntries={postDiaryEntries} errors={errors} />
      <h1>{cat.name}</h1>
      <h3>{cat.breed}</h3>
      {diaryEntryTiles}
    </div>
  )
}
export default CatShow
