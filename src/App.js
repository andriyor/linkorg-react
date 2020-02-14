import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import Post from "./Post";
import { LinkOrgContext, linkOrgService } from './link-org-context'

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
  const [postURL, setPostURL] = useState("");
  const [posts, setPosts] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFilter, setSelectedFilter] = React.useState([]);
  
  let providers = {
    twitter: RegExp("twitter"),
    reddit: RegExp("reddit"),
    youtube: RegExp("youtube"),
    github: RegExp("github"),
    instagram: RegExp("instagram"),
    telegram: RegExp("t.me"),
    image: RegExp(".(gif|jpg|jpeg|tiff|png)"),
    video: RegExp(".mp4")
  };


  useEffect(() => {
    linkOrgService.fetchPosts().then(posts => setPosts(posts));
    linkOrgService.fetchTags().then(tags => setAvailableTags(tags));
  }, []);

  function handleRemove(postId) {
    setPosts(posts.filter(p => postId !== p.id));
    linkOrgService.deletePost(postId);
  }
  
  function createPost() {
    const currentProvider = Object.keys(providers).find(provider =>
        providers[provider].test(postURL)
    );
    const post = {
      provider: currentProvider,
      href: postURL,
      tags: selectedTags
    };
    linkOrgService.sendPost(post).then(newPost => (setPosts([...posts, newPost])));
  }

   const onFilterChange = selectedOptions => {
     setSelectedFilter(selectedOptions)
  };

  const onTagsChange = selectedOptions => {
    setSelectedTags(selectedOptions)
  };

  return (
    <LinkOrgContext.Provider value={linkOrgService}>
      <div>
        <div className={classes.postAdding}>
          <TextField
            id="standard-name"
            label="URL"
            className={classes.textField}
            value={postURL}
            onChange={event => setPostURL(event.target.value)}
            margin="normal"
          />
          <Select
            isMulti
            name="tags"
            className={classes.tagSelect}
            options={availableTags}
            value={selectedTags}
            onChange={onTagsChange}
          />
          <Button variant="contained" className={classes.button} onClick={createPost}>
            Add Post
          </Button>
        </div>
        <div className={classes.filterPost}>
          <div className={classes.filter}>Filter</div>
          <Select
            isMulti
            name="tags"
            className={classes.tagSelect}
            options={availableTags}
            value={selectedFilter}
            onChange={onFilterChange}
          />
        </div>
        {posts.map((post, index) =>
          <Post
            post={post}
            key={index}
            availableTags={availableTags}
            onRemove={handleRemove}
          />
        )}
      </div>
    </LinkOrgContext.Provider>
  );
}

export default App;
