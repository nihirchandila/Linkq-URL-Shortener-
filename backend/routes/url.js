import express from "express";
const Router = express.Router();
import { getData, redirect } from "../controller/url.js";

Router.post("/", getData);
Router.get("/:shortId", redirect);

export default Router;