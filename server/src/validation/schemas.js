const Joi = require("joi");

// Validation du schéma Todo
const todoSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Le titre ne peut pas être vide",
    "string.min": "Le titre doit contenir au moins 3 caractères",
    "string.max": "Le titre ne peut pas dépasser 100 caractères",
  }),
  category: Joi.string().valid("A faire", "En cours", "Terminé"),
  label: Joi.string().valid(
    "Quotidien",
    "Hebdomadaire",
    "Mensuel",
    "Occasionnel"
  ),
});

// Validation du schéma User
const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Le nom d'utilisateur ne peut pas être vide",
    "string.min": "Le nom d'utilisateur doit contenir au moins 3 caractères",
  }),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .messages({
      "string.pattern.base":
        "Le mot de passe doit contenir uniquement des lettres et des chiffres",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    }),
});

module.exports = { todoSchema, userSchema };
