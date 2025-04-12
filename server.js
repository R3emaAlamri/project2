const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = req.body.task;
  if (task) {
    tasks.push({ id: Date.now(), task });
    res.status(201).json({ message: 'تمت الإضافة' });
  } else {
    res.status(400).json({ message: 'يجب إدخال المهمة' });
  }
});

app.delete('/tasks', (req, res) => {
  tasks = [];
  res.json({ message: 'تم مسح جميع المهام' });
});

app.listen(3000, () => {
  console.log('✅ API شغالة على http://localhost:3000');
});
