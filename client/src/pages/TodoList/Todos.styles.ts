import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      height: "100vh",
      width: "100%",
      padding: 24,
      background: "#eef2f7",
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
      width: "100%",
      "& .Mui-focused": {
        borderBottom: `1.5px solid ${theme.palette.primary.main}`,
      },
    },
    todo: {
      borderRadius: 35,
      background: "#fff",
      width: "75%",
      margin: 10,
      padding: 15,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& input": {
        marginLeft: 10,
      },
    },

    trashIcon: {
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        color: "crimson",
        cursor: "pointer",
      },
    },

    todoInput: {
      width: "100%",
    },
  })
);
