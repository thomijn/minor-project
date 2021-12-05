import styled, { css } from "styled-components";

const Button = (props) => {
  const { variant, children, ...otherProps } = props;

  let Component;
  if (variant === "fill") {
    Component = FillButton;
  } else if (variant === "light") {
    Component = LightButton;
  } else {
    throw new Error(`Unrecognized Button variant: ${variant}`);
  }

  return <Component {...otherProps}>{children}</Component>;
};

const ButtonBase = styled.button`
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  max-width: fit-content;
  border: none;
  border-radius: 7px;
  padding: 12px 24px;
  position: relative;
  white-space: normal;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  gap: 32px;
  text-overflow: ellipsis;
  justify-content: center;

  & > svg {
    display: block;
  }

  p:not(:last-child) {
    margin-bottom: 8px;
  }

  ${(props) =>
    props.icon &&
    css`
      display: flex;
      align-items: center;
      gap: 32px;
      &::before {
        content: "";
        font-size: 32px;
        line-height: 43px;
        height: 100%;
        width: calc(16px + 18px + 16px);
        position: absolute;
        font-family: Futura Std, sans-serif;
        font-weight: 400;
        left: 0px;
        top: 0px;
        text-align: center;
        border-right: 2px solid #1b7c9a;
        transition: all 0.2s linear 0s;
      }
    `}

  ${(props) =>
    props.caret &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
    `}

    ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      max-width: 100%;
    `}
`;

const FillButton = styled(ButtonBase)`
  background-color: #fbcb22;
  color: #5f1d7d;
`;

const LightButton = styled(ButtonBase)`
  padding: 14px 28px;
  background-color: ${(props) => props.theme.lighterBlueLight};
  color: ${(props) => props.theme.darkerBlue};
`;

export default Button;
