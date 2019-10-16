import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import Post from "./Post";
import Telegram from "./providers/Telegram";
import Image from "./providers/Image";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  postAdding: {
    display: "flex"
  },
  tagSelect: {
    width: 400,
    margin: "20px"
  },
  filterPost: {
    display: "flex"
  },
  filter: {
    margin: "20px"
  }
}));

function App() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: ""
  });
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    function fetchPosts() {
      return fetch("http://localhost:5050/posts", {
        method: "GET",
        mode: "cors"
      })
        .then(response => response.json())
        .then(myJson => myJson);
    }
    function fetchTags() {
      return fetch("http://localhost:5050/tags", {
        method: "GET",
        mode: "cors"
      })
        .then(response => response.json())
        .then(myJson => myJson);
    }
    fetchPosts().then(posts => setPosts(posts));
    fetchTags().then(tags => setTags(tags));
  }, []);

  function handleRemove(postId) {
    console.log(postId);
    setPosts(posts.filter(p => postId !== p.id));
  }

  return (
    <div>
      <div className={classes.postAdding}>
        <TextField
          id="standard-name"
          label="URL"
          className={classes.textField}
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <Select
          isMulti
          name="tags"
          className={classes.tagSelect}
          options={tags}
        />
        <Button variant="contained" className={classes.button}>
          Add Post
        </Button>
      </div>
      <div className={classes.filterPost}>
        <div className={classes.filter}>Filter</div>
        <Select
          isMulti
          name="tags"
          className={classes.tagSelect}
          options={tags}
        />
      </div>
      {posts.map((post, index) => {
        return <Post post={post} availableTags={tags} key={index} onRemove={handleRemove}></Post>;
      })}
      
    </div>
  );
}

export default App;
