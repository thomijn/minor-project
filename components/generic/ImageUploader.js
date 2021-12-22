import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Camera, Loader } from "react-feather";
import styled from "styled-components";
import { auth, storage, STATE_CHANGED, firestore } from "../../lib/firebase";

// Uploads images to Firebase Storage
export default function ImageUploader({ photo, uid }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  console.log(auth.currentUser.uid);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(
      `uploads/${uid ? uid : auth.currentUser.uid}/${Date.now()}.${extension}`
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
          console.log(url);
          try {
            firestore
              .collection("users")
              .doc(uid ? uid : auth.currentUser.uid)
              .set(
                {
                  userImage: url,
                },
                { merge: true }
              );
          } catch (error) {
            console.log(error);
          }

          setDownloadURL(url);
          setUploading(false);
        });
    });
  };

  return (
    <Avatar onClick={handleClick}>
      <input
        ref={hiddenFileInput}
        style={{ display: "none" }}
        type="file"
        onChange={uploadFile}
        accept="image/x-png,image/gif,image/jpeg"
      />
      {uploading ? (
        <Loader size={30} color="gray" />
      ) : (
        <Camera size={30} color="gray" />
      )}

      {!downloadURL && photo && <motion.img src={photo} />}
      {downloadURL && <motion.img src={downloadURL} />}
    </Avatar>
  );
}

export const Avatar = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #5f1d7d;
  background: #f2f2f2;
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
