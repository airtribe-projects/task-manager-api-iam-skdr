const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data storage
let tasks = [];
let currentId = 1;

// Allowed priority levels
const VALID_PRIORITIES = ['low', 'medium', 'high'];

// --- Helper Function: Input Validation ---
function validateTaskInput(body) {
    const { title, description, completed, priority } = body;
    let errors = [];

    if (!title || typeof title !== 'string' || title.trim() === '') {
        errors.push("Field 'title' is required and must be a non-empty string.");
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
        errors.push("Field 'description' is required and must be a non-empty string.");
    }
    if (typeof completed !== 'boolean') {
        errors.push("Field 'completed' is required and must be a boolean.");
    }
    if (!priority || !VALID_PRIORITIES.includes(priority)) {
        errors.push(`Field 'priority' is required and must be one of: ${VALID_PRIORITIES.join(', ')}.`);
    }

    return errors.length > 0 ? errors.join(' ') : null;
}

// 1. GET /tasks (Retrieve all + Filter + Sort)
app.get('/tasks', (req, res) => {
    let result = [...tasks]; 

    // Filter by completed status
    if (req.query.completed !== undefined) {
        const isCompleted = req.query.completed === 'true';
        result = result.filter(t => t.completed === isCompleted);
    }

    // Sort by creationDate
    if (req.query.sortBy === 'creationDate') {
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    res.status(200).json(result);
});

// 2. GET /tasks/priority/:level (Retrieve by Priority)
app.get('/tasks/priority/:level', (req, res) => {
    const level = req.params.level.toLowerCase();
    if (!VALID_PRIORITIES.includes(level)) {
        return res.status(400).json({ error: "Invalid priority level." });
    }
    const filteredTasks = tasks.filter(t => t.priority === level);
    res.status(200).json(filteredTasks);
});

// 3. GET /tasks/:id (Retrieve specific task)
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
});

// 4. POST /tasks (Create new task)
app.post('/tasks', (req, res) => {
    const errorMsg = validateTaskInput(req.body);
    if (errorMsg) return res.status(400).json({ error: errorMsg });

    const newTask = {
        id: currentId++,
        title: req.body.title.trim(),
        description: req.body.description.trim(),
        completed: req.body.completed,
        priority: req.body.priority,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 5. PUT /tasks/:id (Update task)
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    const errorMsg = validateTaskInput(req.body);
    if (errorMsg) return res.status(400).json({ error: errorMsg });

    task.title = req.body.title.trim();
    task.description = req.body.description.trim();
    task.completed = req.body.completed;
    task.priority = req.body.priority;

    res.status(200).json(task);
});

// 6. DELETE /tasks/:id (Delete task)
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });

    tasks.splice(index, 1);
    res.status(200).json({ message: "Task deleted successfully" });
});

// Export app for testing, only listen if not in test mode
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}
module.exports = app;
