import { useAuthDataContext } from "../../contexts/AuthContext";
import axios from "axios";
import { Container, Paper, Button } from "@material-ui/core";
import { Formik, Form, FormikHelpers } from "formik";
import useRegisterStyles from "./Register.styles";
import { FormikTextField as TextField } from "../../components";
import * as yup from "yup";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const API_URI = `${process.env.REACT_APP_API_URI}/auth/signup`;

const RegisterSchema = yup.object({}).shape({
  password: yup.string().min(8).required(),
  username: yup.string().min(3).max(30).required(),
});

interface SubmitValues {
  username: string;
  password: string;
}

export const Register = () => {
  const styles = useRegisterStyles();
  const history = useHistory();
  const { username: authData } = useAuthDataContext();

  if (authData !== "") {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="md" className={styles.root}>
      <Paper elevation={1} className={styles.card}>
        <h1 className={styles.title}>Register to our services </h1>
        <Formik
          validationSchema={RegisterSchema}
          initialValues={{ username: "", password: "" }}
          onSubmit={async (
            values: SubmitValues,
            formikHelpers: FormikHelpers<SubmitValues>
          ) => {
            const { username, password } = values;
            const request = await axios.post(API_URI as string, {
              username,
              password,
            });

            if (request.status === 201) {
              history.push("/login");
            }
          }}
        >
          {(props) => (
            <Form className={styles.form}>
              <TextField label="User Name" name="username" />
              <TextField type="password" label="Password" name="password" />
              <Button
                style={{ marginTop: "18px" }}
                fullWidth
                color="primary"
                variant="contained"
                type="submit"
                disabled={props.isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};
