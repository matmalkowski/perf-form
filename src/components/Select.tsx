import React, { HTMLProps } from 'react';
import useField from '../hooks/useField';

interface Props extends HTMLProps<HTMLSelectElement> {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef?: (instance: any) => void;
}


const Select: React.FC<Props> = (props) => {
  const {
    name, innerRef, children, ...rest
  } = props;
  const { value, handleOnChange, handleOnBlur } = useField(name);
  return (
    <select
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      ref={innerRef}
      name={name}
      value={value}
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;
