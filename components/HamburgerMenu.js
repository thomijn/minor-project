import { motion } from "framer-motion";
import styled from "styled-components";
import { useStore } from "../store";

export const HamburgerMenu = () => {
  const { menu, toggleMenu } = useStore();
  return (
    <HamburgerWrapper
      menu={menu}
      transition={{ duration: 0.2 }}
      onClick={() => toggleMenu(!menu)}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: menu ? -45 : 0, scale: 0.8 }}
        style={{
          width: "24px",
          height: "24px",
          transform: "rotate(0deg)",
        }}
      >
        <motion.line
          animate={{
            x1: menu ? 12 : 3.5999999999999996,
            x2: menu ? 12 : 20.4,
            y1: menu ? 2.4 : 7.199999999999999,
            y2: menu ? 21.6 : 7.199999999999999,
          }}
          stroke="#fbcb22"
          strokeWidth="2"
          strokeLinecap="round"
          x1="3.5999999999999996"
          y1="7.199999999999999"
          x2="20.4"
          y2="7.199999999999999"
        ></motion.line>
        <motion.line
          animate={{
            x1: menu ? 2.4 : 20.4,
            x2: menu ? 21.6 : 3.5999999999999996,
            y1: menu ? 12 : 16.799999999999997,
            y2: menu ? 12 : 16.799999999999997,
          }}
          stroke="#fbcb22"
          strokeWidth="2"
          strokeLinecap="round"
          x1="20.4"
          y1="16.799999999999997"
          x2="3.5999999999999996"
          y2="16.799999999999997"
        ></motion.line>
      </motion.svg>
    </HamburgerWrapper>
  );
};

export const HamburgerWrapper = styled(motion.div)`
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) => (!props.menu ? "#5f1d7d" : "rgba(0,0,0,0)")};
  border-radius: 50%;
  padding: 6px;

  position: ${(props) => (props.menu ? "fixed" : "absolute")};
  right: 24px;
  top: 32px;
`;
