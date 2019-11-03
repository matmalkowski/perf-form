import React, { HTMLProps } from 'react';
import useField from '../hooks/useField';

interface Props extends HTMLProps<HTMLInputElement> {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef?: (instance: any) => void;
}


const Input: React.FC<Props> = (props) => {
  const {
    name, innerRef, ...rest
  } = props;
  const { value, handleOnChange, handleOnBlur } = useField(name);
  return (
    <input
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      ref={innerRef}
      name={name}
      value={value}
      {...rest}
    />
  );
};

export default Input;
