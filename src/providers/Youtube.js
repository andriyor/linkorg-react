import React from "react";

function Reddit({ href }) {
  const [embedUrl, setembedUrl] = React.useState([]);

  const updateURL = () => {
    const usrlSearch = new URL(href).search;
    const searchParams = new URLSearchParams(usrlSearch);
    const uid = searchParams.get("v");
    return `https://www.youtube.com/embed/${uid}`;
  };

  React.useEffect(() => {
    setembedUrl(updateURL());
  }, [href]);

  return (
    <iframe
      id="ytplayer"
      type="text/html"
      width="640"
      height="360"
      title=""
      src={embedUrl}
      frameBorder="0"
    />
  );
}

export default Reddit;
