import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const FilterModal = ({ options, value, func, modalFunc }) => {
  return (
    <>
      <Overlay
        onClick={() => modalFunc(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
      />
      <Wrapper
        drag="y"
        transition={{ duration: 0.4, type: "spring" }}
        dragConstraints={{ top: 0 }}
        dragElastic={0}
        onDragEnd={() => modalFunc(false)}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
      >
        <div style={{ width: "100%" }} onClick={() => modalFunc(false)}>
          <p>Gereed</p>
        </div>

        <div style={{ marginTop: 32 }}>
          {options.map((option) => (
            <Option
              onClick={() => func(option)}
              initial={false}
              animate={{
                fontWeight: value === option ? "700" : "400",
                backgroundColor: value === option ? "#f0f0f0" : "#fff",
                color: value === option ? "#5f1d7d" : "#595959",
              }}
            >
              {option}
            </Option>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(motion.div)`
  padding: 8px 16px;
  position: fixed;
  z-index: 999;
  width: 100%;
  bottom: 0px;
  min-height: 230px;
  background: #fff;
  isolation: isolate;

  p {
    font-size: 1.1rem;
    color: #5f1d7d;
    float: right;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: #c5c5c5;
  opacity: 0.6;
  z-index: 99;
`;

const Option = styled(motion.div)`
  position: relative;
  padding: 4px;
  margin-bottom: 8px;
  border-radius: 6px;
  width: 100%;
  color: #595959;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  opacity: 1;
`;

export default FilterModal;
