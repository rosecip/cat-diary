import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import catsRouter from "./api/v1/catsRouter.js";
import diaryEntriesRouter from "./api/v1/diaryEntriesRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/cats", catsRouter);
rootRouter.use("/api/v1/diary-entries", diaryEntriesRouter)

export default rootRouter;
