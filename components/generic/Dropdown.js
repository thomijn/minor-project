import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { StyledLabel } from "./Input";
import { ArrowDown, ChevronDown } from "react-feather";

const Dropdown = ({
  items,
  title,
  setTitle,
  small,
  label,
  extraLabel,
  style,
}) => {
  const [clicked, setClicked] = useState(false);
  const [titleHovered, setTitleHovered] = useState(false);
  const [curIndex, setCurIndex] = useState(-1);
  const dropdown = useRef(null);
  const dropdownContainer = useRef(null);

  useEffect(() => {
    document.addEventListener("keypress", onKeypress);
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keypress", onKeypress);
      document.removeEventListener("keydown", onKeydown);
    };

    // eslint-disable-next-line
  }, [curIndex, titleHovered, clicked]);

  const onKeypress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (dropdownFocused) {
        setClicked(!clicked);
      }
      if (clicked) {
        setTitle(items[curIndex]);
        setClicked(false);
      } else if (titleHovered) {
        setClicked(!clicked);
      }
    }
  };

  const onKeydown = (e) => {
    // Down arrowkey or tab is pressed
    if (e.keyCode === 40 || e.keyCode === 9) {
      e.preventDefault();
      if (curIndex + 1 < items.length) setCurIndex(curIndex + 1);
      else setCurIndex(0);
      // Up arrowkey is pressed
    } else if (e.keyCode === 38) {
      if (curIndex - 1 > -1) setCurIndex(curIndex - 1);
      else setCurIndex(items.length - 1);
    }
  };

  const options = items.map((item, index) => {
    return (
      <Option
        key={`option-${index + 1}`}
        animate={
          curIndex === index
            ? { backgroundColor: "#fff" }
            : { backgroundColor: "#fff" }
        }
        whileTap={{ backgroundColor: "#E2C7DD" }}
        onHoverStart={() => {
          setCurIndex(index);
        }}
        onHoverEnd={() => {
          setCurIndex(-1);
        }}
        $noborder={index === items.length - 1}
        onClick={() => {
          setClicked(false);
          setTitle(item);
        }}
      >
        {item}
      </Option>
    );
  });

  return (
    <DropdownContainer ref={dropdownContainer}>
      <StyledLabel
        style={{
          backgroundColor: "#fff",
          padding: "0px 4px",
          top: 20,
          position: "relative",
          transform: "translateX(14px)",
          zIndex: 1,
          width: "fit-content",
        }}
      >
        {label} {extraLabel && <span>{extraLabel}</span>}
      </StyledLabel>
      <TitleContainer
        style={{ borderRadius: clicked ? "10px 10px 0px 0px" : 10 }}
        small={small}
        ref={dropdown}
        type="button"
        onClick={() => {
          console.log("test");
          setClicked(!clicked);
        }}
        onHoverStart={() => {
          setTitleHovered(true);
        }}
        onHoverEnd={() => {
          setTitleHovered(false);
        }}
      >
        <Title>{title}</Title>
        <ArrowSvgContainer
          transition={{ duration: 0 }}
          animate={{
            borderRadius: clicked ? "7px 7px 0px 7px" : "7px 7px 7px 7px",
          }}
        >
          <motion.div
            animate={{
              rotateZ: clicked ? 180 : 0,
              y: clicked ? -5 : 5,
            }}
          >
            <ArrowDown color="#fbcb22" size={22} />
          </motion.div>
        </ArrowSvgContainer>
      </TitleContainer>
      <OptionsContainer
        initial={{ height: 0, borderWidth: 2 }}
        style={
          clicked
            ? {
                borderWidth: 2,
              }
            : {
                borderWidth: 0,
              }
        }
        animate={
          clicked
            ? {
                height: "auto",
                opacity: 1,
                transition: { duration: 0.2 },
              }
            : {
                height: 0,
                opacity: 0,
                transition: { duration: 0.15 },
              }
        }
      >
        {options}
      </OptionsContainer>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  transform: translateY(0px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  border-radius: 10px;
  border: 1px solid #5f1d7d;
  color: #000;
  border: none;
  position:relative;
  min-width: 100px;
  line-height: 1.75em;
  z-index: 10;

  *::-webkit-scrollbar {
    width: 10px;
    background-color: rgba(255, 255, 255, 1);
    transform: translateX(-10px);
    border-bottom-right-radius: 10020px;
  }

  *::-webkit-scrollbar-track {
    width: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }

  *::-webkit-scrollbar-thumb {
    width: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${(props) => props.theme.darkerBlue};
  }
`;

const Title = styled.div`
  color: #000;
  overflow-wrap: break-word;
`;

const TitleContainer = styled(motion.button)`
  width: 100%;
  position: relative;
  transform: translateY(-2px);

  border: 2px solid #5f1d7d;
  padding: 8px 0.5rem 8px 20px;
  min-height: 46.6px;
  height: auto;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  cursor: pointer;
`;

const ArrowSvgContainer = styled(motion.span)`
  position: absolute;
  width: 45px;
  height: 101%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  right: -1px;
  border-radius: 7px;
  background: #5f1d7d;
`;

const OptionsContainer = styled(motion.ul)`
  display: flex;
  width: 100%;
  flex-direction: column;
  border: 2px solid #5f1d7d;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-content: flex-start;
  overflow-y: hidden;
  padding: 0;
  margin: 0 0 0 0;
  position: relative;
  z-index: 10;
  top:-4px;
`;

const Option = styled(motion.li)`
  height: auto;
  padding: 0.5rem 0.5rem 0.5rem 20px;
  border-bottom-width: ${(props) => (props.noborder ? "0px" : "2px")};
  border-bottom-style: solid;
  border-bottom-color: ${(props) => (props.noborder ? "none" : "#f2f2f2")};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  overflow-wrap: break-word;
  user-select: none;
  cursor: pointer;

  &:last-child {
    border-bottom:none;
  }
`;

export default Dropdown;
