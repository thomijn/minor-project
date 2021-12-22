import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Tooltip = (props) => {
  const [active, setActive] = useState(false);

  const variants = {
    hidden: {
      opacity: 0,
      y: 0,
    },
    show: {
      opacity: 1,
      y: 20,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <TooltipWrapper
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {props.children}
      <AnimatePresence>
        {active && (
          <TooltipStyled
            style={{ x: "-45%" }}
            variants={variants}
            initial="hidden"
            animate="show"
            exit="exit"
            key="tooltip"
          >
            {props.text}
          </TooltipStyled>
        )}
      </AnimatePresence>
    </TooltipWrapper>
  );
};

const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const TooltipStyled = styled(motion.div)`
  position: absolute;
  width: auto;
  border-radius: 10px;
  width: 300px;
  left: 35%;
  top: 30px;
  box-shadow: inset;
  padding: 1em;
  z-index: 100;
  color: #faca3b;
  background: #5f1d7d;
  font-size: 1rem;
  font-weight: 400;
  box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.05);
`;

export default Tooltip;
