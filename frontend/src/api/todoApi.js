const API_BASE_URL = 'http://localhost:3001/api'

export const fetchTodoLists = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todolists`)
    if (!response.ok) {
      throw new Error('Failed to fetch todo lists')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching todo lists:', error)
    throw error
  }
}

export const createTodoList = async (title) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todolists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
    if (!response.ok) {
      throw new Error('Failed to create todo list')
    }
    return await response.json()
  } catch (error) {
    console.error('Error creating todo list:', error)
    throw error
  }
}

export const updateTodoList = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todolists/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to update todo list')
    }
    return await response.json()
  } catch (error) {
    console.error('Error updating todo list:', error)
    throw error
  }
}
