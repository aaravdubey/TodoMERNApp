import express from "express";
import Todo from "../models/todo.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(404).json(error.message);
    }
})

router.post('/new', async (req, res) => {
    try {
        const todo = new Todo({
        text: req.body.text
        })
        await todo.save();

        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.status(204).json(todo);

    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.patch('/complete/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        todo.complete = !todo.complete;
        todo.save();
        res.status(200).json(todo);

    } catch (error) {
        res.status(500).json(error.message);
    }
})

export default router;