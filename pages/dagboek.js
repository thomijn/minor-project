import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { debounce, filter, forEach } from "lodash";
import { MessageSquare, Plus, Filter, ChevronDown, User } from "react-feather";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/nl";
import { arrayRemove, arrayUnion, doc } from "firebase/firestore";

dayjs.locale("nl");

import { useBbox } from "../lib/hooks";
import {
  TimelineWrapper,
  Wrapper,
  Card,
  Col,
  Image,
  TitleSpan,
  FloatButton,
  EngagementWrapper,
  Timeline,
  Indicator,
} from "../styles/homeStyles";
import { HamburgerMenu } from "../components/HamburgerMenu";
import AuthCheck from "../components/generic/AuthCheck";
import { auth, firestore, postToJSON } from "../lib/firebase";
import HeartButton from "../components/generic/HeartButton";
import FilterModal from "../components/generic/FilterModal";
import styled from "styled-components";
import SortModal from "../components/generic/SortModal";
import { useStore } from "../store";

export default function Home(props) {
  const { posts } = props;
  const [phaseColor, setPhaseColor] = useState("#faca3b");
  const [phase, setPhase] = useState("Beginfase");
  const [isScrolling, setScrolling] = useState(false);
  const [bboxCard, ref2] = useBbox();
  const [bboxtimeLine, ref1] = useBbox();
  const [scrollHeight, setScrollHeight] = useState(0);
  const [indicatorY, setIndicatorY] = useState(0);
  const [sortOn, setSortOn] = useState("Nieuw");
  const [filterOn, setFilterOn] = useState({
    phase: ["Beginfase", "Middenfase", "Eindfase"],
    categories: ["Activiteiten", "Ervaringen", "Verhalen", "Foto's"],
  });
  const [sortModal, setSortModal] = useState();
  const [filterModal, setFilterModal] = useState();
  const router = useRouter();
  const { id } = useStore();

  console.log(isScrolling);

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

  let filteredPosts = posts.filter((post) => {
    return (
      filterOn.phase.includes(post.phase) &&
      filterOn.categories.includes(post.category)
    );
  });

  filteredPosts = filteredPosts.filter(
    (post) => post?.uid === auth?.currentUser?.uid
  );

  console.log(filteredPosts);

  useEffect(() => {
    if (id) {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          top: 100,
        });
      }
    }
  }, [id]);

  useEffect(() => {
    const number = Math.floor((scrollHeight + 80) / (260 + 16) + 1);

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

    if (600) {
      setIndicatorY(Math.round(((scrollHeight + 80) / (10 * 260)) * 600));
    }
  }, [scrollHeight, bboxtimeLine]);

  return (
    <AuthCheck>
      <Wrapper layoutScroll style={{ overflowY: "scroll" }}>
        <h1>Dagboek</h1>

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
          <div
            onClick={() => setSortModal(true)}
            style={{
              gap: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            Sorteren op <ChevronDown size={22} />
          </div>
        </div>

        <HamburgerMenu menu={true} toggleMenu={false} />

        <TimelineWrapper>
          <Col flex="1">
            <AnimatePresence exitBeforeEnter initial={false}>
              <div style={{ height: 260 * 10 }}>
                <Timeline
                  ref={ref1}
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
            </AnimatePresence>
          </Col>
          <LayoutGroup>
            <Col
              layoutScroll
              style={{ overflowX: "hidden", overflowY: "scroll" }}
              flex="30"
            >
              {!filteredPosts.length ? (
                <p>Geen berichten gevonden :(</p>
              ) : (
                filteredPosts.map((post, index) => {
                  return (
                    <Card layout id={post.slug} ref={ref2} key={post.slug}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          gap: "16px",
                          justifyContent: "space-between",
                        }}
                      >
                        <motion.h2
                          transition={{ duration: 0 }}
                          layoutScroll
                          layout="position"
                          layoutId={post.title}
                        >
                          {post.title}{" "}
                          <TitleSpan>
                            {dayjs(post.createdAt).format("D MMMM")} |{" "}
                            {post.firstname}
                          </TitleSpan>
                        </motion.h2>

                        <Image>
                          <motion.img src={post?.userImage} />
                        </Image>
                      </div>
                      {post.image && (
                        <PostImage
                          transition={{ duration: 0 }}
                          layoutScroll
                          layout
                          layoutId={post.image}
                          src={post.image}
                        />
                      )}
                      <p>{post.message}</p>
                      <Link href={`/${post.uid}/${post.slug}`}>
                        Lees meer...
                      </Link>
                      <EngagementWrapper>
                        <HeartButton post={post} />
                        <div
                          onClick={() => {
                            router.push(`/${post.uid}/${post.slug}`);
                          }}
                        >
                          <MessageSquare size={20} /> {post.comments.length}
                        </div>
                      </EngagementWrapper>
                    </Card>
                  );
                })
              )}
            </Col>
          </LayoutGroup>
        </TimelineWrapper>
        <FloatButton onClick={() => router.push("/nieuw")}>
          <Plus strokeWidth={4} size={28} />
        </FloatButton>
      </Wrapper>

      <AnimatePresence>
        {sortModal && (
          <SortModal
            modalFunc={setSortModal}
            func={setSortOn}
            value={sortOn}
            options={["Nieuw", "Fase", "Populariteit", "Reacties"]}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {filterModal && (
          <FilterModal
            modalFunc={setFilterModal}
            func={setFilterOn}
            value={filterOn}
          />
        )}
      </AnimatePresence>
    </AuthCheck>
  );
}

const PostImage = styled(motion.img)`
  margin-bottom: 32px;
  width: 100%;
  position: relative;
  max-height: 200px;
  object-fit: cover;
  border-radius: 6px;
`;

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
