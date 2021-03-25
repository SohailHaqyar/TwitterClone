import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";

import axios from "../../axios";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "98%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "28px 38px",
    },
  })
);

interface PostFeedProps {}

export const PostFeed: React.FC<PostFeedProps> = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      await fetchNewPosts();
    })();
  }, []);

  const fetchNewPosts = async () => {
    const res = await axios.get(`/posts`);
    console.log(res);
    setPosts(res.data);
  };

  const classes = useStyles();
  console.log(posts);
  return (
    <div className={classes.root}>
      <div style={{ width: "50%" }}>
        <CreatePost fetchNewPosts={fetchNewPosts} />
        {posts.length &&
          posts.map((post) => (
            <Post key={post.id} post={post} fetchNewPosts={fetchNewPosts} />
          ))}
      </div>
    </div>
  );
};
