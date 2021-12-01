import styled from "styled-components";

const Checkbox = ({ className, checked, text, ...props }) => (
  <CheckboxLabelContainer>
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
    <span>{text}</span>
  </CheckboxLabelContainer>
);

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  background: ${(props) => (props.checked ? props.theme.darkerBlue : "#fff")};
  border-radius: 5px;
  border: 2px solid
    ${(props) => (props.checked ? props.theme.darkerBlue : "#91b8c4")};
  transition: all 150ms;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const CheckboxLabelContainer = styled.label`
  display: flex;
  margin: 32px 0px;
  align-items: flex-start;

  span {
    font-size: 1.2rem;
    margin-left: 16px;
  }
`;

export default Checkbox;
