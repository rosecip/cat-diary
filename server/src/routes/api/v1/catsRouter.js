import express from "express"
import Cat from "../../../models/Cat.js"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import CatSerializer from "../../../serializers/CatSerializer.js"
import catsDiaryEntriesRouter from "../catsDiaryEntriesRouter.js"
import uploadImage from "../../../services/uploadImage.js"

const catsRouter = new express.Router()

catsRouter.get("/", async (req, res) => {
  try {
    const cats = await Cat.query()
    const serializedCats = await Promise.all(cats.map((cat) => CatSerializer.getSummary(cat)))
    res.status(200).json({ cats: serializedCats })
  } catch (error) {
    res.status(500).json({ errors })
  }
})

catsRouter.post("/", uploadImage.single("image"), async (req, res) => {
  const { name, breed } = cleanUserInput(req.body)
  console.log()
  try {
    const newCat = await Cat.query().insertAndFetch({
      name,
      breed,
      image: req.file.location
    })

    res.status(201).json({ newCat })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data })
    }
    res.status(500).json({ errors: error })
  }
})

catsRouter.get("/:id", async (req, res) => {
  try {
    const cat = await Cat.query().findById(req.params.id)
    const serializedCat = await CatSerializer.getSummary(cat)
    res.status(200).json({ serializedCat })
  } catch (error) {
    res.status(500).json({ error })
  }
})

catsRouter.use("/:catId/diaryEntries", catsDiaryEntriesRouter)

export default catsRouter
