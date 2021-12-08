import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  position: absolute;

  h1 {
    position: absolute;
    top: 48px;
    left: 24px;
    line-height: 1.1;
    color: #5f1d7d;
    z-index: 1;
  }

  input {
    margin-bottom: 16px;
  }
`;

export const Circle = styled.div`
  position: absolute;
  width: 680px;
  height: 680px;
  margin: auto;
  left: 50%;
  transform: translateX(-50%);
  top: 140px;
  border-radius: 50%;
  background: #5f1d7d;
  z-index: 0;
`;

export const LoginWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0px;
  padding: 64px 24px 24px 24px;
  color: #fff;
`;

export const OtherWrapper = styled.div`
  margin-top: 76px;
  margin-bottom: 32px;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: underline;
    text-underline-offset: 3px;
    font-weight: 700;
    color: #fbcb22;
    margin-top: 5px;
  }
`;
