import express from "express"
import { DiaryEntry } from "../../models/index.js"
import { ValidationError } from "objection"
import cleanUserInput from "../../services/cleanUserInput.js"

const catDiaryEntriesRouter = new express.Router({ mergeParams: true })

catDiaryEntriesRouter.post("/", async (req, res) => {
  const formInput = cleanUserInput(req.body)
  try {
    const newDiaryEntry = await DiaryEntry.query().insertAndFetch({
      ...formInput,
      catId: req.params.catId,
      userId: req.user.id,
    })
    res.status(201).json({ diaryEntry: newDiaryEntry })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data })
    } else {
      console.log(error)
      res.status(500).json({ error })
    }
  }
})

export default catDiaryEntriesRouter
