import React from "react";
import PerfFormContext from "./Context";

type FormProps = {};

const Form: React.FC<FormProps> = props => {
  const { children } = props;
  const [valuesState] = React.useState({});

  const handleChange = () => {};

  const getCtx = () => ({
    values: { ...valuesState },
    handleChange
  });

  return (
    <PerfFormContext.Provider value={getCtx()}>
      <form>{children}</form>
    </PerfFormContext.Provider>
  );
};

export default Form;
