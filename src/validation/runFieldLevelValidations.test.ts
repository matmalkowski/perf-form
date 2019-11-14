import runFieldLevelValidations from './runFieldLevelValidations';
import runFieldValidationHandler from './runFieldValidationHandler';
import { Values } from '../store/types';

jest.mock('./runFieldValidationHandler');
const runFieldValidationHandlerMock = runFieldValidationHandler as jest.Mock;

describe('runFieldLevelValidations', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return empty promise if no field validators present', async () => {
    const results = await runFieldLevelValidations<Values>({ a: 1 }, {});
    expect(results).toHaveLength(0);
  });

  it('should run only validators for fields that have present validators', async () => {
    const mockedValidatorForB = jest.fn();
    const results = await runFieldLevelValidations<Values>({ a: 1, b: 2 }, { b: mockedValidatorForB });
    expect(results).toHaveLength(1);
    expect(runFieldValidationHandler).toHaveBeenCalledTimes(1);
    expect(runFieldValidationHandler).toHaveBeenCalledWith('b', 2, mockedValidatorForB);
  });

  it('should return once all validators have been executed', async () => {
    const mockedValidatorForB = jest.fn();
    const mockedValidatorForC = jest.fn();
    runFieldValidationHandlerMock.mockResolvedValueOnce('first').mockResolvedValueOnce('second');
    const results = await runFieldLevelValidations<Values>(
      { a: 1, b: 2, c: 3 },
      { b: mockedValidatorForB, c: mockedValidatorForC }
    );
    expect(results).toHaveLength(2);
    expect(runFieldValidationHandler).toHaveBeenCalledTimes(2);
    expect(runFieldValidationHandler).toHaveBeenNthCalledWith(1, 'b', 2, mockedValidatorForB);
    expect(runFieldValidationHandler).toHaveBeenNthCalledWith(2, 'c', 3, mockedValidatorForC);
    expect(results).toStrictEqual(['first', 'second']);
  });
});
