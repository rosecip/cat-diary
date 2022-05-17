import express from "express"
import Cat from "../../../models/Cat.js"

const catsRouter = new express.Router()

catsRouter.get("/", async (req, res) => {
  try {
    const cats = await Cat.query()
    res.status(200).json({ cats })
  } catch (error) {
    res.status(500).json({ errors })
  }
})

export default catsRouter