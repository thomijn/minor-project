import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 24px;

  h1 {
    font-family: "Ubuntu", sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 2rem;
    line-height: 46px;
    margin-bottom: 16px;
    color: #5f1d7d;
    line-height: 1.2;
  }
`;

export const GoBack = styled(motion.p)`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  z-index: 5;

  svg {
    margin-right: 4px;
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
  /* height: 250px; */
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;

  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
    color: #5f1d7d;
    font-size: 1.2rem;
    margin-bottom: 32px;
  }

  p {
    overflow: hidden;
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  a {
    font-size: 0.9rem;
    color: #5f1d7d;
  }

  ${(props) =>
    props.fill &&
    css`
      color: #fff;
      background: #5f1d7d;

      h2 {
        color: #fff;
      }
    `}
`;

export const CardAction = styled.button`
  background-color: #faca3b;
  border-radius: 25px;
  padding: 0px 16px;
  font-weight: 700;
  color: #5f1d7d;
  border: none;
  align-self: flex-start;
  margin: 16px 0px;
`;

export const TitleSpan = styled.span`
  font-size: 0.7rem;
  font-style: italic;
  display: block;
  font-weight: 300;
  opacity: 0.9;
  margin-top: 8px;
  color: #000;

  ${(props) =>
    props.fill &&
    css`
      color: #fff;
    `}
`;

export const Image = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
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

export const TimelineWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: stretch;
  position: relative;
  z-index: 10;
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
  z-index: 10;

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
  z-index: 10;

  ${(props) =>
    props.versionOne &&
    css`
      position: fixed;
    `}

  span {
    position: relative;
    font-weight: 600;
    color: #fff;
  }
`;

export const OptionsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  position: relative;
  left: 24px;
  width: calc(100% + 24px);
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
  width: fit-content;
`;

export const WhoWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 16px;
`;

export const WhoOption = styled(motion.div)`
  padding: 2px 8px;
  font-size: 1rem;
  border-radius: 40px;
  font-weight: 400;
  color: #818181;
`;

export const EngagementWrapper = styled(motion.div)`
  color: "red";
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #5f1d7d;
  font-weight: 700;
  gap: 16px;
  margin-top: 16px;

  div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const FloatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #faca3b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 11;
  border: none;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
`;
