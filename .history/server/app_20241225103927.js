const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 5000;

const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));



// Middleware
app.use(cors());
app.use(bodyParser.json());

// Базовая обработка ошибок:
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// MongoDB connection
mongoose.connect('mongodb+srv://Dina:VSYSedhiHFWoXL2J@cluster0.5qkjo.mongodb.net/testApp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes

app.get('/', (req, res) => {
    res.send('Welcome to the Todo API!');
});
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).end();
});

app.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, { completed: req.body.completed }, { new: true });
    res.json(updatedTask);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});