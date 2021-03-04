import "./app.sass";
import React, { useEffect, useState } from "react";
import { deleteTodo, getTodos, postTodo, putTodo } from "../../services";
import { Todo } from "../../types";
import { TodoCard, TodoAddCard } from "../shared";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const getData = async () => {
    try {
      setLoading(false);
      const todos = await getTodos();

      if (todos !== undefined) {
        setTodoList(todos.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeTodo = async (index: number, todo: Todo) => {
    let newTodo = { ...todoList[index], ...todo };
    putTodo(index, newTodo);
    getData();
  };

  const onDeleteTodo = (index: number) => {
    deleteTodo(index);
    getData();
  };

  const onCreateTodo = (todo: Todo) => {
    postTodo(todo);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <section className="hero is-small is-info">
        <div className="hero-body">
          <h1 className="title">Todo List</h1>
        </div>
      </section>
      {loading && <p>Loading...</p>}
      <div className="container is-max-desktop">
        <TodoAddCard onCreate={onCreateTodo} />
        {todoList.map((todo, index) => (
          <TodoCard
            todo={todo}
            index={index}
            key={todo.id}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};
