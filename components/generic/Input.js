import { forwardRef } from "react";
import styled, { css } from "styled-components";

const Input = forwardRef((props, ref) => {
  return (
    <div>
      {props.label && (
        <StyledLabel>
          {props.label} {props.extraLabel && <span>{props.extraLabel}</span>}
        </StyledLabel>
      )}
      <InputContainer>
        {props.icon && props.icon}
        <StyledInput ref={ref} {...props} />
        {props.button && props.button}
      </InputContainer>
      {props.caption && <Caption>{props.caption}</Caption>}
    </div>
  );
});

Input.displayName = "Input";

const StyledInput = styled.input`
  width: ${(props) => props.width || "100%"};
  border-radius: 10px;
  border: none;
  background-color: #f2f2f2;
  text-align: left;
  padding: 12px 24px;
  box-shadow: none;
  -webkit-appearance: none;
  color: ${(props) => props.theme.darkerBlue};
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.75em;
  box-sizing: border-box;

  &:focus {
    outline: 2px solid #fbcb22;
  }

  &::placeholder {
    font-weight: 400;
    font-style: italic;
    color: rgba(0, 0, 0, 0.5);
  }

  ${(props) =>
    props.icon &&
    css`
      padding: 14px 28px 14px 52px;
    `}
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;

  svg {
    position: absolute;
    left: 16px;
  }

  button {
    margin-bottom: 0px;
    padding: 18px 28px 14px 28px;
  }
`;

export const StyledLabel = styled.label`
  display: inline-block;
  margin-bottom: 8px;
  font-size: 1.2rem;

  span {
    display: inline;
    font-size: 0.8rem;
    margin-left: 8px;
  }
`;

const Caption = styled.p`
  font-size: 0.9rem;
  margin-top: 8px;
`;

export default Input;
