import React, { useState } from "react"
import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList"
import { Redirect } from "react-router-dom"
import Dropzone from "react-dropzone"

const CatForm = (props) => {
  const catBreeds = ["", "Maine Coon", "American Shorthair", "not sure..just a weird little guy"]

  const [newCat, setNewCat] = useState({
    name: "",
    breed: "",
    image: {},
  })

  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [uploadedImage, setUploadedImage] = useState({
    preview: "",
  })

  const catBreedOptions = catBreeds.map((breed) => {
    return (
      <option key={breed} value={breed}>
        {breed}
      </option>
    )
  })

  const onChangeHandler = (event) => {
    setNewCat({
      ...newCat,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const clearForm = () => {
    setNewCat({
      name: "",
      breed: "",
      image: {},
    })
    setUploadedImage({
      preview: "",
    })
  }

  const handleImageUpload = (catImage) => {
    setNewCat({
      ...newCat,
      image: catImage[0],
    })
    setUploadedImage({
      preview: URL.createObjectURL(catImage[0])
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postCat(newCat)
    clearForm()
  }

  const postCat = async () => {
    const catBody = new FormData()
    catBody.append("name", newCat.name)
    catBody.append("breed", newCat.breed)
    catBody.append("image", newCat.image)
    try {
      const response = await fetch("/api/v1/cats", {
        method: "POST",
        headers: { Accept: "image/jpeg" },
        body: catBody,
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
        setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  if (shouldRedirect) {
    return <Redirect push to="/" />
  }

  return (
    <div>
      <h1>add a cat =^.^=</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={onChangeHandler} />
        </label>
        <label>
          Breed:
          <select type="text" name="breed" onChange={onChangeHandler}>
            {catBreedOptions}
          </select>
        </label>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <input
                  className="button"
                  type="add"
                  onChange={onChangeHandler}
                  value="add image :)"
                />
                <p>Upload a picture of this cat</p>
              </div>
            </section>
          )}
        </Dropzone>
        <img src={uploadedImage.preview} />
        <div>
          <input type="submit" value="Add Cat!!!" />
        </div>
      </form>
    </div>
  )
}

export default CatForm
