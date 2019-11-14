/* eslint-disable @typescript-eslint/no-explicit-any */
import { isFunction, isObject } from 'util';
import { isPromise } from './utils';

describe('utils', () => {
  describe('isPromise', () => {
    it('should return true for Promise', () => {
      const alwaysResolve = (resolve: Function) => resolve();
      const promise = new Promise(alwaysResolve);
      expect(isPromise(promise)).toEqual(true);
    });

    it('should return false for object', () => {
      expect(isPromise({})).toEqual(false);
    });

    it('should return false for function', () => {
      const func = (i: any) => i;
      expect(isPromise(func)).toEqual(false);
    });

    it('should return false for string', () => {
      expect(isPromise('foo')).toEqual(false);
    });

    it('should return false for number', () => {
      expect(isPromise(123)).toEqual(false);
    });

    it('should return false for undefined', () => {
      expect(isPromise(undefined)).toEqual(false);
    });

    it('should return false for null', () => {
      expect(isPromise(null)).toEqual(false);
    });
  });

  describe('isFunction', () => {
    it('should return false for Promise', () => {
      const alwaysResolve = (resolve: Function) => resolve();
      const promise = new Promise(alwaysResolve);
      expect(isFunction(promise)).toEqual(false);
    });

    it('should return false for object', () => {
      expect(isFunction({})).toEqual(false);
    });

    it('should return true for function', () => {
      const func = (i: any) => i;
      expect(isFunction(func)).toEqual(true);
    });

    it('should return false for string', () => {
      expect(isFunction('foo')).toEqual(false);
    });

    it('should return false for number', () => {
      expect(isFunction(123)).toEqual(false);
    });

    it('should return false for undefined', () => {
      expect(isFunction(undefined)).toEqual(false);
    });

    it('should return false for null', () => {
      expect(isFunction(null)).toEqual(false);
    });
  });

  describe('isObject', () => {
    it('should return true for Promise', () => {
      const alwaysResolve = (resolve: Function) => resolve();
      const promise = new Promise(alwaysResolve);
      expect(isObject(promise)).toEqual(true);
    });

    it('should return true for object', () => {
      expect(isObject({})).toEqual(true);
    });

    it('should return false for function', () => {
      const func = (i: any) => i;
      expect(isObject(func)).toEqual(false);
    });

    it('should return false for string', () => {
      expect(isObject('foo')).toEqual(false);
    });

    it('should return false for number', () => {
      expect(isObject(123)).toEqual(false);
    });

    it('should return false for undefined', () => {
      expect(isObject(undefined)).toEqual(false);
    });

    it('should return false for null', () => {
      expect(isObject(null)).toEqual(false);
    });
  });
});
