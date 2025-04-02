import React, { Fragment, useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import { TodoListForm } from './TodoListForm';
import * as todoApi from '../../api/todoApi';

// Styled components for completed list items
const CompletedListItem = styled(ListItemButton)`
  background-color: #f5f5f5;
  text-decoration: line-through;
`;

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({});
  const [activeList, setActiveList] = useState(null);
  const [newListTitle, setNewListTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todo lists from API
  const fetchLists = async () => {
    try {
      setIsLoading(true);
      const lists = await todoApi.fetchTodoLists();
      setTodoLists(lists);
      setError(null);
    } catch (err) {
      setError('Failed to load todo lists. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Create a new list
  const handleCreateList = async () => {
    if (!newListTitle.trim()) return;

    try {
      const newList = await todoApi.createTodoList(newListTitle);
      setTodoLists({
        ...todoLists,
        [newList.id]: newList,
      });
      setNewListTitle('');
    } catch (err) {
      setError('Failed to create new list. Please try again.');
      console.error(err);
    }
  };

  // Check if all todos in a list are completed
  const isListCompleted = (list) => {
    if (!list.todos || list.todos.length === 0) return false;
    return list.todos.every((todo) => todo.completed);
  };

  // Update a todo list
  const saveTodoList = async (id, updatedData) => {
    try {
      const updatedList = await todoApi.updateTodoList(id, updatedData);
      // Only update state if there's an actual change to prevent re-renders
      if (JSON.stringify(todoLists[id]) !== JSON.stringify(updatedList)) {
        setTodoLists(prevLists => ({
          ...prevLists,
          [id]: updatedList,
        }));
      }
    } catch (err) {
      setError('Failed to save list. Please try again.');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ margin: '2rem', color: 'error.main' }}>
        <Typography variant="body1">{error}</Typography>
        <Button variant="outlined" color="primary" onClick={fetchLists} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component="h2">My Todo Lists</Typography>
          
         {/* Create new list input  */}
          <Box sx={{ display: 'flex', mt: 2, mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Create list title"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateList()}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleCreateList}
              startIcon={<AddIcon />}
              sx={{ ml: 1 }}
            >
              CREATE
            </Button>
          </Box>
          
          {/* List of todo lists */}
          {Object.keys(todoLists).length === 0 ? (
            <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
              No todo lists yet. Create your first one!
            </Typography>
          ) : (
            <List>
              {Object.keys(todoLists).map((key) => {
                const list = todoLists[key];
                const completed = isListCompleted(list);
                const ListItemComponent = completed ? CompletedListItem : ListItemButton;
                
                return (
                  <ListItemComponent 
                    key={key} 
                    onClick={() => setActiveList(key)}
                    selected={activeList === key}
                  >
                    <ListItemIcon sx={{  display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        checked={completed}
                        disabled={!list.todos.length}
                        onChange={(e) => {
                          e.stopPropagation();
                          // We can't directly change completion status of a list
                          // It's determined by its todo items
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText primary={list.title} />
                  </ListItemComponent>
                );
              })}
            </List>
          )}
        </CardContent>
      </Card>
      
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={saveTodoList}
        />
      )}
    </Fragment>
  );
};