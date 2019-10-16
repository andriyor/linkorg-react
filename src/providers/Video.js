import React from "react";

function Video({ href }) {
  return <video controls src={href}></video>;
}

export default Video;
