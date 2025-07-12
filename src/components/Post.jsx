import { Comment, ThumbUp } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const Post = ({
  fullName = "Hunter Nguyen",
  createdAt = new Date(),
  content,
  image,
  likes = [],
  comments = [],
}) => {
  return (
    <div className="card">
      <div className="mb-3 flex gap-3">
        <Avatar className="!bg-primary">{fullName?.[0].toUpperCase()}</Avatar>
        <div>
          <p className="font-bold">{fullName}</p>
          <p className="text-dark-400">
            {dayjs(createdAt).format("DD/MM/YYYY")}
          </p>
        </div>
      </div>

      <p className="mb-1">{content}</p>
      {image && <img src={image} />}

      <div className="my-2 flex justify-between">
        <div className="flex gap-1 text-sm">
          <ThumbUp fontSize="small" className="text-primary" />
          <p>{likes.length}</p>
        </div>

        <div className="text-sm">
          <p>{comments.length} comments</p>
        </div>
      </div>

      <div className="border-dark-300 flex border-t border-b py-1">
        <Button size="small" className="!text-dark-100 flex-1">
          <ThumbUp fontSize="small" className="mr-1" /> Like
        </Button>

        <Button size="small" className="!text-dark-100 flex-1">
          <Comment fontSize="small" className="mr-1" /> Comment
        </Button>
      </div>
    </div>
  );
};

export default Post;
