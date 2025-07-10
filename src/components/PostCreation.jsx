import { useUserInfo } from "@hooks/useUserInfo";
import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { openDialog } from "@redux/slices/dialogSlice";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";

export const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log({ acceptedFiles });

    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: ".jpg, .jpeg, .png",
  });

  return (
    <div>
      <div
        {...getRootProps({
          className:
            "rounded px-6 py-4 border text-center bg-slate-100 cursor-pointer h-20 flex items-center",
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      {image?.name && (
        <Stack className="mt-2">
          <Chip
            label={image?.name}
            onDelete={() => setImage(null)}
            className="font-bold"
          />
        </Stack>
      )}
    </div>
  );
};

const PostCreation = () => {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 rounded bg-white p-4 shadow">
      <Avatar className="!bg-primary">
        {userInfo.fullName?.[0].toUpperCase()}
      </Avatar>

      <TextField
        className="flex-1"
        size="small"
        placeholder="What's on your mind"
        onClick={() =>
          dispatch(
            openDialog({
              title: "Example Dialog",
              contentType: "NEW_POST_DIALOG",
              additionalData: userInfo,
            }),
          )
        }
      />
    </div>
  );
};

export default PostCreation;
