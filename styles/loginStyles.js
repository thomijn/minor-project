import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;

  h1 {
    position: absolute;
    top: 48px;
    left: 24px;
    line-height: 1.1;
    color: #5f1d7d;
  }

  input {
    margin-bottom: 16px;
  }
`;

export const LoginWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0px;
  background-color: #5f1d7d;
  padding: 64px 24px 24px 24px;
  border-radius: 20px 20px 0px 0px;
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
