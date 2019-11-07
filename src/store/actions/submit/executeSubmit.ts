import { Thunk } from '../../types';

const executeSubmit = <TValues>(): Thunk<TValues> =>
  (_, getState, { onSubmit }) => {
    const { values, errors } = getState();
    if (Object.keys(errors).length === 0) {
      onSubmit(values);
    }
    return Promise.resolve();
  };

export default executeSubmit;
