import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import Button from "../components/generic/Button";
import { Circle, Span, Wrap, Wrapper } from "../components/Register";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";

const contents = [
  {
    title1: "Over",
    title2: "Mantelcare",
    subTitle: "Wat wij voor u doen",
    text: "Wij willen een paar dingen van u weten. Wij willen graag weten voor wie u zorgt, hoeveel uur u per week aan de zorg besteed en in welke fase van Alzheimer de persoon zit. Op deze manier wordt het makkelijker voor u en voor anderen om in contact te komen met mensen die hetzelfde meemaken. ",
  },
  {
    title1: "Over uw",
    title2: "berichten",
    subTitle: "Berichten plaatsen",
    text: "Wij willen een paar dingen van u weten. Wij willen graag weten voor wie u zorgt, hoeveel uur u per week aan de zorg besteed en in welke fase van Alzheimer de persoon zit. Op deze manier wordt het makkelijker voor u en voor anderen om in contact te komen met mensen die hetzelfde meemaken. ",
  },
  {
    title1: "Over uw",
    title2: "account",
    subTitle: "Wat wij van u vragen",
    text: "Wij willen een paar dingen van u weten. Wij willen graag weten voor wie u zorgt, hoeveel uur u per week aan de zorg besteed en in welke fase van Alzheimer de persoon zit. Op deze manier wordt het makkelijker voor u en voor anderen om in contact te komen met mensen die hetzelfde meemaken. ",
  },
];

const Onboard = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();

  return (
    <Wrapper>
      <Circle />

      <h1>
        {contents[step].title1} <br /> {contents[step].title2} <br />
        <Span>Voordat u aan de slag gaat</Span>
      </h1>

      <Wrap>
        <h2> {contents[step].subTitle}</h2>
        <p>{contents[step].text}</p>

        <Button
          onClick={() => {
            if (step !== 2) setStep(step + 1);
            else router.push("/home");
          }}
          fullWidth
          variant="fill"
        >
          Volgende
        </Button>

        <Controls>
          <DotsWrapper>
            <Dot
              onClick={() => setStep(0)}
              animate={{ background: step === 0 ? "#C68EBC" : "#fff" }}
            />
            <Dot
              onClick={() => setStep(1)}
              animate={{ background: step === 1 ? "#C68EBC" : "#fff" }}
            />
            <Dot
              onClick={() => setStep(2)}
              animate={{ background: step === 2 ? "#C68EBC" : "#fff" }}
            />
          </DotsWrapper>
          <p>Weet u alles al? </p>
          <Link href="/home">Uitleg overslaan</Link>
        </Controls>
      </Wrap>
    </Wrapper>
  );
};

const Controls = styled.div`
  margin-top: 32px;
  justify-content: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    text-align: center;
    margin: 0;
  }

  a {
    margin-top: -8px;
    font-weight: 700;
    text-align: center;
  }
`;
const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Dot = styled(motion.div)`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid #5f1d7d;
`;

export default Onboard;
