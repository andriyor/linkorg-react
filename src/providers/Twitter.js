import React from "react";

function Twitter({ href }) {
  return (
    <blockquote className="twitter-tweet">
      <a href={href}></a>
    </blockquote>
  );
}

export default Twitter;
