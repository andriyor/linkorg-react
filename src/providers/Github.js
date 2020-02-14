import React from "react";

function Github({ href }) {
  const [repoPath, setRepoPath] = React.useState([]);

  React.useEffect(() => {
    setRepoPath(new URL(href).pathname.replace("/", ""));
  }, [href]);

  return (
    <div>
      <div
        className="github-card"
        data-github={repoPath}
        data-width="400"
        data-height=""
        data-theme="default"
      />
    </div>
  );
}

export default Github;
