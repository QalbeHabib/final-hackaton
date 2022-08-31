export function getUser(user) {
    return {
      type: 'ADD_TODO',
      payload: {
        } 
    }
  }

export function removeTodo(id) {
    return {
      type: 'ADD_TODO',
      id
    }
  }