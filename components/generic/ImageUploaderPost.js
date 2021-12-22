import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Camera, Loader } from "react-feather";
import styled from "styled-components";
import { auth, storage, STATE_CHANGED, firestore } from "../../lib/firebase";

// Uploads images to Firebase Storage
export default function ImageUploaderPost({ setDownloadURL, downloadURL }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);

      // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          setDownloadURL(url);
          setUploading(false);
        });
    });
  };

  return (
    <Wrapper onClick={handleClick}>
      <input
        ref={hiddenFileInput}
        style={{ display: "none" }}
        type="file"
        onChange={uploadFile}
        accept="image/x-png,image/gif,image/jpeg"
      />
      <strong>
        {uploading
          ? progress
          : downloadURL
          ? "foto is geupload"
          : "Foto uploaden"}
      </strong>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  color: #5f1d7d;
  border: none;
  border-radius: 7px;
  margin-bottom: 16px;
  padding: 8px 24px;
  background: #faca3b;
  z-index: 1;
  left: 24px;
  top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
  }

  img {
    object-fit: cover;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;
