import warning from 'tiny-warning';
import runFieldValidationHandler from './runFieldValidationHandler';

jest.mock('tiny-warning');

describe('runFieldValidationHandler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should return no errors if no handler present', async () => {
    const results = await runFieldValidationHandler('a', 1);
    expect(results).toEqual({});
  });

  it('should return no errors if handler returned undefined', async () => {
    const handler = jest.fn().mockReturnValue(undefined);
    const results = await runFieldValidationHandler('a', 1, handler);
    expect(results).toEqual({});
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should return no errors if handler returned null', async () => {
    const handler = jest.fn().mockReturnValue(null);
    const results = await runFieldValidationHandler('a', 1, handler);
    expect(results).toEqual({});
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should return no errors if handler returned empty string', async () => {
    const handler = jest.fn().mockReturnValue('');
    const results = await runFieldValidationHandler('a', 1, handler);
    expect(results).toEqual({});
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should resolve handler promise with errors if handler is async', async () => {
    const handler = jest.fn().mockResolvedValue('some error');
    const results = await runFieldValidationHandler('a', 1, handler);
    expect(results).toEqual({ a: 'some error' });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should resolve handler promise without errors if handler is async and no returns falsy results', async () => {
    const handler = jest.fn().mockResolvedValue('');
    const results = await runFieldValidationHandler('a', 1, handler);
    expect(results).toEqual({});
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should resolve handler with errors if handler is sync function', async () => {
    const handler = jest.fn().mockReturnValue('some error');
    const results = await runFieldValidationHandler('a', 1, handler);
    expect(results).toEqual({ a: 'some error' });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should catch error and warn the user when something went wrong', async () => {
    const handler = jest.fn().mockRejectedValue('Ups, thats and error from validator!');
    try {
      await runFieldValidationHandler('a', 1, handler);
    } catch (err) {
      expect(err).toEqual('Ups, thats and error from validator!');
      expect(warning).toHaveBeenCalled();
      expect(warning).toHaveBeenCalledWith(false, 'An unhandled error was caught during validation: Ups, thats and error from validator!');
    }
  });
});
