import { motion } from "framer-motion";
import { ThumbsUp } from "react-feather";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, firestore, increment } from "../../lib/firebase";

const HeartButtonPost = ({ post }) => {
  const postRef = firestore
    .collection("users")
    .doc(post.uid)
    .collection("posts")
    .doc(post.slug);

  const heartRef = postRef.collection("likes").doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  const [realTimePostData] = useDocumentData(postRef);

  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, { likeCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  const removeHeart = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { likeCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  const likes = realTimePostData ? realTimePostData?.likeCount : post.likeCount;

  return (
    <ActionButton
      style={{ borderRadius: 10, padding: 5 }}
      animate={{ backgroundColor: heartDoc?.exists() ? "#E1E1E1" : "#fff" }}
      onClick={() => (heartDoc?.exists() ? removeHeart() : addHeart())}
    >
      <ThumbsUp
        strokeWidth={heartDoc?.exists() ? 3 : 2}
        style={{ transform: "translateY(-1px)" }}
        size={20}
      />{" "}
      {likes}
    </ActionButton>
  );
};

export const ActionButton = styled.div`
  border-radius: 50%;
  width: fit-content;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  color: #5f1d7d;
  gap: 8px;
  justify-content: center;
`;

export default HeartButtonPost;
