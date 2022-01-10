import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/dist/client/router";
import {
  Clock,
  Dribbble,
  Info,
  LogOut,
  PlusCircle,
  Settings,
} from "react-feather";

import { auth } from "../../lib/firebase";
import { useStore } from "../../store";
import { UserContext } from "../../lib/context";

const links = [
  { text: "Overzicht", url: "/home", icon: <Clock size={17} /> },
  {
    text: "Activiteiten",
    url: "/challenges",
    icon: <Dribbble size={17} />,
  },
  { text: "Informatie", url: "/info", icon: <Info size={17} /> },
  { text: "Bericht plaatsen", url: "/nieuw", icon: <PlusCircle size={17} /> },
];

const SideMenu = () => {
  const { menu, toggleMenu } = useStore();
  const router = useRouter();
  const userData = useContext(UserContext);

  useEffect(() => {
    if (menu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [menu]);

  useEffect(() => {
    setTimeout(() => {
      toggleMenu(false);
    }, 0);
  }, [router.pathname]);

  return (
    <>
      <SideMenuWrapper
        initial={{ x: "100%" }}
        transition={{ duration: 0.6, type: "spring" }}
        animate={{ x: !menu ? "100%" : "10%" }}
      >
        <motion.div
          transition={{ delay: menu ? 0.2 : 0 }}
          animate={{ opacity: menu ? 1 : 0 }}
        >
          <PersonWrapper onClick={() => router.push("/dagboek")}>
            <Avatar>
              <img src={userData?.userImage} />
            </Avatar>
            <p>{userData?.firstname}</p>
          </PersonWrapper>
          <hr style={{ margin: "16px 0px", width: "86%" }} />

          <LinksWrapper>
            <ul>
              {links.map((item) => (
                <li key={item.url}>
                  {router.pathname === item.url && <Active layoutId="active" />}

                  <Link passHref href={item.url}>
                    <Span active={router.pathname === item.url}>
                      {item.icon} {item.text}
                    </Span>
                  </Link>
                </li>
              ))}
            </ul>
          </LinksWrapper>

          <UnderWrapper>
            <hr />
            <span
              onClick={() => {
                router.push("/mijn-gegevens");
              }}
            >
              <Settings color="#fbcb22" size={17} /> Profiel bewerken
            </span>
            <span
              onClick={() => {
                auth.signOut();
                setTimeout(() => {
                  router.push("/");
                }, 200);
              }}
            >
              <LogOut color="#fbcb22" size={17} /> Uitloggen
            </span>
          </UnderWrapper>

          <Logo width={50} src="/images/logo.png" />
          <LogoText>Mantelcare</LogoText>
        </motion.div>
      </SideMenuWrapper>
      <AnimatePresence>
        {menu && (
          <Overlay
            onClick={() => toggleMenu(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export const SideMenuWrapper = styled(motion.div)`
  position: fixed;
  height: 100%;
  border-radius: 15px 0px 0px 0px;
  background-color: #5f1d7d;
  padding: 32px 24px 24px 24px;
  right: 0px;
  min-width: 250px;
  z-index: 12;
  font-size: 1.1rem;
  font-size: 0.9rem;
`;

export const PersonWrapper = styled(motion.div)`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 50px;

  p {
    font-size: 1.1rem;
    color: #fff;
  }
`;

export const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #c5c5c5;
  opacity: 0.6;
  z-index: 11;
`;

export const UnderWrapper = styled(motion.div)`
  position: absolute;
  bottom: 162px;
  width: 100%;

  span {
    display: inline-block;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 16px;
    color: #fff;
    margin: 24px 8px 0px 8px;
  }
`;

export const Avatar = styled(motion.div)`
  width: 40px;
  height: 40px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid #5f1d7d;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;

  img {
    object-fit: cover;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

export const LinksWrapper = styled(motion.div)`
  margin-top: 32px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    font-size: 1.1rem;
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  a {
    color: #fff;

    cursor: pointer;
    text-decoration: none;
  }
`;

export const Span = styled.span`
  display: flex;
  align-items: center;
  color: ${(props) => (props.active ? "#5f1d7d" : "#fff")};
  gap: 8px;
  padding: 4px 8px;

  svg {
    color: ${(props) => (props.active ? "#5f1d7d" : "#fbcb22")};
  }
`;

export const Active = styled(motion.div)`
  position: absolute;
  right: 0;
  width: 100%;
  height: 120%;
  background-color: #fbcb22;
  border-radius: 10px 0px 0px 10px;
  padding: 6px 8px;
  z-index: -1;
`;

export const Logo = styled(motion.img)`
  position: absolute;
  margin: auto;
  left: -10%;
  right: 0;
  bottom: 58px;
`;

export const LogoText = styled(motion.p)`
  position: absolute;
  margin: auto;
  right: 0;
  left: -10%;
  text-align: center;
  color: #fff;
  font-weight: 700;
  bottom: 22px;
`;

export default SideMenu;
