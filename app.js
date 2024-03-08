import express from "express";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import morgan from "morgan";
import path from "node:path";
import { validatUrl } from "./middleware/urlExist.middleware.js";
import URLModel from "./models/urlModel.js";
import cors from 'cors';

const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI ?? `mongodb://127.0.0.1:27017/test`;
const app = express();
const __dirName = path.resolve();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(__dirName + "/public"));
app.use(cors())

app.get(`/`, (req, res) => {
  res.sendFile(__dirName + "/public/index.html");
  return;
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const originalLink = await URLModel.findOne({ id });
  if (!originalLink) {
      res.sendFile(__dirName + `/public/404.html`);
      return
  }
  res.redirect(originalLink.url);
  return
});


app.post("/link", validatUrl, async (req, res) => {
  const { url } = req.body;
  let id = nanoid(7);
  const newURL = new URLModel({ url, id });
  try {
    newURL.save();
  } catch (error) {
    console.log(`An error was encountered! Please try again.`, error);
  }

  res.json({
    message: `http://localhost:${process.env.PORT}/${newURL.id}`,
    type: "success",
  });
});

app.listen(PORT, async () => {
  await mongoose.connect(MONGO_URI);
  console.log(`Server is running on PORT : ${PORT}`);
});
