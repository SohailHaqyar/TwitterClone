import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import useTodoStyles from "./Todos.styles";
import axios from "../../axios";
export const TodoList = () => {
  useEffect(() => {
    (async () => {
      const res = await axios.get(`/tasks`);
      setTodos(res.data);
    })();
  }, []);
  const styles = useTodoStyles();
  const [todos, setTodos] = useState<any[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <TodoForm todos={todos} setTodos={setTodos} />
        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <Todo
              todos={todos}
              setTodos={setTodos}
              todo={todo.title}
              id={todo.id}
              key={`ID:${todo.id}-TITLE:${todo.title}-NUMEROS:${Math.random()}`}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
