import React, { useState } from "react"
import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList"
import { Redirect } from "react-router-dom"
import Dropzone from "react-dropzone"

const CatForm = (props) => {
  const catBreedsArray = ["", "ragdoll", "exotic shorthair", "british shorthair", "persian", "maine coon", "american shorthair", "devon rex", "sphynx", "scottish fold", "abyssinian", "oriental", "siamese", "norwegian forest cat", "cornish rex", "bengal", "russian blue", "siberian", "burmese", "birmin", "tonkinese", "ocicat", "selkirk rex", "ragamuffin", "american curl", "japanese bobtail", "manx", "egyptian mau", "somali", "balinese", "singapura", "colorpoint shorthair", "lykoi", "chartreux", "turkish angora", "european burmese", "bombay", "khao manee", "burmilla", "korat", "american bobtail", "havana brown", "laperm", "turkish van", "american wirehair", "california spangled", "cymric", "himalayan", "munchkin", "nebelung", "pixie bob", "savannah", "snowshoe", "toyger", "york chocolate", "aegean", "australian mist", "american polydactyl", "arabian mau", "asian semi longhair", "bambino", "brazilian shorthair", "british longhair", "chantilly tiffany", "chausie", "cheetoh", "cyprus", "javanese", "donskoy", "peterbald", "ukranian levkoy", "elf cat", "dwelf", "minskin", "serengeti cat", "napoleon cat", "thai cat", "asian cat"]
  const catBreeds = catBreedsArray.sort()

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

  let catImage
  if (uploadedImage.preview === "") {
    catImage = ""
  } else {
    catImage = "cat-image"
  }

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
    <div className="form cat-form">
      <h1 className="form-header-text">add a cat</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label className="form-text">
          name:
          <input className="form-field" type="text" name="name" onChange={onChangeHandler} />
        </label>
        <label className="form-text">
          breed:
          <select className="form-field" type="text" name="breed" onChange={onChangeHandler}>
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
                  value="add image"
                />
              </div>
            </section>
          )}
        </Dropzone>
        <img className={catImage} src={uploadedImage.preview} />
        <div>
          <input className="button" type="submit" value="post cat" />
        </div>
      </form>
    </div>
  )
}

export default CatForm
