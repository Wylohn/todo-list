const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const validator = require("../middleware/validator");
const { todoSchema } = require("../validation/schemas");
const auth = require("../middleware/auth");

router.get("/", auth, todoController.getAllTodos);
router.post("/", [auth, validator(todoSchema)], todoController.createTodo);
router.put("/:id", [auth, validator(todoSchema)], todoController.updateTodo);
router.delete("/:id", auth, todoController.deleteTodo);

module.exports = router;
