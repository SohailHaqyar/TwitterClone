import {
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  MenuProps,
  Theme,
} from "@material-ui/core";
import moment from "moment";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { DeleteOutline } from "@material-ui/icons";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import axios from "../../axios";
import { Formik, Form, FormikHelpers } from "formik";
import { FormikTextField as TextField } from "../../components";
import { PostSchema } from "./CreatePost";
import { useAuthDataContext } from "../../contexts/AuthContext";

interface SubmitValues {
  title: string;
  body: string;
}

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #fff",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const useStyles = makeStyles(({ palette: { primary: { main } } }: Theme) =>
  createStyles({
    root: {
      width: "100%",
      position: "relative",
      background: "#ffffff",
      margin: "20px 0",
      borderRadius: 25,
      padding: "12px 15px",
    },
    postContainer: {
      display: "flex",
      alignItems: "center",
    },

    form: {},
    name: {
      fontSize: 18,
      color: main,
      fontWeight: 500,
    },
    profile: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    post: {
      paddingLeft: 18,
    },
    avatar: {
      marginBottom: 10,
      borderRadius: "50%",
      width: 100,
      height: 100,
      // border: `1.6px solid ${main}`,
      // padding: 2,
    },

    title: {
      textTransform: "uppercase",
      fontSize: "20px",
      fontWeight: 400,
    },
    body: {
      margin: "8px 0",
      fontSize: "16px",
    },

    moreIcon: {
      position: "absolute",
      right: "10px",
      top: "14px",
      transition: "all 0.2s ease-in-out",
    },

    date: {
      fontSize: 14,
      fontWeight: 600,
      position: "absolute",
      right: "10px",
      bottom: "14px",
    },
  })
);

interface User {
  avatar: string;
  username: string;
  email: string;
}
interface Post {
  title: string;
  created_at: string;
  body: string;
  user: User;
  id: string;
}
interface PostProps {
  post: Post;
  fetchNewPosts: any;
}

const Post: React.FC<PostProps> = ({ post, fetchNewPosts }) => {
  const styles = useStyles();
  const { username } = useAuthDataContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [isEditing, setIsEditing] = React.useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const deletePost = async (id: string) => {
    try {
      await axios.delete(`/posts/${id}`);
      await fetchNewPosts();
    } catch (e) {
      console.error(e);
      alert("Its like wrong");
    }
  };

  const returnEditingForm = () => (
    <Formik
      initialValues={{ title: post.title, body: post.body }}
      validationSchema={PostSchema}
      onSubmit={async (
        values: SubmitValues,
        formikHelpers: FormikHelpers<SubmitValues>
      ) => {
        const { body, title } = values;
        await axios.put(`/posts/${post.id}`, { title, body });
        fetchNewPosts();
        setIsEditing(!isEditing);
        formikHelpers.setSubmitting(false);
        formikHelpers.resetForm();
        setAnchorEl(null);
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
            disabled={props.isSubmitting}
            disableElevation
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );

  const returnPost = () => (
    <div className={styles.postContainer}>
      <div className={styles.profile}>
        <img src={post.user.avatar} className={styles.avatar} />
        <span className={styles.name}>{post.user.username}</span>
        <span className={styles.date}>{moment(post.created_at).fromNow()}</span>
      </div>
      <div className={styles.post}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.body}>{post.body}</p>
      </div>

      {post.user.username === username && (
        <IconButton
          className={styles.moreIcon}
          onClick={(e) => handleMenuClick(e as any)}
        >
          <MoreVertIcon />
        </IconButton>
      )}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => deletePost(post.id)}>
          <ListItemIcon>
            <DeleteOutline fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete post" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsEditing(!isEditing);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit post" />
        </MenuItem>
      </StyledMenu>
    </div>
  );

  return (
    <div className={styles.root}>
      {isEditing ? returnEditingForm() : returnPost()}
    </div>
  );
};

export default Post;
