import { motion } from "framer-motion";
import { ThumbsUp } from "react-feather";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { auth, firestore, increment } from "../../lib/firebase";

const HeartButton = ({ post }) => {
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
    <motion.div
      initial={false}
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
    </motion.div>
  );
};

export default HeartButton;
