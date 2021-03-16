import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import useTodoStyles from "./Todos.styles";
import axios from "../../axios";

interface IProps {
  setTodos: React.Dispatch<React.SetStateAction<any[]>>;
  todos: any[];
}

export const TodoForm: React.FC<IProps> = ({ setTodos, todos }) => {
  const [todo, setTodo] = useState("");
  const styles = useTodoStyles();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post("/tasks", { title: todo, description: "" });
    setTodo("");
    if (res.status === 201) {
      setTodos([...todos, { title: todo, description: "" }]);
    } else {
      alert("Clean your room!");
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className={styles.input}
        variant="outlined"
        label="Add todo"
      />
    </form>
  );
};
