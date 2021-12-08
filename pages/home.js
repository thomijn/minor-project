import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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
import { debounce } from "lodash";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { useRouter } from "next/dist/client/router";
import { MessageSquare, ThumbsUp, Plus } from "react-feather";
import AuthCheck from "../components/generic/AuthCheck";

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
  { name: "Variant 1", id: 1 },
  { name: "Variant 2", id: 2 },
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
  const [selected, setSelected] = useState(2);
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

        <OptionsWrapper>
          {options.map((option) => (
            <Option
              initial={false}
              key={option.id}
              onClick={() => setSelected(option.id)}
              animate={selected === option.id ? "selected" : "default"}
              variants={optionsVariants}
            >
              {option.name}
            </Option>
          ))}
        </OptionsWrapper>

        <HamburgerMenu menu={true} toggleMenu={false} />

        <TimelineWrapper>
          <Col flex="1">
            <AnimatePresence exitBeforeEnter initial={false}>
              {selected === 1 ? (
                <Timeline
                  initial={{ x: -50 }}
                  exit={{ x: -50 }}
                  key={1}
                  versionOne
                  animate={{ backgroundColor: phaseColor, x: 0 }}
                >
                  <Indicator
                    variants={indicatorVariants}
                    custom={{ color: phaseColor, indicatorY }}
                    animate={isScrolling ? "full" : "round"}
                    style={{ x: -6, y: 70 }}
                    versionOne
                  >
                    <motion.span animate={{ opacity: isScrolling ? 1 : 0 }}>
                      {phase}
                    </motion.span>
                  </Indicator>
                </Timeline>
              ) : (
                <div style={{ height: 100 * 206 }}>
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
                        console.log(e);
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
            {posts.map((post) => (
              <Card
                onClick={() => router.push("/post/2")}
                ref={ref2}
                key={post.id}
              >
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
                    <TitleSpan>2 december 2021 | Alex - mantelzorger</TitleSpan>
                  </h2>

                  <Image />
                </div>
                <p>
                  quia et suscipit suscipit recusandae consequuntur expedita et
                  cum reprehenderit molestiae ut ut quas totam nostrum rerum est
                  autem
                </p>

                <EngagementWrapper>
                  <div>
                    <ThumbsUp
                      style={{ transform: "translateY(-1px)" }}
                      size={20}
                    />{" "}
                    135
                  </div>

                  <div>
                    <MessageSquare size={20} /> 20
                  </div>
                </EngagementWrapper>
              </Card>
            ))}
          </Col>
        </TimelineWrapper>

        <FloatButton onClick={() => router.push("/nieuw")}>
          <Plus strokeWidth={4} />
        </FloatButton>
      </Wrapper>
    </AuthCheck>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const res = await response.json();

  const responsePhoto = await fetch(
    "https://jsonplaceholder.typicode.com/photos"
  );
  const resPhoto = await responsePhoto.json();

  return {
    props: { posts: res, photos: resPhoto },
  };
}
