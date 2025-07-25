import React from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  TextareaAutosize,
} from "@mui/material";
import { ImageUploader } from "@components/PostCreation";
import { useCreatePostMutation } from "@services/rootApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { closeDialog } from "@redux/slices/dialogSlice";

const NewPostDialog = ({ userInfo }) => {
  const [createNewPost, { data, isSuccess, isLoading }] =
    useCreatePostMutation();

  const [content, setContent] = useState("");

  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const handleCreateNewPost = async () => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", image);

      await createNewPost(formData).unwrap();
      dispatch(closeDialog());
      dispatch(openSnackbar({ message: "Create Post successfully!" }));
    } catch (error) {
      dispatch(
        openSnackbar({
          type: "error",
          message: error?.data?.message,
        }),
      );
    }
  };

  const isValid = !!(content || image);

  return (
    <div>
      <DialogContent>
        <div className="flex items-center gap-2">
          <Avatar
            className="!bg-primary"
            sx={{ width: "32px", height: "32px" }}
          >
            {userInfo.fullName?.[0].toUpperCase()}
          </Avatar>
          <p className="font-bold">{userInfo.fullName}</p>
        </div>

        <TextareaAutosize
          minRows={3}
          placeholder="What's on your mind?"
          className="mt-4 w-full p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <ImageUploader image={image} setImage={setImage} />
      </DialogContent>
      <DialogActions className="!px-6 !pt-0 !pb-5">
        <Button
          fullWidth
          disabled={!isValid}
          variant="contained"
          onClick={handleCreateNewPost}
        >
          {isLoading && <CircularProgress size="16px" className="mr-1" />}
          POST
        </Button>
      </DialogActions>
    </div>
  );
};

export default NewPostDialog;
