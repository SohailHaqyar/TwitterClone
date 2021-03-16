import useTodoStyles from "./Todos.styles";
import { CheckCircleOutline, DeleteOutline } from "@material-ui/icons";
import axios from "../../axios";

interface ITodo {
  todo: string;
  id: number;
  setTodos: React.Dispatch<React.SetStateAction<any[]>>;
  todos: any[];
}
export const Todo: React.FC<ITodo> = ({ todo, id, setTodos, todos }) => {
  const styles = useTodoStyles();

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
      <div className={styles.todoIcon}>
        <CheckCircleOutline />
        <span>{todo}</span>
      </div>
      <DeleteOutline
        className={styles.trashIcon}
        onClick={() => handleDelete(id)}
      />
    </li>
  );
};
