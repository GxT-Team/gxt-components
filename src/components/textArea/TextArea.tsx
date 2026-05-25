import React from "react";
import {
  Caption,
  Heading,
  InputContainer,
  TextAreaContainer,
  TextAreaInput,
} from "./TextArea.styles";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  name?: string;
  heading?: string;
  caption?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  customStyles?: {
    heading?: React.CSSProperties;
    caption?: React.CSSProperties;
    input?: React.CSSProperties;
  };
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  heading,
  caption,
  value,
  className = "",
  disabled,
  customStyles,
  ...rest
}) => {
  return (
    <TextAreaContainer className={className}>
      {heading && (
        <Heading style={customStyles?.heading} disabled={disabled}>
          {heading}
        </Heading>
      )}
      <InputContainer disabled={disabled} style={customStyles?.input}>
        <TextAreaInput
          {...rest}
          id={id || "textarea"}
          name={name || "textarea"}
          value={value}
          disabled={disabled}
        />
      </InputContainer>
      {caption && <Caption style={customStyles?.caption}>{caption}</Caption>}
    </TextAreaContainer>
  );
};

export default TextArea;
