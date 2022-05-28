import Todo from "../models/todoModel.js";
import asyncHandler from "express-async-handler";

// @desc    Create New Todo List
// @route   POST /api/todos
// access   Private
const createTodo = asyncHandler(async (req, res) => {
  const { title, description, image } = req.body;

  const newTodo = new Todo({
    user: req.user._id,
    title,
    description,
    image,
  });

  const createdTodo = await newTodo.save();
  res.status(201).json(createdTodo);
});

// @desc    GET Logged In User Todos
// @route   GET /api/todos
// access   Private
const getMyTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
});

// @desc    GET Todo by Id
// @route   GET /api/todos/:id
// access   Private
const getTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404);
    throw new Error("Todo Not Found");
  }
});

// @desc    Update a Todo
// @route   PUT /api/todos/:id
// access   Private
const updateTodo = asyncHandler(async (req, res) => {
  const { title, description, image } = req.body;

  const todo = await Todo.findById(req.params.id);

  if (todo) {
    todo.title = title;
    todo.description = description;
    todo.image = image;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } else {
    res.status(404);
    throw new Error("Todo Not Found");
  }
});

// @desc    UPDATE Toto to Completed
// @route   PUT /api/todos/:id/complete
// access   Private
const updateTodoToCompleted = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    todo.status = true;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } else {
    res.status(404);
    throw new Error("Todo Not Found");
  }
});

// @desc    Delete a Todo
// @route   DELETE /api/todos/:id
// access   Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    await todo.remove();
    res.json({ message: "Todo Removed" });
  } else {
    res.status(404);
    throw new Error("Todo Not Found");
  }
});

export {
  createTodo,
  getMyTodos,
  getTodoById,
  updateTodo,
  updateTodoToCompleted,
  deleteTodo,
};
