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
  font-weight: 400;
  max-width: fit-content;
  border: none;
  border-radius: 7px;
  padding: 8px 16px;
  text-align: start;
  position: relative;
  white-space: normal;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  gap: 32px;
  text-overflow: ellipsis;

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

  &:active {
    box-shadow: 0px 0px 0px;
    transform: translateY(3px);
  }
`;

const FillButton = styled(ButtonBase)`
  background-color: ${(props) => props.theme.lighterBlue};
  color: #fff;
  box-shadow: #1b7c9a 0px 3px 0px;
`;

const LightButton = styled(ButtonBase)`
  padding: 14px 28px;
  background-color: ${(props) => props.theme.lighterBlueLight};
  color: ${(props) => props.theme.darkerBlue};
  box-shadow: #91b8c4 0px 3px 0px;
`;

export default Button;
