import express from "express"
import { DiaryEntry } from "../../../models/index.js"

const diaryEntriesRouter = new express.Router()

diaryEntriesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    await DiaryEntry.query().deleteById(id)
    return res.status(200).json({ message: "successfully deleted" })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default diaryEntriesRouter
