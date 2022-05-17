import React, { useState, useEffect } from "react"

const CatShow = (props) => {

  const [cat, setCat] = useState({
    name: "",
    breed: ""
  })

  const fetchCat = async () => {
    try {
      const response = await fetch(`/api/v1/cats/${props.match.params.id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
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

  return (
    <div>
    <h1>{cat.name}</h1>
    <h3>{cat.breed}</h3>
    </div>
  )
}

export default CatShow