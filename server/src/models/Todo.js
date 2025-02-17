const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["A faire", "En cours", "Terminé"],
      default: "A faire",
    },
    label: {
      type: String,
      enum: ["Quotidien", "Hebdomadaire", "Mensuel", "Occasionnel"],
      default: "Occasionnel",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
