import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let tasks = [];

// Home Route
app.get('/', async (req, res) => {
    res.render('index', { tasks });
});

// Fetch Weather
app.get('/weather', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const apiKey = process.env.WEATHER_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: "Weather API key is missing" });
        }

        if (!lat || !lon) {
            return res.status(400).json({ error: "Coordinates not provided" });
        }

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        res.json({
            description: response.data.weather[0].description,
            temperature: response.data.main.temp,
            location: response.data.name || "Unknown"
        });

    } catch (error) {
        console.error("❌ Error fetching weather:", error.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// Render Add Task Page
app.get('/addTask', (req, res) => {
    res.render('addTask');
});

// Add Task
app.post('/submit', (req, res) => {
    const task = req.body.task.trim();
    if (task) {
        tasks.push({ task, completed: false });
        console.log("✅ Task Added:", task);
    }
    res.redirect('/');
});

// Delete Task
app.post('/delete', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && tasks[index]) {
        console.log("🗑 Task Deleted:", tasks[index].task);
        tasks.splice(index, 1);
    }
    res.redirect('/');
});

// Mark Task as Completed
app.post('/complete', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && tasks[index]) {
        tasks[index].completed = true;
        console.log("✅ Task Completed:", tasks[index].task);
    }
    res.redirect('/');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
