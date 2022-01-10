import { useRouter } from "next/dist/client/router";
import {
  Camera,
  ChevronLeft,
  Edit,
  MessageSquare,
  Trash2,
} from "react-feather";
import styled from "styled-components";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Link from "next/link";

import { HamburgerMenu } from "../../components/HamburgerMenu";
import { auth, firestore, getUserDoc, postToJSON } from "../../lib/firebase";
import { GoBack, Option, TitleSpan, Wrapper } from "../../styles/homeStyles";
import HeartButtonPost from "../../components/generic/HeartButtonPost";
import AuthCheck from "../../components/generic/AuthCheck";
import { TextArea } from "../../components/generic/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Button from "../../components/generic/Button";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../lib/context";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/nl";
import { useStore } from "../../store";

dayjs.locale("nl");

const Post = (props) => {
  const [comment, setComment] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const userData = useContext(UserContext);
  const { setId } = useStore();

  const { slug, uid } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(uid)
    .collection("posts")
    .doc(slug);
  const [realtimePost] = useDocumentData(postRef);

  useEffect(() => {
    setId(slug);
  }, []);

  const post = realtimePost || props.post;

  const handleNewComment = async (data) => {
    try {
      postRef.update({
        comments: arrayUnion({
          ...data,
          createdAt: Date(),
          updatedAt: Date(),
          id: Date.now(),
          firstname: userData.firstname,
          uid: userData.user.uid,
          userImage: userData?.userImage,
        }),
      });

      toast.success("Reactie geplaatst");
      setComment(false);
    } catch (error) {
      console.log(error);
      toast.error("Er is iets misgegaan");
    }
  };

  const deleteComment = async (comment) => {
    try {
      postRef.update({
        comments: arrayRemove(comment),
      });

      toast.success("Je reactie is verwijderd");
      setComment(false);
    } catch (error) {
      console.log(error);
      toast.error("Er is iets misgegaan");
    }
  };

  const handleDelete = async () => {
    try {
      firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("posts")
        .doc(slug)
        .delete();
      toast.success("Bericht verwijderd");
      router.push("/home");
    } catch (error) {
      toast.error("Er is iets fout gegaan");
    }
  };

  return (
    <AuthCheck>
      <Wrapper>
        <Link scroll={false} href="/home">
          <GoBack>
            <ChevronLeft size={20} /> Ga terug
          </GoBack>
        </Link>

        <motion.h1 layout="position" layoutId={post.title}>
          {post.title}
          <TitleSpan>
            {dayjs(post.createdAt).format("D MMMM")} | {post.firstname}
          </TitleSpan>
        </motion.h1>

        {post.image && (
          <Block>
            <motion.img layout layoutId={post.image} src={post.image} />
          </Block>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Option
                style={{
                  backgroundColor: "#faca3b",
                  color: "#5f1d7d",
                  borderColor: "#faca3b",
                  fontSize: "0.9rem",
                  padding: "6px 8px",
                  marginBottom: "16px",
                }}
              >
                {post?.phase}
              </Option>

              <Option
                style={{
                  backgroundColor: "#E2C7DD",
                  fontSize: "0.9rem",
                  padding: "6px 8px",
                  marginBottom: "16px",
                }}
              >
                {post.category}
              </Option>
            </div>
            {auth?.currentUser?.uid === uid && (
              <div style={{ display: "flex", gap: 8 }}>
                <div
                  onClick={() => handleDelete()}
                  style={{
                    backgroundColor: "#F2F2F2",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                >
                  <Trash2 size={20} strokeWidth={2} color="#5f1d7d" />
                </div>
                <div
                  onClick={() =>
                    router.push({
                      pathname: "/[uid]/edit/[slug]",
                      query: { uid, slug },
                    })
                  }
                  style={{
                    backgroundColor: "#F2F2F2",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                >
                  <Edit size={20} strokeWidth={2} color="#5f1d7d" />
                </div>
              </div>
            )}
          </div>

          <p style={{ whiteSpace: "pre-wrap" }}>{post.message}</p>

          <Row style={{ marginTop: "16px", gap: 8 }}>
            <HeartButtonPost post={post} />
            <ActionButton onClick={() => setComment(!comment)}>
              <MessageSquare size={20} /> {post.comments.length}
            </ActionButton>
          </Row>

          {comment && (
            <CommentWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <form onSubmit={handleSubmit(handleNewComment)}>
                <TextArea
                  {...register("message", {
                    required: { value: true, message: "Dit veld is verplicht" },
                    minLength: { value: 6, message: "Minimaal 6 tekens" },
                  })}
                  placeholder="Reactie schrijven"
                />
                <Button type="submit" fullWidth variant="fill">
                  Reactie plaatsen
                </Button>
              </form>
            </CommentWrapper>
          )}

          <CommentWrapper layout>
            <Triangle />
            <h3>Reacties</h3>

            {!post.comments.length ? (
              <p
                onClick={() => setComment(true)}
                style={{
                  color: "#fff",
                  marginTop: 32,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Plaats de eerste reactie!
              </p>
            ) : (
              post.comments.map((comment) => (
                <Comment key={comment.id}>
                  <Row>
                    <Col>
                      <Avatar>
                        <img src={comment?.userImage} />
                      </Avatar>
                    </Col>
                    <Col>
                      <h4>
                        {comment.firstname} {comment.lastname}
                      </h4>
                      <span>
                        {dayjs(comment.createdAt).format("DD/MM/HH:mm")}
                      </span>
                    </Col>
                    {comment?.uid === userData?.user?.uid && (
                      <Col
                        onClick={() => deleteComment(comment)}
                        style={{ marginLeft: "auto" }}
                      >
                        <Trash2 size={20} color="#5f1d7d" />
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <p>{comment.message}</p>
                  </Row>
                </Comment>
              ))
            )}
          </CommentWrapper>
        </motion.div>
      </Wrapper>
    </AuthCheck>
  );
};

export async function getStaticProps({ params }) {
  const { uid, slug } = params;
  const userDoc = await getUserDoc(uid);

  let post;
  let path;
  if (userDoc) {
    const postRef = userDoc.collection("posts").doc(slug);

    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  const snapshot = await firestore.collectionGroup("posts").get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, uid } = doc.data();
    return {
      params: { uid, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export const Block = styled.div`
  width: calc(100% + 48px);
  left: -24px;
  position: relative;
  height: 200px;
  margin: 48px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CommentWrapper = styled(motion.div)`
  width: calc(100% + 48px);
  left: -24px;
  position: relative;
  padding: 16px 24px 32px 24px;
  margin: 16px 0px;
  background-color: #5f1d7d;

  h3 {
    color: #faca3b;
    font-size: 1.5rem;
  }
`;

export const Triangle = styled.div`
  position: absolute;
  background-color: #fff;
  margin: auto;
  left: 0px;
  right: 0px;
  width: 0;
  height: 0;
  border-left: 30px solid #5f1d7d;
  border-right: 30px solid #5f1d7d;
  border-top: 30px solid #fff;
  transform: translateY(-16px);
`;

export const Comment = styled.div`
  width: 100%;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  margin-top: 16px;

  h4 {
    margin-bottom: -5px;
  }

  span {
    font-weight: bold;
    font-size: 0.8rem;
  }

  p {
    margin-top: 8px;
  }
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 50%;
  border: 2px solid #5f1d7d;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;

  img {
    object-fit: cover;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

export const Row = styled.div`
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Col = styled.div`
  flex: ${(props) => props.flex};
`;

export const ActionButton = styled.div`
  border-radius: 10px;
  width: fit-content;
  height: 40px;
  padding: 5px;
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  gap: 8px;
  color: #5f1d7d;
  justify-content: center;
`;

export default Post;
