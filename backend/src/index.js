import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

// In-memory data store for todo lists
let todoLists = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: [
      {
        id: '1001',
        text: 'First todo of first list!',
        completed: false,
        dueDate: null,
      },
    ],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [
      {
        id: '2001',
        text: 'First todo of second list!',
        completed: false,
        dueDate: null,
      },
    ],
  },
}

// Helper function to generate IDs
const generateId = () => {
  return Date.now().toString()
}

app.get('/', (req, res) => res.send('Welcome to todo!'))

// Get all todo lists
app.get('/api/todolists', (req, res) => {
  res.json(todoLists)
})

// Create a new todo list
app.post('/api/todolists', (req, res) => {
  const { title } = req.body
  if (!title) {
    return res.status(400).json({ error: 'Title is required' })
  }

  const id = generateId()
  const newList = {
    id,
    title,
    todos: [],
  }

  todoLists[id] = newList
  res.status(201).json(newList)
})

// Update a todo list
app.put('/api/todolists/:id', (req, res) => {
  const { id } = req.params
  const { title, todos } = req.body

  if (!todoLists[id]) {
    return res.status(404).json({ error: 'Todo list not found' })
  }

  todoLists[id] = {
    ...todoLists[id],
    ...(title && { title }),
    ...(todos && { todos }),
  }

  res.json(todoLists[id])
})

app.listen(PORT, () => console.log(`Todo API server listening on port ${PORT}!`))
