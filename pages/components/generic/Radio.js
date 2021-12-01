import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { StyledLabel } from "./Input";

const RadioGroup = ({
  name,
  selectedValue,
  onClickRadioButton,
  children,
  label,
  extraLabel,
  ...rest
}) => {
  return (
    <div
      style={{ marginBottom: "32px" }}
      role="radiogroup"
      {...rest}
      name={name}
    >
      <StyledLabel>
        {label} {extraLabel && <span>{extraLabel}</span>}
      </StyledLabel>
      {React.Children.map(children, (element) =>
        React.cloneElement(element, {
          ...element.props,
          checked: selectedValue === element.props.value,
          onClickRadioButton,
          name,
        })
      )}
    </div>
  );
};

export const Radio = (props) => {
  const { labelText, checked, onClickRadioButton, value } = props;
  return (
    <Root onClick={() => onClickRadioButton(value)}>
      <Input>
        <AnimatePresence initial={false}>
          <Fill key="fill" animate={{ scale: checked ? 1 : 0 }} />
        </AnimatePresence>
      </Input>
      <label>{labelText}</label>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
`;

const Input = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 25px;
  min-height: 25px;
  max-height: 25px;
  border: 2px solid ${(props) => props.theme.darkerBlue};
  border-radius: 50%;
`;

const Fill = styled(motion.div)`
  width: 17px;
  height: 17px;
  background: ${(props) => props.theme.darkerBlue};
  border-radius: inherit;
`;

export default RadioGroup;
