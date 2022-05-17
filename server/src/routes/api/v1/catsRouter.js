import express from "express";
import Cat from "../../../models/Cat.js";
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";
import CatSerializer from "../../../serializers/CatSerializer.js";

const catsRouter = new express.Router();

catsRouter.get("/", async (req, res) => {
  try {
    const cats = await Cat.query();
    const serializedCats = cats.map((cat) => CatSerializer.getSummary(cat));
    res.status(200).json({ cats: serializedCats });
  } catch (error) {
    res.status(500).json({ errors });
  }
});

catsRouter.post("/", async (req, res) => {
  const body = cleanUserInput(req.body);
  try {
    const newCat = await Cat.query().insertAndFetch(body);
    res.status(201).json({ newCat });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data });
    }
    res.status(500).json({ errors: error });
  }
});

export default catsRouter;
