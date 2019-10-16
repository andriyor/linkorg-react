import React from "react";

function Reddit({ href }) {
  return (
    <blockquote className="reddit-card">
      <a href={href}></a>
    </blockquote>
  );
}

export default Reddit;
