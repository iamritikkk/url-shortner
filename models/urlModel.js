import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  id: { type: String, required: true },
});

const URLModel = mongoose.model("URL", urlSchema);

export default URLModel;
