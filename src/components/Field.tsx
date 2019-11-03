import React, { HTMLProps } from 'react';
import useField from '../hooks/useField';
import debug from '../utils/debug';
import { FieldValidateHandler } from '../types';

type AsElement<T> =
  T extends 'input' ? HTMLProps<HTMLInputElement> :
    T extends 'select' ? HTMLProps<HTMLSelectElement> :
      T extends 'textarea' ? HTMLProps<HTMLTextAreaElement> :
        unknown;

type OwnProps<T extends 'input' | 'select' | 'textarea'> = {
  as?: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef?: (instance: any) => void;
  validate?: FieldValidateHandler
}

type Props<T extends 'input' | 'select' | 'textarea'> = OwnProps<T> & AsElement<T>

const Field = <T extends 'input' | 'select' | 'textarea' = 'input'>(props: Props<T>) => {
  const {
    name, as: component, innerRef, validate, ...rest
  } = props;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { value, handleOnChange, handleOnBlur } = useField(name!, validate!);

  const asElement = component || 'input';
  if (__DEV__) {
    debug(`Field[${name}]`, 'rendered!', { value, ...rest });
  }
  return React.createElement(
    asElement,
    {
      onChange: handleOnChange,
      onBlur: handleOnBlur,
      ref: innerRef,
      value,
      name,
      ...rest
    }
  );
};

export default Field;
