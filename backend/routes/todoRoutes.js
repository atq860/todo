import express from "express";
const router = express.Router();
import {
  createTodo,
  getMyTodos,
  getTodoById,
  updateTodo,
  updateTodoToCompleted,
  deleteTodo,
} from "../controllers/todoController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createTodo).get(protect, getMyTodos);
router
  .route("/:id")
  .get(protect, getTodoById)
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

router.route("/:id/complete").put(protect, updateTodoToCompleted);

export default router;
