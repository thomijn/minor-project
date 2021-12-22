import { useContext, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Camera, ChevronLeft } from "react-feather";
import { useRouter } from "next/dist/client/router";

import Dropdown from "../components/generic/Dropdown";
import Input, { StyledLabel, TextArea } from "../components/generic/Input";
import Button from "../components/generic/Button";
import { UserContext } from "../lib/context";
import { firestore } from "../lib/firebase";
import { GoBack } from "../styles/homeStyles";
import { OtherWrapper } from "../styles/loginStyles";
import ImageUploader from "../components/generic/ImageUploader";

const MyData = () => {
  const userData = useContext(UserContext);
  const [iAm, setIAm] = useState(userData?.iAm);
  const [iCare, setICare] = useState(userData?.iCare);
  const [phase, setPhase] = useState(userData?.phase);

  const { register, handleSubmit } = useForm();

  const router = useRouter();

  const handleEditProfile = async (data) => {
    try {
      firestore
        .collection("users")
        .doc(userData?.user?.uid)
        .set(
          {
            ...data,
            iAm,
            iCare,
            phase,
          },
          { merge: true }
        );
      router.push("/home");
      toast.success("Gegevens aangepast!");
    } catch (error) {
      console.log(error);
      toast.error("Er is iets misgegaan");
    }
  };

  return (
    <Wrapper>
      <GoBack
        style={{ color: "#faca3b", top: 24, left: 24, position: "absolute" }}
        onClick={() => router.push("/home")}
      >
        <ChevronLeft size={20} /> Ga terug
      </GoBack>
      <Circle />
      <h1 style={{ top: 72 }}>
        Profiel <br /> Aanpassen <br />
      </h1>

      <FormWrapper>
        <form onSubmit={handleSubmit(handleEditProfile)}>
          <Input
            defaultValue={userData.firstname}
            style={{ marginBottom: -8 }}
            {...register("firstname", {
              required: { value: true, message: "Dit veld is verplicht" },
              maxLength: { value: 32, message: "Maximaal 32 tekens" },
              minLength: { value: 2, message: "Minimaal 2 tekens" },
            })}
            label="Voornaam"
            placeholder="Voornaam"
          />
          <Dropdown
            label="Ik ben"
            title={iAm}
            setTitle={setIAm}
            name="group"
            items={["Mantelzorger", "Case manager"]}
          />
          <div style={{ marginBottom: 32 }}>
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
            defaultValue={userData.hoursWeek}
            label="Hoeveel uur per week"
            placeholder="10 uur"
          />

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
            defaultValue={userData?.whoAmI}
            style={{ marginTop: 0 }}
            {...register("whoAmI", {
              required: { value: true, message: "Dit veld is verplicht" },
              maxLength: { value: 32, message: "Maximaal 32 tekens" },
              minLength: { value: 2, message: "Minimaal 2 tekens" },
            })}
            label="Over mij"
            placeholder="Vertel wat over jezelf"
          />

          <Button type="submit" fullWidth variant="fill">
            Opslaan
          </Button>
        </form>
        <OtherWrapper invert={true}>
          <p>Toch niet tevreden?</p>
          <a onClick={() => router.push("/home")}>Wijzigingen annuleren</a>
        </OtherWrapper>
      </FormWrapper>
      <ImageUploader photo={userData?.userImage} />
    </Wrapper>
  );
};

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

export default MyData;
