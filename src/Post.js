import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Select from "react-select";

import Telegram from "./providers/Telegram";
import Twitter from "./providers/Twitter";
import Youtube from "./providers/Youtube";
import Reddit from "./providers/Reddit";
import Image from "./providers/Image";
import Video from "./providers/Video";
import Github from "./providers/Github";
import Instagram from "./providers/Instagram";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  postAction: {
    display: "flex",
    flexDirection: "column"
  },
  post: {
    display: "flex",
    margin: "15px"
  }
}));

function Post({ post, tags, onRemove }) {
  const classes = useStyles();
  const providers = {
    twitter: Twitter,
    reddit: Reddit,
    telegram: Telegram,
    youtube: Youtube,
    image: Image,
    github: Github,
    video: Video,
    instagram: Instagram
  };
  const ComponentName = providers[post.provider.name];

  function onCopy(href) {
    navigator.clipboard.writeText(href);
  }

  return (
    <div data-test-id="post-wrapper">
      <div
        className={classes.post}
        data-test-id={post.provider.name}
      >
        <ComponentName
          href={post.href}
        >
        </ComponentName>
        <div className={classes.postAction}>
          <IconButton
            className={classes.button}
            aria-label="delete"
            onClick={() => onRemove(post.id)}
          >
            <Icon>clear</Icon>
          </IconButton>
          <IconButton
            className={classes.button}
            aria-label="delete"
            data-test-id="copy"
            onClick={() => onCopy(post.href)}
          >
            <Icon>content_copy</Icon>
          </IconButton>
        </div>
      </div>
      <Select
        isMulti
        name="tags"
        defaultValue={post.tags}
        className={classes.tagSelect}
        options={tags}
      />
    </div>
  );
}

export default Post;
