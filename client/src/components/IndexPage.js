import React from "react"
import CatList from "./CatList.js"
import CatForm from "./CatForm.js"

const IndexPage = (props) => {
  return (
    <div>
      <CatForm />
      <CatList />
    </div>
  )
}

export default IndexPage
