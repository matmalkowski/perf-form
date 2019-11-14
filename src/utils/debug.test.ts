/* eslint-disable @typescript-eslint/no-explicit-any */
import debug from './debug';

describe('debug', () => {
  const groupCollapsedMock = jest.spyOn(console, 'groupCollapsed').mockImplementation();
  const debugMock = jest.spyOn(console, 'debug').mockImplementation();
  const groupEndMock = jest.spyOn(console, 'groupEnd').mockImplementation();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create title of log message', () => {
    debug('title', 'message', null as unknown as Record<string, any>);
    expect(groupCollapsedMock).toHaveBeenCalledTimes(1);
    expect(groupCollapsedMock).toHaveBeenCalledWith('title::[message]');
    expect(groupEndMock).toHaveBeenCalledTimes(1);
  });

  it('should not create body if no body provided', () => {
    debug('title', 'message', null as unknown as Record<string, any>);
    expect(debugMock).toHaveBeenCalledTimes(0);
  });

  it('should create body for all keys passed', () => {
    debug('title', 'message', { a: 1, b: 2 });
    expect(debugMock).toHaveBeenCalledTimes(2);
    expect(debugMock).toHaveBeenNthCalledWith(1, 'a', 1);
    expect(debugMock).toHaveBeenNthCalledWith(2, 'b', 2);
  });
});
