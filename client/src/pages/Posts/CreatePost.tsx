import Button from "@material-ui/core/Button";
import axios from "../../axios";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { FormikTextField as TextField } from "../../components";
import * as yup from "yup";

export const PostSchema = yup.object({}).shape({
  title: yup.string().required().min(5).max(50),
  body: yup.string().required().min(10).max(400),
});

interface SubmitValues {
  title: string;
  body: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      background: "#fdfdfd",
      margin: "20px 0",
      padding: "18px 18px",
    },
    img: {
      width: 150,
      height: 150,
      borderRadius: "50%",
      border: `3px solid ${theme.palette.primary.main}`,
      padding: 1.2,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: 400,
      textAlign: "center",
      textTransform: "uppercase",
    },
  })
);

const CreatePost: React.FC<{ fetchNewPosts: any }> = ({ fetchNewPosts }) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Create a new post</h2>
      <Formik
        initialValues={{ title: "", body: "" }}
        validationSchema={PostSchema}
        onSubmit={async (
          values: SubmitValues,
          formikHelpers: FormikHelpers<SubmitValues>
        ) => {
          const { body, title } = values;
          await axios.post("/posts", { title, body });
          fetchNewPosts();
          formikHelpers.setSubmitting(false);
          formikHelpers.resetForm();
        }}
      >
        {(props) => (
          <Form className={styles.form}>
            <TextField name="title" label="Headline" />
            <TextField name="body" label="Description" multiline />
            <Button
              style={{ marginTop: "18px" }}
              fullWidth
              color="primary"
              type="submit"
              variant="contained"
              disabled={props.isSubmitting}
              disableElevation
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePost;

{
  /* <form
        className={classes.form}
        onSubmit={async (e) => {
          e.preventDefault();
        }}
      >
        <TextField
          label="Headline"
          fullWidth
          margin="normal"
          variant="outlined"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={5}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Submit Post
        </Button>
      </form>
      

 */
}
