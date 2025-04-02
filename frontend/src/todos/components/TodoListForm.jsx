import React, { useState } from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { parseISO, isValid } from 'date-fns'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import styled from 'styled-components'

// Styled component for completed todos
const CompletedTodoItem = styled.div`
  background-color: #f5f5f5;
  text-decoration: line-through;
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 8px;
`

// Regular todo item container
const TodoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos || [])

  // Handle submission of the form
  const handleSubmit = async (event) => {
    if (event) event.preventDefault()

    try {
      await saveTodoList(todoList.id, { todos })
    } catch (error) {
      console.error('Error saving todo list:', error)
    }
  }

  // Add a new todo item
  const handleAddTodo = async () => {
    const newTodo = {
      id: Date.now().toString(),
      text: '',
      completed: false,
      dueDate: null,
    }

    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
  }

  // Update a todo item text
  const handleUpdateTodoText = (index, text) => {
    const updatedTodos = todos.map((todo, i) => (i === index ? { ...todo, text } : todo))
    setTodos(updatedTodos)
  }

  // Update a todo item completion status
  const handleToggleComplete = async (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)

     // Immediately save the checkbox state to the server
  try {
    await saveTodoList(todoList.id, { todos: updatedTodos });
  } catch (error) {
    console.error('Error saving todo completion status:', error);
  }
  }

  // Update a todo item due date
  const handleUpdateDueDate = (index, dueDate) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, dueDate: dueDate ? dueDate.toISOString() : null } : todo
    )
    setTodos(updatedTodos)
  }

  // Delete a todo item
  const handleDeleteTodo = async (index) => {
    const updatedTodos = [...todos.slice(0, index), ...todos.slice(index + 1)]
    setTodos(updatedTodos)
    await saveTodoList(todoList.id, { todos: updatedTodos });
  }

 // Get the status label based on due date
const getTimeStatus = (dueDate) => {
  if (!dueDate) return null;
  
  try {
    const date = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
    
    if (!isValid(date)) return null;
    
    // Reset hours to compare days only, not exact times
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dueDateWithoutTime = new Date(date);
    dueDateWithoutTime.setHours(0, 0, 0, 0);
    
    // Calculate difference in days (more accurate)
    const diffTime = dueDateWithoutTime.getTime() - today.getTime();
    const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diff < 0) {
      return { text: `${Math.abs(diff)} days overdue!`, color: '#d32f2f' };
    } else if (diff === 0) {
      return { text: 'Due today!', color: '#f57c00' };
    } else if (diff === 1) {
      return { text: 'Due tomorrow', color: '#f57c00' };
    } else if (diff <= 3) {
      return { text: `${diff} days left`, color: '#f57c00' };
    } else {
      return { text: `${diff} days left`, color: '#4caf50' };
    }
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
};

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card sx={{ margin: '0 1rem' }}>
        <CardContent>
          <Typography component='h2'>{todoList.title}</Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
          >
            {todos.length === 0 ? (
              <Typography variant='body2' sx={{ my: 2, fontStyle: 'italic' }}>
                No todos yet. Add a new todo to get started!
              </Typography>
            ) : (
              todos.map((todo, index) => {
                const TodoItemContainer = todo.completed ? CompletedTodoItem : TodoItem
                const timeStatus = getTimeStatus(todo.dueDate)

                return (
                  <TodoItemContainer key={todo.id || index}>
                    <Typography sx={{ margin: '8px', minWidth: '20px' }} variant='h6'>
                      {index + 1}
                    </Typography>

                    <Checkbox
                      checked={!!todo.completed}
                      onChange={() => handleToggleComplete(index)}
                    />

                    <TextField
                      sx={{
                        flexGrow: 1,
                        marginTop: '0',
                        '& .MuiInputBase-root': { height: '56px' },
                      }}
                      label='What to do?'
                      value={todo.text || ''}
                      onChange={(event) => handleUpdateTodoText(index, event.target.value)}
                    />

                    <Box sx={{ ml: 1, minWidth: '150px', display: 'flex', alignItems: 'center' }}>
                      <DatePicker
                        label='Due date'
                        value={todo.dueDate ? parseISO(todo.dueDate) : null}
                        onChange={(date) => handleUpdateDueDate(index, date)}
                        slotProps={{
                          textField: {
                            size: 'small',
                            fullWidth: true,
                            sx: { mt: 0 },
                          },
                        }}
                      />
                    </Box>

                    {timeStatus && (
                      <Tooltip title={timeStatus.text}>
                        <Typography
                          variant='caption'
                          sx={{
                            ml: 1,
                            color: timeStatus.color,
                            fontWeight: 'bold',
                            minWidth: '100px',
                          }}
                        >
                          {timeStatus.text}
                        </Typography>
                      </Tooltip>
                    )}

                    <IconButton
                      size='small'
                      color='secondary'
                      onClick={() => handleDeleteTodo(index)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TodoItemContainer>
                )
              })
            )}

            <CardActions>
              <Button type='button' color='primary' onClick={handleAddTodo} startIcon={<AddIcon />}>
                Add Todo
              </Button>

              <Button type='submit' variant='contained' color='primary'>
                Save
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </LocalizationProvider>
  )
}
