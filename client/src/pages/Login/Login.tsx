import { Container, Paper, Button } from "@material-ui/core";
import { Formik, Form, FormikHelpers } from "formik";
import { FormikTextField as TextField } from "../../components";
import axios from "axios";
import * as yup from "yup";
import { useAuthDataContext } from "../../contexts/AuthContext";
import { Redirect, useHistory } from "react-router-dom";
import useLoginStyles from "./Login.styles";

const API_URI = `${process.env.REACT_APP_API_URI}/auth/signin`;

const LoginSchema = yup.object({}).shape({
  username: yup.string().required().min(3),
  password: yup.string().required().min(8),
});

interface SubmitValues {
  username: string;
  password: string;
}
export const Login = () => {
  const styles = useLoginStyles();
  const history = useHistory();
  const { onLogin, username: authData } = useAuthDataContext();
  if (authData !== "") {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="md" className={styles.root}>
      <Paper elevation={2} className={styles.card}>
        <h1 className={styles.title}>Login to your account</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (
            values: SubmitValues,
            formikHelpers: FormikHelpers<SubmitValues>
          ) => {
            const { username, password } = values;
            const request = await axios.post(API_URI as string, {
              username,
              password,
            });

            localStorage.setItem(
              "userAccessToken",
              JSON.stringify(request.data.accessToken)
            );
            onLogin(request.data.accessToken);
            history.push("/");
          }}
        >
          {(props) => (
            <Form className={styles.form}>
              <TextField name="username" label="Username" />
              <TextField name="password" type="password" label="Password" />
              <Button
                style={{ marginTop: "18px" }}
                fullWidth
                color="primary"
                variant="contained"
                type="submit"
                disabled={props.isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};
