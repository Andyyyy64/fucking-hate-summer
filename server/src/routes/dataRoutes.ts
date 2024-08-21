import express from "express";
import { addData, getData } from "../controllers/dataController";

const dataRouter: express.Router = express.Router();

dataRouter.post("/add", addData);
dataRouter.get("/get", getData);

export default dataRouter;