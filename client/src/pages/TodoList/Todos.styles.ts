import { createStyles, makeStyles } from "@material-ui/core";

export default makeStyles(
  createStyles({
    container: {
      display: "flex",
      background: "#fff",
      justifyContent: "center",
      height: "100vh",
      width: "100%",
      padding: 24,
    },

    wrapper: {
      width: "75%",
      heigth: "80%",
      padding: 14,
    },
    todoList: {
      padding: 0,
      margin: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 15,
    },
    input: {
      width: "80%",
    },
    todoIcon: {
      display: "flex",
      alignItems: "center",
    },
    todo: {
      borderRadius: 7,
      background: "#fff",
      width: "75%",
      margin: 10,
      padding: 15,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& span": {
        marginLeft: 10,
      },

      border: "1px solid #ddd",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
        cursor: "pointer",
      },
    },

    trashIcon: {
      "&:hover": {
        color: "crimson",
      },
    },
  })
);
