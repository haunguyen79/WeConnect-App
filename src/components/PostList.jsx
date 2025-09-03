import React from "react";
import Post from "./Post";
import Loading from "./Loading";
import { useLazyLoadPosts } from "@hooks/index";

const PostList = () => {
  const { posts, isFetching } = useLazyLoadPosts();

  // const [offset, setOffset] = useState(0);
  // const limit = 10;
  // const [posts, setPosts] = useState([]);
  // const [hasMore, setHasMore] = useState(true);

  // const { data, isSuccess, isFetching } = useGetPostsQuery({ offset, limit });

  // const previousDataRef = useRef();

  // console.log({ data });

  // useEffect(() => {
  //   if (isSuccess && data && previousDataRef.current !== data) {
  //     if (!data.length) {
  //       setHasMore(false);
  //       return;
  //     }

  //     previousDataRef.current = data;
  //     console.log({ data, isSuccess });

  //     setPosts((prevPosts) => {
  //       return [...prevPosts, ...data];
  //     });
  //   }
  // }, [data, isSuccess]);

  // const handleScroll = useMemo(() => {
  //   return throttle(() => {
  //     console.log("SCROLLINGGG");

  //     if (!hasMore) {
  //       return;
  //     }

  //     const scrollTop = document.documentElement.scrollTop; // b
  //     const scrollHeight = document.documentElement.scrollHeight; // a
  //     const clientHeight = document.documentElement.clientHeight; // c

  //     if (scrollTop + clientHeight + 50 >= scrollHeight && !isFetching) {
  //       console.log("SHOULD TRIGGER API");
  //       // setOffset((offset) => offset + limit);
  //       loadMore();
  //     }
  //   }, 1000);
  // }, [isFetching, hasMore, loadMore]);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     handleScroll.cancel(); // Cancel any pending throttled calls
  //   };
  // }, [handleScroll]);

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

      {isFetching && <Loading />}
    </div>
  );
};

export default PostList;
