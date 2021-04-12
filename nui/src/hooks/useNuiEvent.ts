import { MutableRefObject, useEffect, useRef } from "react";

/**
 * A hook to receive data from the client in the following schema:
 *
 * {
 *   "method": "method-name",
 *   "data": { anyValue: 1 }
 * }
 *
 * @param method {string} The specific `method` field that should be listened for.
 * @param handler {function} The callback function that will handle data received from the client
 * @returns {void} void
 * @example
 * const [dataState, setDataState] = useState<boolean>();
 * useNuiEvent<boolean>("appname", "methodname", setDataState);
 **/
export const useNuiEvent = <D = unknown>(
  method: string,
  handler: (r: D) => void
): void => {
  const savedHandler: MutableRefObject<(r: D) => void> = useRef();

  // When handler value changes set mutable ref to handler val
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => {
      if (savedHandler.current && savedHandler.current.call) {
        if (event.data.method === method) {
          const newData = event.data.data;
          savedHandler.current(newData);
        }
      }
    };

    window.addEventListener("message", eventListener);
    // Remove Event Listener on component cleanup
    return () => window.removeEventListener("message", eventListener);
  }, [method, handler]);
};
