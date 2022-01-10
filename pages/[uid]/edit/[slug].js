import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { ChevronLeft } from "react-feather";
import { useForm } from "react-hook-form";
import kebabCase from "lodash.kebabcase";
import { useContext } from "react";
import toast from "react-hot-toast";

import AuthCheck from "../../../components/generic/AuthCheck";
import Dropdown from "../../../components/generic/Dropdown";
import Input, { TextArea } from "../../../components/generic/Input";
import Button from "../../../components/generic/Button";
import { HamburgerMenu } from "../../../components/HamburgerMenu";
import { GoBack, Wrapper } from "../../../styles/homeStyles";
import { auth, firestore, serverTimestamp } from "../../../lib/firebase";
import { UserContext } from "../../../lib/context";
import ImageUploaderPost from "../../../components/generic/ImageUploaderPost";
import { ErrorSpan } from "../../../components/Register";
import { useDocumentData } from "react-firebase-hooks/firestore";

const EditPost = () => {
  const [who, setWho] = useState();
  const [category, setCategory] = useState();
  const [phase, setPhase] = useState();
  const [downloadURL, setDownloadURL] = useState(null);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const userData = useContext(UserContext);

  const { slug, uid } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(uid)
    .collection("posts")
    .doc(slug);
  const [realtimePost] = useDocumentData(postRef);

  console.log(downloadURL);

  useEffect(() => {
    if (realtimePost) {
      setWho(realtimePost.who);
      setPhase(realtimePost.phase);
      setCategory(realtimePost.category);
      setValue("title", realtimePost.title);
      setValue("message", realtimePost.message);
      setDownloadURL(realtimePost.image);
    }
  }, [realtimePost]);

  const handleEditPost = async (formData) => {
    const slug = encodeURI(kebabCase(formData.title));

    try {
      const uid = auth.currentUser.uid;
      const ref = firestore
        .collection("users")
        .doc(uid)
        .collection("posts")
        .doc(slug);

      const data = {
        slug,
        uid,
        ...formData,
        who,
        category,
        phase,
        image: downloadURL,
        userImage: userData.userImage,
        firstname: userData.firstname,
        published: true,
        updatedAt: serverTimestamp(),
      };

      await ref.set(data, { merge: true });
      toast.success("Bericht gedeeld!");
      router.push("/home");
    } catch (error) {
      console.log(error);
      toast.error("Er is iets misgegaan");
    }
  };

  return (
    <AuthCheck>
      <Wrapper style={{ marginBottom: 32, height: "auto" }}>
        <GoBack onClick={() => router.push("/home")}>
          <ChevronLeft size={20} /> Ga terug
        </GoBack>
        <HamburgerMenu />

        <h1>
          Bericht <br /> wijzigen
        </h1>

        <form onSubmit={handleSubmit(handleEditPost)}>
          <div>
            <Dropdown
              label="Zichtbaar voor"
              title={who}
              setTitle={setWho}
              name="group"
              items={["Publiek", "Privé"]}
            />
          </div>

          <div>
            <Dropdown
              label="Categorie"
              title={category}
              setTitle={setCategory}
              name="group"
              items={["Activiteiten", "Ervaringen", "Verhalen", "Anders"]}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <Dropdown
              label="Fase"
              title={phase}
              setTitle={setPhase}
              name="fase"
              items={["Beginfase", "Middenfase", "Eindfase"]}
            />
          </div>

          <ImageUploaderPost
            downloadURL={downloadURL}
            setDownloadURL={setDownloadURL}
          />

          <Input
            style={{ opacity: 0.4 }}
            disabled
            {...register("title", {
              required: { value: true, message: "Dit veld is verplicht" },
              maxLength: { value: 64, message: "Maximaal 64 tekens" },
              minLength: { value: 6, message: "Minimaal 6 tekens" },
            })}
            label="Titel"
            placeholder="Voer hier een titel in"
          />
          <ErrorSpan>{errors?.title?.message}</ErrorSpan>

          <TextArea
            {...register("message", {
              required: { value: true, message: "Dit veld is verplicht" },
              minLength: { value: 6, message: "Minimaal 6 tekens" },
            })}
            placeholder="Bericht schrijven"
          />
          <ErrorSpan>{errors?.message?.message}</ErrorSpan>

          <Button type="submit" fullWidth variant="fill">
            Bericht Wijzigen
          </Button>
        </form>
      </Wrapper>
    </AuthCheck>
  );
};

export default EditPost;
