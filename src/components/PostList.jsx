import React from "react";
import Post from "./Post";
import { useGetPostsQuery } from "@services/rootApi";
import Loading from "./Loading";

const PostList = () => {
  const { data, isSuccess, isFetching } = useGetPostsQuery();

  console.log({ data });

  if (isFetching) {
    return <Loading />;
  }

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
