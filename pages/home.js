import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { MessageSquare, ThumbsUp, Plus } from "react-feather";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/nl";

dayjs.locale("nl");

import { useBbox } from "../lib/hooks";
import {
  TimelineWrapper,
  Wrapper,
  Card,
  Timeline,
  Col,
  Indicator,
  Option,
  OptionsWrapper,
  Image,
  TitleSpan,
  WhoWrapper,
  WhoOption,
  FloatButton,
  EngagementWrapper,
} from "../styles/homeStyles";
import { HamburgerMenu } from "../components/HamburgerMenu";
import AuthCheck from "../components/generic/AuthCheck";
import { firestore, postToJSON } from "../lib/firebase";
import HeartButton from "../components/generic/HeartButton";

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

const options = [
  { name: "Alles" },
  { name: "Activiteiten" },
  { name: "Ervaringen" },
  { name: "Verhalen" },
  { name: "Anders" },
];

const whoOptions = [
  { name: "publiek", id: 1 },
  { name: "vrienden", id: 2 },
  { name: "privé", id: 3 },
];

export default function Home(props) {
  const { posts } = props;
  const [phaseColor, setPhaseColor] = useState("#faca3b");
  const [phase, setPhase] = useState("Beginfase");
  const [isScrolling, setScrolling] = useState(false);
  const [bboxCard, ref2] = useBbox();
  const [bboxtimeLine, ref1] = useBbox();
  const [scrollHeight, setScrollHeight] = useState(0);
  const [selected, setSelected] = useState("Alles");
  const [whoSelected, setWhoSelected] = useState(2);
  const [indicatorY, setIndicatorY] = useState(0);
  const router = useRouter();

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

  const filteredPosts = posts.filter((post) => {
    if (selected === "Alles") return post;
    else return post.category === selected;
  });

  useEffect(() => {
    const number = Math.floor((scrollHeight + 80) / (260 + 16) + 1);

    console.log(number);
    if (number > 0 && number < 3) {
      setPhaseColor("hsl(45, 95%, 61%)");
      setPhase("Beginfase");
    } else if (number > 3 && number < 6) {
      setPhaseColor("hsl(45, 95%, 51%)");
      setPhase("Middenfase");
    } else if (number > 6 && number < 9) {
      setPhaseColor("hsl(45, 95%, 41%)");
      setPhase("Eindfase");
    }

    if (bboxtimeLine.height) {
      setIndicatorY(
        Math.round(((scrollHeight + 80) / (10 * 260)) * bboxtimeLine.height)
      );
    }
  }, [scrollHeight, 260, bboxtimeLine.height]);

  return (
    <AuthCheck>
      <Wrapper>
        <h1>Tijdlijn</h1>

        <WhoWrapper>
          {whoOptions.map((option) => (
            <WhoOption
              initial={false}
              key={option.id}
              onClick={() => setWhoSelected(option.id)}
              animate={{
                backgroundColor: whoSelected === option.id ? "#5f1d7d" : "#fff",
                color: whoSelected === option.id ? "#fff" : "#818181",
              }}
            >
              {option.name}
            </WhoOption>
          ))}
        </WhoWrapper>

        <div
          style={{
            overflowX: "hidden",
            width: "calc(100% + 48px)",
            position: "relative",
            left: -24,
          }}
        >
          <OptionsWrapper dragConstraints={{ right: 0, left: -215 }} drag="x">
            {options.map((option) => (
              <Option
                initial={false}
                key={option.name}
                onClick={() => setSelected(option.name)}
                animate={selected === option.name ? "selected" : "default"}
                variants={optionsVariants}
              >
                {option.name}
              </Option>
            ))}
          </OptionsWrapper>
        </div>

        <HamburgerMenu menu={true} toggleMenu={false} />

        <TimelineWrapper>
          <Col flex="1">
            <AnimatePresence exitBeforeEnter initial={false}>
              <div style={{ height: 260 * 10 }}>
                <Timeline
                  ref={ref1}
                  initial={{ x: -50 }}
                  exit={{ x: -50 }}
                  key={2}
                  versionTwo
                  animate={{ backgroundColor: phaseColor, x: 0 }}
                >
                  <Indicator
                    onPointerMove={(e) => {
                      setScrolling(true);
                    }}
                    variants={indicatorVariants}
                    custom={{ color: phaseColor }}
                    animate={isScrolling ? "full" : "round"}
                    style={{ x: -6, y: indicatorY }}
                    versionTwo
                  >
                    <motion.span animate={{ opacity: isScrolling ? 1 : 0 }}>
                      {phase}
                    </motion.span>
                  </Indicator>
                </Timeline>
              </div>
              )}
            </AnimatePresence>
          </Col>
          <Col style={{ overflowX: "hidden" }} flex="30">
            {!filteredPosts.length ? (
              <p>Geen berichten gevonden :(</p>
            ) : (
              filteredPosts.map((post) => (
                <Card ref={ref2} key={post.id}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      gap: "16px",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2>
                      {post.title}{" "}
                      <TitleSpan>
                        {dayjs(post.createdAt).format("D MMMM")} |{" "}
                        {post.firstname}
                      </TitleSpan>
                    </h2>

                    <Image />
                  </div>
                  <p>{post.message}</p>
                  <Link href={`/${post.uid}/${post.slug}`}>Lees meer...</Link>
                  <EngagementWrapper>
                    <HeartButton post={post} />

                    <div
                      onClick={() => router.push(`/${post.uid}/${post.slug}`)}
                    >
                      <MessageSquare size={20} /> {post.comments.length}
                    </div>
                  </EngagementWrapper>
                </Card>
              ))
            )}
          </Col>
        </TimelineWrapper>

        <FloatButton onClick={() => router.push("/nieuw")}>
          <Plus strokeWidth={4} />
        </FloatButton>
      </Wrapper>
    </AuthCheck>
  );
}

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc");

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}
