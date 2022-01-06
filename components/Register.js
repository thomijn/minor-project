import { useContext, useState } from "react";
import styled from "styled-components";
import Dropdown from "./generic/Dropdown";
import Input, { TextArea, StyledLabel } from "./generic/Input";
import Button from "./generic/Button";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import { UserContext } from "../lib/context";
import toast from "react-hot-toast";
import { firestore } from "../lib/firebase";
import ImageUploader from "./generic/ImageUploader";

const Register = () => {
  const [downloadURL, setDownloadURL] = useState(null);

  const [iAm, setIAm] = useState("Mantelzorger, case manager ...");
  const [iCare, setICare] = useState("Mijn vader, mijn moeder ...");
  const [phase, setPhase] = useState("Middenfase");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(UserContext);

  const router = useRouter();

  const handleRegister = async (data) => {
    if (downloadURL) {
      try {
        firestore
          .collection("users")
          .doc(user.uid)
          .set(
            {
              ...data,
              iAm,
              iCare,
            },
            { merge: true }
          );
        router.push("/onboard");
      } catch (error) {
        console.log(error);
        toast.error("Er is iets misgegaan");
      }
    } else toast.error("Nog geen profielfoto uitgekozen");
  };

  return (
    <Wrapper>
      <Circle />

      <>
        <h1>
          Maak een <br /> account <br />
          <Span>Vertel wat over uzelf</Span>
        </h1>
        <FormWrapper>
          <form onSubmit={handleSubmit(handleRegister)}>
            <Input
              style={{ marginBottom: -8 }}
              {...register("firstname", {
                required: { value: true, message: "Dit veld is verplicht" },
                maxLength: { value: 32, message: "Maximaal 32 tekens" },
                minLength: { value: 2, message: "Minimaal 2 tekens" },
              })}
              label="Voornaam"
              placeholder="Voornaam"
            />
            <ErrorSpan marginTop="16px">{errors?.firstname?.message}</ErrorSpan>
            <Dropdown
              label="Ik ben"
              title={iAm}
              setTitle={setIAm}
              name="group"
              items={["Mantelzorger", "Case manager"]}
            />
            <div style={{ marginBottom: 16, marginTop: 0 }}>
              <Dropdown
                label="Ik zorg voor"
                title={iCare}
                setTitle={setICare}
                name="group"
                items={["Vader", "Moeder", "Oma", "Opa", "Vriend", "Vriendin"]}
              />
            </div>
            <Input
              {...register("hoursWeek", {
                required: { value: true, message: "Dit veld is verplicht" },
                maxLength: { value: 32, message: "Maximaal 32 tekens" },
                minLength: { value: 2, message: "Minimaal 2 tekens" },
              })}
              label="Hoeveel uur per dag"
              placeholder="4 uur"
            />
            <ErrorSpan>{errors?.hoursWeek?.message}</ErrorSpan>

            <div style={{ marginBottom: 16, marginTop: -16 }}>
              <Dropdown
                info={
                  <>
                    <h4>Waarom vragen wij hiernaar?</h4>{" "}
                    <p style={{ lineHeight: 1.4 }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec a lectus aliquam, finibus tellus vitae, posuere est.
                      Proin a euismod urna. Vivamus commodo maximus dui, ac
                      placerat tortor viverra in.
                    </p>{" "}
                  </>
                }
                label="Hij/zij zit in de"
                title={phase}
                setTitle={setPhase}
                name="fase"
                items={["Beginfase", "Middenfase", "Eindfase"]}
              />
            </div>

            <StyledLabel>Over mij</StyledLabel>
            <TextArea
              style={{ marginTop: 0 }}
              {...register("whoAmI", {
                required: { value: true, message: "Dit veld is verplicht" },
                maxLength: { value: 300, message: "Maximaal 300 tekens" },
                minLength: { value: 2, message: "Minimaal 2 tekens" },
              })}
              label="Over mij"
              placeholder="Vertel wat over jezelf"
            />
            <ErrorSpan marginTop="-10px">{errors?.whoAmI?.message}</ErrorSpan>
            <Button type="submit" fullWidth variant="fill">
              Profiel compleet maken
            </Button>
          </form>
        </FormWrapper>

        <ImageUploader
          downloadURL={downloadURL}
          setDownloadURL={setDownloadURL}
          uid={user.uid}
        />
      </>
    </Wrapper>
  );
};

export const ErrorSpan = styled.span`
  display: inline-block;
  position: relative;
  color: hsl(0, 70%, 70%);
  margin-top: ${(props) => props.marginTop};
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-x: hidden;
  position: absolute;

  h1 {
    position: absolute;
    top: 48px;
    left: 24px;
    line-height: 1.1;
    color: #fff;
    z-index: 1;
  }
`;

export const Circle = styled.div`
  position: absolute;
  width: 680px;
  height: 680px;
  margin: auto;
  left: 50%;
  transform: translateX(-50%);
  top: -400px;
  border-radius: 50%;
  background: #5f1d7d;
  z-index: 0;
`;

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
`;

export const Span = styled.div`
  transform: translateY(-10px);
  display: inline-block;
  font-weight: 400;
  font-size: 0.9rem;
  color: #fbcb22;
  z-index: 1;
`;

export const Wrap = styled.div`
  padding: 24px;
  position: relative;
  top: 300px;

  p {
    margin-bottom: 32px;
  }

  h2 {
    color: #5f1d7d;
    margin-bottom: 8px;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  top: 250px;
  position: relative;

  padding: 64px 24px 24px 24px;
  color: #fff;
  margin-bottom: 16px;

  input {
    margin-bottom: 16px;
  }
`;

export default Register;
