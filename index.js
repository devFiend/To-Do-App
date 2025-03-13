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
  res.render('index');
});

app.post('/submit', (req, res) => {
    const task = req.body.task;
    tasks.push(task);
  console.log(tasks);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});