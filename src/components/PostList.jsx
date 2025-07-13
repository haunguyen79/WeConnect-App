import React from "react";
import Post from "./Post";
import { useGetPostsQuery } from "@services/rootApi";

const PostList = () => {
  const { data, isSuccess, isLoading, isFetching } = useGetPostsQuery();

  console.log({ data });

  return (
    <div className="flex flex-col gap-4">
      {(data || []).map((post) => (
        <Post
          key={post._id}
          fullName={post.author.fullName}
          createdAt={post.createdAt}
          content={post.content}
          image={post.image}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

export default PostList;
