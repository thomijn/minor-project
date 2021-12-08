import { useState } from "react";
import styled from "styled-components";
import Dropdown from "./generic/Dropdown";
import Input from "./generic/Input";
import Button from "./generic/Button";
import { useRouter } from "next/dist/client/router";

const UsernameForm = () => {
  const [Iam, setIam] = useState("Mantelzorger, case manager ...");
  const [iCare, setICare] = useState("Mijn vader, mijn moeder ...");
  const router = useRouter();

  return (
    <Wrapper>
      <Circle />
      <h1>
        Maak een <br /> account <br />
        <span>Vertel wat over uzelf</span>
      </h1>

      <FormWrapper>
        <div>
          <Dropdown
            label="Ik ben"
            title={Iam}
            setTitle={setIam}
            name="group"
            items={["Mantelzorger", "Case manager"]}
          />
        </div>
        <div style={{ marginBottom: 32 }}>
          <Dropdown
            label="Ik zorg voor"
            title={iCare}
            setTitle={setICare}
            name="group"
            items={["Mantelzorger", "Case manager"]}
          />
        </div>
        <Input label="Datum vaststelling alzheimer" placeholder="24-05-2010" />

        <Input label="Hoeveel uur per week" placeholder="10 uur" />

        <Input label="Wie ben ik" placeholder="Vertel wat over jezelf" />

        <Button onClick={() => router.push("/home")} fullWidth variant="fill">
          Registreer
        </Button>
      </FormWrapper>

      <Avatar />
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-x: hidden;
  position: absolute;

  input {
    margin-bottom: 16px !important;
  }

  h1 {
    position: absolute;
    top: 48px;
    left: 24px;
    line-height: 1.1;
    color: #fff;
    z-index: 1;
  }

  span {
    transform: translateY(-10px);
    display: inline-block;
    font-weight: 400;
    font-size: 0.9rem;
    color: #fbcb22;
    z-index: 1;
  }

  input {
    margin-bottom: 16px;
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
`;

export const FormWrapper = styled.div`
  z-index: 5;
  width: 100%;
  bottom: 0px;
  top: 250px;
  position: absolute;
  padding: 64px 24px 24px 24px;
  color: #fff;
  height: fit-content;
  margin-bottom: 16px;

  input {
    z-index: -1;
  }
`;

export default UsernameForm;
