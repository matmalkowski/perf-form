import createStore from './createStore';

describe('createStore', () => {
  const reducer = jest.fn();
  const initialState = {
    values: {
      a: ''
    },
    touched: {},
    errors: {},
    isSubmitting: false,
    isValidating: false,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false
  };
  const decoratorCallbacks = { validateForm: jest.fn(), onSubmit: jest.fn() };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create new store', () => {
    const {
      dispatch, getState, subscribe, registerField
    } = createStore(reducer, initialState, decoratorCallbacks);
    expect(dispatch).toBeInstanceOf(Function);
    expect(getState).toBeInstanceOf(Function);
    expect(subscribe).toBeInstanceOf(Function);
    expect(registerField).toBeInstanceOf(Function);
  });

  it('dispatch should call reducer for simple action', async () => {
    const {
      dispatch
    } = createStore(reducer, initialState, decoratorCallbacks);
    await dispatch({ type: 'SET_IS_VALIDATING', payload: { isValidating: true } });
    expect(reducer).toHaveBeenCalledTimes(1);
    expect(reducer).toHaveBeenLastCalledWith(initialState, { type: 'SET_IS_VALIDATING', payload: { isValidating: true } });
  });

  it('dispatch should call action for async functions', async () => {
    const {
      dispatch, getState
    } = createStore(reducer, initialState, decoratorCallbacks);


    const asyncAction = jest.fn();

    await dispatch(asyncAction);
    expect(asyncAction).toHaveBeenCalledTimes(1);
    expect(asyncAction).toHaveBeenCalledWith(dispatch, getState, { ...decoratorCallbacks, validateField: {} });
    expect(reducer).toHaveBeenCalledTimes(0);
  });

  it('should notify subscribers on store change', async () => {
    const {
      dispatch, subscribe
    } = createStore(reducer, initialState, decoratorCallbacks);

    const onNotification = jest.fn();
    subscribe(onNotification);
    await dispatch({ type: 'SET_IS_VALIDATING', payload: { isValidating: true } });
    expect(onNotification).toHaveBeenCalledTimes(1);
  });

  it('should notify cleanup for subscription', async () => {
    const {
      dispatch, subscribe
    } = createStore(reducer, initialState, decoratorCallbacks);

    const onNotification = jest.fn();
    const cleanup = subscribe(onNotification);
    await dispatch({ type: 'SET_IS_VALIDATING', payload: { isValidating: true } });
    cleanup();
    await dispatch({ type: 'SET_IS_VALIDATING', payload: { isValidating: true } });
    expect(onNotification).toHaveBeenCalledTimes(1);
  });

  it('registerField should extend the dispatch callbacks', async () => {
    const {
      dispatch, getState, registerField
    } = createStore(reducer, initialState, decoratorCallbacks);

    const asyncAction = jest.fn();


    const validationHandler = jest.fn();
    registerField('a', validationHandler);
    await dispatch(asyncAction);
    expect(asyncAction).toHaveBeenCalledWith(
      dispatch,
      getState,
      { ...decoratorCallbacks, validateField: { a: validationHandler } }
    );
  });

  it('registerField should return working cleanup function', async () => {
    const {
      dispatch, getState, registerField
    } = createStore(reducer, initialState, decoratorCallbacks);

    const asyncAction = jest.fn();

    const validationHandler = jest.fn();
    const cleanup = registerField('a', validationHandler);
    await dispatch(asyncAction);
    expect(asyncAction).toHaveBeenCalledWith(
      dispatch,
      getState,
      { ...decoratorCallbacks, validateField: { a: validationHandler } }
    );
    cleanup();
    await dispatch(asyncAction);
    expect(asyncAction).toHaveBeenCalledWith(
      dispatch,
      getState,
      { ...decoratorCallbacks, validateField: { } }
    );
  });

  it('should return initial state with get state if no action has been dispatched', () => {
    const {
      getState
    } = createStore(reducer, initialState, decoratorCallbacks);
    expect(getState()).toStrictEqual(initialState);
  });

  it('should return next state after store has changed via dispatch', async () => {
    reducer.mockReturnValue({ a: 'next' });
    const {
      dispatch, getState
    } = createStore(reducer, initialState, decoratorCallbacks);
    await dispatch({ type: 'SET_IS_VALIDATING', payload: { isValidating: true } });
    expect(reducer).toHaveBeenCalledTimes(1);
    expect(getState()).toStrictEqual({ a: 'next' });
  });
});
