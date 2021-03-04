import axios from 'axios'
import { Todo } from '../types'
import { getItem, setItem } from './local-storage-service'


const TODOS = 'TODOS';

export const getTodos = async () => {
  const todos = getItem<Todo[]>(TODOS);

  if (todos) {
    return todos;
  }

  const response = await axios.get<Todo[]>('/todos')

  setItem(TODOS, response.data);

  return response.data;
}

export const deleteTodo = (index: number) => {
  const todos = getItem<Todo[]>(TODOS);

  if (!todos) {
    return
  }

  todos.reverse().splice(index, 1)
  setItem(TODOS, todos.reverse());
}

export const postTodo = (todo: Todo) => {
  const todos = getItem<Todo[]>(TODOS);

  if (!todos) {
    return
  }

  todo.id = createId(todos);

  setItem(TODOS, [...todos, todo])
}

export const putTodo = (index: number, todo: Todo) => {
  const todos = getItem<Todo[]>(TODOS);

  if (!todos) {
    return
  }

  let newTodo = { ...todo };
  todos.reverse()[index] = newTodo;

  setItem(TODOS, todos.reverse())
}

const createId = (todos: Todo[]) => {
  let biggestId = 0;

  todos.forEach((todo: Todo) => {
    if (todo.id && biggestId < todo.id) {
      biggestId = todo.id;
    }
    return biggestId
  })

  return biggestId + 1
}