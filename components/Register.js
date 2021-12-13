import { useContext, useState } from "react";
import styled from "styled-components";
import Dropdown from "./generic/Dropdown";
import Input from "./generic/Input";
import Button from "./generic/Button";
import { useRouter } from "next/dist/client/router";
import { Camera } from "react-feather";
import { useForm } from "react-hook-form";
import { UserContext } from "../lib/context";
import toast from "react-hot-toast";
import { firestore } from "../lib/firebase";

const Register = () => {
  const [iAm, setIAm] = useState("Mantelzorger, case manager ...");
  const [iCare, setICare] = useState("Mijn vader, mijn moeder ...");
  const { register, handleSubmit } = useForm();
  const { user } = useContext(UserContext);

  const router = useRouter();

  const handleRegister = async (data) => {
    console.log(data);
    try {
      firestore
        .collection("users")
        .doc(user.uid)
        .set({
          ...data,
          iAm,
          iCare,
        });
      router.push("/home");
    } catch (error) {
      console.log(error);
      toast.error("Er is iets misgegaan");
    }
  };

  return (
    <Wrapper>
      <Circle />
      <h1>
        Maak een <br /> account <br />
        <Span>Vertel wat over uzelf</Span>
      </h1>

      <FormWrapper>
        <form onSubmit={handleSubmit(handleRegister)}>
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
            {...register("firstname", {
              required: { value: true, message: "Dit veld is verplicht" },
              maxLength: { value: 32, message: "Maximaal 32 tekens" },
              minLength: { value: 2, message: "Minimaal 2 tekens" },
            })}
            label="Voornaam"
            placeholder="Voornaam"
          />
          <Input
            {...register("lastname", {
              required: { value: true, message: "Dit veld is verplicht" },
              maxLength: { value: 32, message: "Maximaal 32 tekens" },
              minLength: { value: 2, message: "Minimaal 2 tekens" },
            })}
            label="Achternaam"
            placeholder="Achternaam"
          />
          <Input
            {...register("dateAlzheimer", {
              required: { value: true, message: "Dit veld is verplicht" },
              maxLength: { value: 32, message: "Maximaal 32 tekens" },
              minLength: { value: 2, message: "Minimaal 2 tekens" },
            })}
            label="Datum vaststelling alzheimer"
            placeholder="24-05-2010"
          />

          <Input
            {...register("hoursWeek", {
              required: { value: true, message: "Dit veld is verplicht" },
              maxLength: { value: 32, message: "Maximaal 32 tekens" },
              minLength: { value: 2, message: "Minimaal 2 tekens" },
            })}
            label="Hoeveel uur per week"
            placeholder="10 uur"
          />

          <Input
            {...register("whoAmI", {
              required: { value: true, message: "Dit veld is verplicht" },
              maxLength: { value: 32, message: "Maximaal 32 tekens" },
              minLength: { value: 2, message: "Minimaal 2 tekens" },
            })}
            label="Wie ben ik"
            placeholder="Vertel wat over jezelf"
          />

          <Button type="submit" fullWidth variant="fill">
            Registreer
          </Button>
        </form>
      </FormWrapper>
      <Avatar>
        <Camera size={30} color="gray" />
      </Avatar>
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

export default Register;