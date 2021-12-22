import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const FilterModal = ({ value, func, modalFunc }) => {
  const handleSelect = (val) => {
    if (value.includes(val)) {
      func(value.filter((v) => v !== val));
    } else {
      console.log(val);
      func([...value, val]);
    }
  };

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
        transition={{ ease: [0.53, 0.21, 0, 1] }}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ bottom: 0.5 }}
        onDragEnd={(event, info) => {
          if (info.offset.y > 75) modalFunc(false);
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
      >
        <div style={{ width: "100%" }} onClick={() => modalFunc(false)}>
          <p>Gereed</p>
        </div>

        <div style={{ marginTop: 32 }}>
          <h3>Fase</h3>
          <Option
            initial={false}
            style={{ fontWeight: value.includes("Beginfase") ? "700" : "400" }}
            animate={{
              backgroundColor: value.includes("Beginfase") ? "#f0f0f0" : "#fff",
              color: value.includes("Beginfase") ? "#5f1d7d" : "#595959",
            }}
            onClick={() => handleSelect("Beginfase")}
          >
            <Dot
              initial={false}
              animate={{
                backgroundColor: value.includes("Beginfase")
                  ? "#C68EBC"
                  : "#fff",
              }}
            />
            Beginfase
          </Option>
          <Option
            initial={false}
            onClick={() => handleSelect("Middenfase")}
            style={{ fontWeight: value.includes("Middenfase") ? "700" : "400" }}
            animate={{
              backgroundColor: value.includes("Middenfase")
                ? "#f0f0f0"
                : "#fff",
              color: value.includes("Middenfase") ? "#5f1d7d" : "#595959",
            }}
          >
            <Dot
              initial={false}
              animate={{
                backgroundColor: value.includes("Middenfase")
                  ? "#C68EBC"
                  : "#fff",
              }}
            />
            Middenfase
          </Option>
          <Option
            initial={false}
            onClick={() => handleSelect("Eindfase")}
            style={{ fontWeight: value.includes("Eindfase") ? "700" : "400" }}
            animate={{
              backgroundColor: value.includes("Eindfase") ? "#f0f0f0" : "#fff",
              color: value.includes("Eindfase") ? "#5f1d7d" : "#595959",
            }}
          >
            <Dot
              initial={false}
              animate={{
                backgroundColor: value.includes("Eindfase")
                  ? "#C68EBC"
                  : "#fff",
              }}
            />
            Eindfase
          </Option>

          <h3 style={{ marginTop: 16 }}>Categorie</h3>
          <Option
            initial={false}
            onClick={() => handleSelect("Activiteiten")}
            style={{
              fontWeight: value.includes("Activiteiten") ? "700" : "400",
            }}
            animate={{
              backgroundColor: value.includes("Activiteiten")
                ? "#f0f0f0"
                : "#fff",
              color: value.includes("Activiteiten") ? "#5f1d7d" : "#595959",
            }}
          >
            <Dot
              initial={false}
              animate={{
                backgroundColor: value.includes("Activiteiten")
                  ? "#C68EBC"
                  : "#fff",
              }}
            />
            Activiteiten
          </Option>
          <Option
            initial={false}
            onClick={() => handleSelect("Ervaringen")}
            style={{ fontWeight: value.includes("Ervaringen") ? "700" : "400" }}
            animate={{
              backgroundColor: value.includes("Ervaringen")
                ? "#f0f0f0"
                : "#fff",
              color: value.includes("Ervaringen") ? "#5f1d7d" : "#595959",
            }}
          >
            <Dot
              initial={false}
              animate={{
                backgroundColor: value.includes("Ervaringen")
                  ? "#C68EBC"
                  : "#fff",
              }}
            />
            Ervaringen
          </Option>
          <Option
            initial={false}
            onClick={() => handleSelect("Verhalen")}
            style={{ fontWeight: value.includes("Verhalen") ? "700" : "400" }}
            animate={{
              backgroundColor: value.includes("Verhalen") ? "#f0f0f0" : "#fff",
              color: value.includes("Verhalen") ? "#5f1d7d" : "#595959",
            }}
          >
            <Dot
              initial={false}
              animate={{
                backgroundColor: value.includes("Verhalen")
                  ? "#C68EBC"
                  : "#fff",
              }}
            />
            Verhalen
          </Option>
          <Option
            initial={false}
            onClick={() => handleSelect("Foto's")}
            style={{ fontWeight: value.includes("Foto's") ? "700" : "400" }}
            animate={{
              backgroundColor: value.includes("Foto's") ? "#f0f0f0" : "#fff",
              color: value.includes("Foto's") ? "#5f1d7d" : "#595959",
            }}
          >
            <Dot
              initial={false}
              animate={{
                backgroundColor: value.includes("Foto's") ? "#C68EBC" : "#fff",
              }}
            />
            Foto's
          </Option>
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

  h3 {
    color: #5f1d7d;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.1rem;
    color: #5f1d7d;
    float: right;
  }
`;

const Dot = styled(motion.div)`
  position: absolute;
  left: 0px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid #5f1d7d;
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
  padding: 2px 0px;
  margin-bottom: 8px;
  border-radius: 6px;
  width: 100%;
  color: #595959;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;

export default FilterModal;
