import React from "react";
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  TextareaAutosize,
} from "@mui/material";
import { ImageUploader } from "@components/PostCreation";

const NewPostDialog = ({ userInfo }) => (
  <div>
    <DialogContent>
      <div className="flex items-center gap-2">
        <Avatar className="!bg-primary" sx={{ width: "32px", height: "32px" }}>
          {userInfo.fullName?.[0].toUpperCase()}
        </Avatar>
        <p className="font-bold">{userInfo.fullName}</p>
      </div>

      <TextareaAutosize
        minRows={3}
        placeholder="What's on your mind?"
        className="mt-4 w-full p-2"
      />

      <ImageUploader />
    </DialogContent>
    <DialogActions className="!px-6 !pt-0 !pb-5">
      <Button fullWidth variant="contained">
        POST
      </Button>
    </DialogActions>
  </div>
);

export default NewPostDialog;
