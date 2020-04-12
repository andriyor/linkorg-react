import React, { useEffect } from "react";

function Twitter({ href }) {
  useEffect(() => {
    window.twttr.widgets.load();
  }, []);

  return (
    <blockquote className="twitter-tweet">
      <a href={href}></a>
    </blockquote>
  );
}

export default Twitter;
