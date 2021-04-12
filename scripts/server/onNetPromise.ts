import { PromiseEventResponse } from "../common.types";
import { isPromise } from "./utils";
import { ServerPromiseError } from "./PromiseEventError";

type CallbackSignature<T> = (...args: any[]) => T;

export function onNetPromise<T>(
  eventName: string,
  cb: CallbackSignature<T>
): void {
  onNet(eventName, async (respEventName: string, ...args: any) => {
    const _source = global.source;

    try {
      // We will pass the source to the callback followed by additional args
      let returnVal = cb(_source, ...args);

      // If this is a promise, lets await it
      if (isPromise(returnVal)) {
        returnVal = await returnVal;
      }

      // Default action if all checks pass
      emitNet(respEventName, _source, {
        data: returnVal,
        error: false,
      });
    } catch (e) {
      // If there is an unhandled error we just pass a generic error object back as response
      if (e instanceof ServerPromiseError) {
        const serverRespObj: PromiseEventResponse<null> = {
          data: null,
          error: true,
          errorMsg: e.message,
        };
      }

      const serverRespObj: PromiseEventResponse<null> = {
        error: true,
        data: null,
        // This error message can be done better but considering its a catch
        // for the moment
        errorMsg: "A server error occurred",
      };
      emitNet(respEventName, _source, serverRespObj);
    }
  });
}
