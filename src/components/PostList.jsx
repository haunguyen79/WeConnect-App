import React from "react";
import Post from "./Post";

const PostList = () => {
  return (
    <div className="flex flex-col gap-4">
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default PostList;
