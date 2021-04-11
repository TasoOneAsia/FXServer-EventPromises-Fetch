import { PromiseEventResponse } from '../common.types';
import { isPromise } from './utils';

type CallbackSignature<T> = (...args: any[]) => [string, unknown?] | T

export function onNetPromise<T>(eventName: string, cb: CallbackSignature<T>): void {
  onNet(eventName, async (respEventName: string, ...args: any) => {
    const _source = global.source;

    try {
      // We will pass the source to the callback followed by additional args
      let returnVal = cb(_source, ...args);

      // If this is a promise, lets await it
      if (isPromise(returnVal)) {
        returnVal = await returnVal;
      }

      // If a user wishes they can return a an array with the cb, which is interpeted
      // as an explicit error.
      // index 1 of the array will contain the data they wish to transmit back
      // index 0 of the array will contain the error message they wish to transmit back.
      // This will be passed in the client side promise rejection.
      if (Array.isArray(returnVal)) {
        const serverRespObj: PromiseEventResponse<unknown> = {
          data: returnVal[1],
          error: true,
          errorMsg: returnVal[0],
        };

        emitNet(respEventName, _source, serverRespObj);
      }

      // Default action if all checks pass
      emitNet(respEventName, _source, {
        data: returnVal,
        error: false,
      });
    } catch (e) {
      // If there is an unhandled error we just pass a generic error object back as response
      const serverRespObj: PromiseEventResponse<null> = {
        error: true,
        data: null,
        // This error message can be done better but considering its a catch
        // for the moment
        errorMsg: 'A server error occurred',
      };
      emitNet(respEventName, _source, serverRespObj);
    }
  });
}
