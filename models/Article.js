// File: /models/Article.js

import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    publishedAt: Date,
    storedDate: Date,
  },
  { collection: "articles" }
);

export default mongoose.models.Article ||
  mongoose.model("Article", articleSchema);
