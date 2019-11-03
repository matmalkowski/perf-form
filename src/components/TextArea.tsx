import React, { HTMLProps } from 'react';
import useField from '../hooks/useField';

interface Props extends HTMLProps<HTMLTextAreaElement> {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef?: (instance: any) => void;
}


const TextArea: React.FC<Props> = (props) => {
  const {
    name, innerRef, children, ...rest
  } = props;
  const { value, handleOnChange, handleOnBlur } = useField(name);
  return (
    <textarea
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      ref={innerRef}
      name={name}
      value={value}
      {...rest}
    >
      {children}
    </textarea>
  );
};

export default TextArea;
