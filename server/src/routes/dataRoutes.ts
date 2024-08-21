import express from "express";
import { addData } from "../controllers/dataController";

const dataRouter: express.Router = express.Router();

dataRouter.post("/add", addData);

export default dataRouter;