import { makeStyles, Theme, createStyles } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
    },
    title: { fontSize: 28, marginTop: 15, fontWeight: 400 },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
      width: "50%",
      borderRadius: "5px",
      background: "#fdfdfd",
      boxShadow: "20px 20px 60px #d7d7d7,-20px -20px 60px #ffffff",
    },
    form: {
      display: "flex",
      padding: 32,
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
    },
    logo: {
      backgroundColor: theme.palette.primary.main,
      padding: "15px 40px",
      borderRadius: "50%",
      boxShadow: `0px 0px 12px ${theme.palette.primary.main}`,
    },
    logoText: {
      fontFamily: "Bad Script",
      fontSize: 40,
      color: "white",
    },
  })
);
