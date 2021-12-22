import { useRouter } from "next/dist/client/router";
import { Camera, ChevronLeft, MessageSquare, Trash2 } from "react-feather";
import styled from "styled-components";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { HamburgerMenu } from "../../components/HamburgerMenu";
import { auth, firestore, getUserDoc, postToJSON } from "../../lib/firebase";
import { GoBack, Option, Wrapper } from "../../styles/homeStyles";
import HeartButtonPost from "../../components/generic/HeartButtonPost";
import AuthCheck from "../../components/generic/AuthCheck";
import { TextArea } from "../../components/generic/Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Button from "../../components/generic/Button";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../lib/context";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/nl";

dayjs.locale("nl");

const Post = (props) => {
  const [comment, setComment] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const userData = useContext(UserContext);

  const { slug, uid } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(uid)
    .collection("posts")
    .doc(slug);
  const [realtimePost] = useDocumentData(postRef);

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
          lastname: userData.lastname,
          uid: userData.user.uid,
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

  return (
    <AuthCheck>
      <Wrapper>
        <GoBack onClick={() => router.push("/home")}>
          <ChevronLeft size={20} /> Ga terug
        </GoBack>

        <h1>{post.title}</h1>

        {post.image && (
          <Block>
            <img src={post.image} />
          </Block>
        )}

        <div style={{ display: "flex", gap: 8 }}>
          <Option
            style={{
              backgroundColor: "#faca3b",
              color: "#5f1d7d",
              borderColor: "#faca3b",
              fontSize: "0.9rem",
              padding: "4px 8px",
              marginBottom: "16px",
            }}
          >
            {post?.phase}
          </Option>

          <Option
            style={{
              backgroundColor: "#E2C7DD",
              fontSize: "0.9rem",
              padding: "4px 8px",
              marginBottom: "16px",
            }}
          >
            {post.category}
          </Option>
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
                    <Avatar />
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
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const CommentWrapper = styled(motion.div)`
  width: calc(100% + 48px);
  left: -24px;
  position: relative;
  padding: 16px 24px;
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
  background-color: #c4c4c4;
  border: 2px solid #5f1d7d;
  border-radius: 50%;
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
