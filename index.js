import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let tasks = [];

app.get('/', (req, res) => {
  res.render('index', { tasks: tasks });
});

app.post('/submit', (req, res) => {
    const task = req.body.task;
    tasks.push({task: task});
  console.log(tasks);
  res.redirect('/');
});

app.get('/delete', (req, res) => {
  tasks = tasks.filter((task, index) => index !== parseInt(req.query.index));
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  tasks = tasks.filter((task, index) => index !== parseInt(req.body.index));
  res.redirect('/');
});

app.get('/complete', (req, res) => {
  tasks[parseInt(req.query.index)].completed = true;
  res.redirect('/');
});

app.post('/complete', (req, res) => {
  tasks[parseInt(req.body.index)].completed = true;
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});