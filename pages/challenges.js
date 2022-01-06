import { useEffect, useState } from "react";
import { useBbox } from "../lib/hooks";
import {
  Wrapper,
  Card,
  Col,
  Option,
  OptionsWrapper,
  CardAction,
} from "../styles/homeStyles";
import { debounce } from "lodash";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { firestore, postToJSON } from "../lib/firebase";
import { Row } from "./[uid]/[slug]";
import { Filter, User } from "react-feather";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import toast from "react-hot-toast";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AuthCheck from "../components/generic/AuthCheck";
import FilterModal from "../components/generic/FilterModal";
import { AnimatePresence } from "framer-motion";

const optionsVariants = {
  selected: {
    backgroundColor: "#E2C7DD",
  },
  default: { backgroundColor: "#fff" },
};

const indicatorVariants = {
  round: (custom) => ({
    widh: 20,
    height: 20,
    backgroundColor: custom.color,
    borderRadius: "50%",
    y: custom.y,
  }),
  full: (custom) => ({
    width: "140px",
    height: "40px",
    backgroundColor: custom.color,
    borderRadius: "7px",
    y: custom.y,
  }),
};

export default function Challenges(props) {
  const [phaseColor, setPhaseColor] = useState("#faca3b");
  const [phase, setPhase] = useState("Beginfase");
  const [isScrolling, setScrolling] = useState(false);
  const [bboxCard, ref2] = useBbox();
  const [bboxtimeLine, ref1] = useBbox();
  const [scrollHeight, setScrollHeight] = useState(0);
  const [selected, setSelected] = useState("Alles");
  const [indicatorY, setIndicatorY] = useState(0);
  const userData = useContext(UserContext);
  const [filterModal, setFilterModal] = useState();
  const [filterOn, setFilterOn] = useState({
    categories: ["Activiteiten", "Binnen", "Buiten", "Knutselen", "Sport"],
  });

  const [realtimeChallenges] = useCollectionData(
    firestore.collection("challenges"),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      setScrollHeight(window.pageYOffset);
      if (!isScrolling) setScrolling(true);
    });

    window.addEventListener(
      "scroll",
      debounce(() => {
        setScrolling(false);
      }, 1000)
    );
  }, [isScrolling]);

  useEffect(() => {
    const number = Math.floor((scrollHeight + 80) / (bboxCard.height + 16) + 1);
    if (number > 0 && number < 29) {
      setPhaseColor("hsl(45, 95%, 61%)");
      setPhase("Beginfase");
    } else if (number > 29 && number < 49) {
      setPhaseColor("hsl(45, 95%, 51%)");
      setPhase("Middenfase");
    } else if (number > 49 && number < 69) {
      setPhaseColor("hsl(45, 95%, 41%)");
      setPhase("Eindfase");
    }

    if (bboxtimeLine.height) {
      setIndicatorY(
        Math.round(((scrollHeight + 80) / (206 * 100)) * bboxtimeLine.height)
      );
    }
  }, [scrollHeight, bboxCard.height, bboxtimeLine.height]);

  const handleParticipate = async (challenge) => {
    const challengeRef = firestore.collection("challenges").doc(challenge.id);

    const participate = challenge?.participants.includes(userData.user.uid);

    try {
      challengeRef.update({
        participants: participate
          ? arrayRemove(userData.user.uid)
          : arrayUnion(userData.user.uid),
      });

      toast.success(
        participate
          ? "Je doet niet meer mee met de challenge"
          : "Je doet mee met de challenge"
      );
    } catch (error) {
      console.log(error);
      toast.error("Er is iets misgegaan");
    }
  };

  const challenges = realtimeChallenges ? realtimeChallenges : props.challenges;

  const filteredChallenges = challenges.filter((challenge) => {
    return filterOn.categories.includes(challenge.category);
  });

  return (
    <AuthCheck>
      <Wrapper>
        <h1 style={{ marginBottom: 32 }}>Challenges</h1>

        <div
          style={{
            fontSize: "0.95rem",
            margin: "48px 0px 32px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#5f1d7d",
            fontWeight: "700",
          }}
        >
          <div
            onClick={() => setFilterModal(true)}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Filter size={22} /> Filters
          </div>
        </div>

        <HamburgerMenu menu={true} toggleMenu={false} />

        <Col style={{ overflowX: "hidden" }}>
          {filteredChallenges.map((challenge) => (
            <Card fill ref={ref2} key={challenge.id}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "16px",

                  justifyContent: "space-between",
                }}
              >
                <h2 style={{ marginBottom: 8 }}>{challenge.title} </h2>
              </div>
              <p
                style={{
                  WebkitLineClamp: 100,
                }}
              >
                {challenge.description}
              </p>
              <Row
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CardAction onClick={() => handleParticipate(challenge)}>
                  {challenge?.participants.includes(userData?.user?.uid)
                    ? "Niet meer deelnemen"
                    : "Doe mee!"}
                </CardAction>
                <Row
                  style={{
                    color: "#faca3b",
                    gap: 4,
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <User size={20} /> {challenge.participants.length}
                </Row>
              </Row>
            </Card>
          ))}
        </Col>
      </Wrapper>

      <AnimatePresence>
        {filterModal && (
          <FilterModal
            categoriesOptions={[
              "Activiteiten",
              "Binnen",
              "Buiten",
              "Knutselen",
              "Sport",
            ]}
            noPhase
            modalFunc={setFilterModal}
            func={setFilterOn}
            value={filterOn}
          />
        )}
      </AnimatePresence>
    </AuthCheck>
  );
}

export async function getServerSideProps(context) {
  const challengesQuery = firestore.collection("challenges");

  const challenges = (await challengesQuery.get()).docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return {
    props: { challenges }, // will be passed to the page component as props
  };
}
