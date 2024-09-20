// File: /models/Game.js

import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  league: {
    type: String,
    required: true,
  },
  teamA: {
    type: String,
    required: true,
  },
  teamB: {
    type: String,
    required: true,
  },
  scoreA: {
    type: Number,
    default: null,
  },
  scoreB: {
    type: Number,
    default: null,
  },
  status: {
    type: String,
    required: true,
  },
  prediction: {
    type: String,
    default: "",
  },
  odds: {
    type: String,
    default: "",
  },
  confidence: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Game || mongoose.model("Game", GameSchema);
