import useTodoStyles from "./Todos.styles";
import { DeleteOutline } from "@material-ui/icons";
import axios from "../../axios";
import { InputBase } from "@material-ui/core";
import { useState } from "react";

interface ITodo {
  todo: string;
  id: number;
  setTodos: React.Dispatch<React.SetStateAction<any[]>>;
  todos: any[];
}
export const Todo: React.FC<ITodo> = ({ todo, id, setTodos, todos }) => {
  const [state, setState] = useState(todo);
  const styles = useTodoStyles();

  const handleUpdate = async (id: number, data: { title: string }) => {
    try {
      const res = await axios.put(`/tasks/${id}`, data);
      console.log(res);
    } catch (e) {
      console.error(e);
      alert("I once fucked a lobster");
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`/tasks/${id}`);
      if (res.status === 200) {
        let filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
      }
    } catch (e) {
      console.log(e);
      alert("Its like wrong");
    }
  };
  return (
    <li className={styles.todo}>
      <form
        className={styles.todoIcon}
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate(id, { title: state });
          alert("Update Succesful");
        }}
      >
        <InputBase
          className={styles.todoInput}
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
          color="primary"
        />
        <button style={{ display: "none" }} type="submit" />
      </form>
      <DeleteOutline
        className={styles.trashIcon}
        onClick={() => handleDelete(id)}
      />
    </li>
  );
};
