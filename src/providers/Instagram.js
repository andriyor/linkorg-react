import React from "react";

function instagram({ href }) {
  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={href}
      data-instgrm-version="12"
    ></blockquote>
  );
}

export default instagram;
