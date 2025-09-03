import { useMediaQuery, useTheme } from "@mui/material";
import { logOut as logOutAction } from "@redux/slices/authSlice";
import { useGetPostsQuery } from "@services/rootApi";
import { throttle } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    // Dispatch the logout action
    dispatch(logOutAction());

    // Navigate to the login page
    navigate("/login", { replace: true }); //replace: true to prevent going back to the previous page, clears the history stack
  };

  return { logOut };
};

export const useUserInfo = () => {
  return useSelector((state) => state.auth.userInfo);
};

export const useDetectLayout = () => {
  const theme = useTheme();
  const isMediumLayout = useMediaQuery(theme.breakpoints.down("md"));

  return { isMediumLayout };
};

export const useLazyLoadPosts = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isSuccess, isFetching } = useGetPostsQuery({ offset, limit });

  const previousDataRef = useRef();

  useEffect(() => {
    if (isSuccess && data && previousDataRef.current !== data) {
      if (!data.length) {
        setHasMore(false);
        return;
      }

      previousDataRef.current = data;
      console.log({ data, isSuccess });

      setPosts((prevPosts) => {
        return [...prevPosts, ...data];
      });
    }
  }, [data, isSuccess]);

  const loadMore = useCallback(() => {
    setOffset((offset) => offset + limit);
  }, []);

  useInfiniteScroll({ hasMore, isFetching, loadMore });

  return { posts, isFetching };
};

export const useInfiniteScroll = ({
  hasMore,
  isFetching,
  loadMore,
  threshould = 50,
  throttleDelay = 500,
}) => {
  const handleScroll = useMemo(() => {
    return throttle(() => {
      console.log("SCROLLINGGG");

      if (!hasMore) {
        return;
      }

      const scrollTop = document.documentElement.scrollTop; // b
      const scrollHeight = document.documentElement.scrollHeight; // a
      const clientHeight = document.documentElement.clientHeight; // c

      if (
        scrollTop + clientHeight + threshould >= scrollHeight &&
        !isFetching
      ) {
        console.log("SHOULD TRIGGER API");
        loadMore();
      }
    }, throttleDelay);
  }, [isFetching, hasMore, loadMore, threshould, throttleDelay]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); // Cancel any pending throttled calls
    };
  }, [handleScroll]);
};
