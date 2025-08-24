import React, { useEffect, useRef, useState } from "react";
import Post from "./Post";
import { useGetPostsQuery } from "@services/rootApi";
import Loading from "./Loading";

const PostList = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [posts, setPosts] = useState([]);

  const { data, isSuccess, isFetching } = useGetPostsQuery({ offset, limit });

  const previousDataRef = useRef();

  console.log({ data });

  useEffect(() => {
    if (isSuccess && data && previousDataRef.current !== data) {
      previousDataRef.current = data;
      console.log({ data, isSuccess });

      setPosts((prevPosts) => {
        return [...prevPosts, ...data];
      });
    }
  }, [data, isSuccess]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop; // b
    const scrollHeight = document.documentElement.scrollHeight; // a
    const clientHeight = document.documentElement.clientHeight; // c

    if (scrollTop + clientHeight + 50 >= scrollHeight) {
      console.log("SHOULD TRIGGER API");
      setOffset(offset + limit);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // if (isFetching) {
  //   return <Loading />;
  // }

  return (
    <div className="flex flex-col gap-4">
      {(posts || []).map((post) => (
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
