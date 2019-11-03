import React from 'react';
import useFormHandlers from '../hooks/useFormHandlers';

const Form: React.FC = (props) => {
  const { children } = props;
  const { handleSubmit } = useFormHandlers();
  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

Form.displayName = 'Form';
export default Form;
