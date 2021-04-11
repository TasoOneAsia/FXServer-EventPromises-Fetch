import { PromiseEventResponse } from '../common.types'
import { isPromise } from './utils'

type CallbackSignature = (...args: any[]) => unknown | [unknown, string]

export function onNetPromise<T = any[]>(eventName: string, cb: CallbackSignature): void {
  onNet(eventName, async (respEventName: string, ...args: T[]) => {
    const _source = global.source

    try {
      let returnVal = cb(...args)
      
      // If this is a promise, lets await it
      if (isPromise(returnVal)) {
         returnVal = await returnVal
      }


      // If a user wishes they can return a an array with the cb, which is interpeted
      // as an explicit error.
      // index 0 of the array will contain the data they wish to transmit back
      // index 1 of the array will contain the error message they wish to send
      if (Array.isArray(returnVal)) {

        const serverRespObj: PromiseEventResponse<unknown> = {
          data: returnVal[0],
          error: true,
          errorMsg: returnVal[1]
        }

        emitNet(respEventName, _source, serverRespObj)
      }

      // Double check that the returnVal isn't useless
      if (!returnVal) return console.error('The data returned by the event callback was null or undefined')
      

      // Default action if all checks pass
      emitNet(respEventName, _source, {
        data: returnVal,
        error: false,
      })

    } catch (e) {
      const serverRespObj: PromiseEventResponse<null> = {
        error: true,
        data: null,
        // This error message can be done better but considering its a catch
        // for the moment
        errorMsg: 'A server error occurred' 
      }
      emitNet(respEventName, _source, serverRespObj)
    }
  })
}