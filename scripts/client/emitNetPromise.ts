import { uuidv4 } from "./uuidv4";
import { PromiseEventResponse } from "../common.types";

const PROMISE_EVENT_TIMEOUT = 10000;

export function emitNetPromise<T = any>(
  eventName: string,
  ...args: any[]
): Promise<T> {
  return new Promise((res, rej) => {
    let timedOut = false;

    // Setup the timeout interval
    setTimeout(() => {
      timedOut = true;
      rej(`${eventName} timed out after ${PROMISE_EVENT_TIMEOUT}ms`);
    }, PROMISE_EVENT_TIMEOUT);

    // Generate unique id to append to response event name
    const uniqId = uuidv4();

    const respEventName = `${eventName}:${uniqId}`;

    emitNet(eventName, respEventName, ...args);

    // The resp handler
    const handleRespEvent = (serverResp: PromiseEventResponse<T>) => {
      // Remove first
      removeEventListener(respEventName, handleRespEvent);
      if (timedOut) return;
      if (serverResp.error)
        rej(`Error for response event ${eventName}: ${serverResp.errorMsg}`);
      res(serverResp.data);
    };

    onNet(respEventName, handleRespEvent);
  });
}
