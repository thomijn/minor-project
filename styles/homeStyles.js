import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 24px;

  h1 {
    font-family: Ubuntu;
    font-style: normal;
    font-weight: bold;
    font-size: 2rem;
    line-height: 46px;
    margin-bottom: 16px;
    color: #5f1d7d;
  }
`;

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 14px;
  max-width: 100%;
  overflow: hidden;
  margin-bottom: 16px;
  height: 190px;

  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
    color: #5f1d7d;
    margin-bottom: 32px;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Image = styled.div`
  min-width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #faca3b;
`;

export const TimelineWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: stretch;
`;

export const Col = styled.div`
  flex: ${(props) => props.flex};
`;

export const Timeline = styled(motion.div)`
  position: relative;
  width: 8px;
  height: 100%;
  background: #faca3b;
  border-radius: 15px;

  ${(props) =>
    props.versionTwo &&
    css`
      position: sticky;
      top: 10%;
      height: 75vh;
    `}
`;

export const Indicator = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #faca3b;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.versionOne &&
    css`
      position: fixed;
    `}

  span {
    position: relative;
    font-weight: 600;
    color: #fff;
    z-index: 1;
  }
`;

export const OptionsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 24px;
`;

export const Option = styled(motion.div)`
  padding: 6px 16px;
  background: #ffffff;
  border: 2px solid #e2c7dd;
  box-sizing: border-box;
  border-radius: 40px;
  font-weight: bold;
  color: #5f1d7d;
`;
