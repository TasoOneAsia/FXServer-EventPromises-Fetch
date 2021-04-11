export interface PromiseEventResponse<T> {
  data: T,
  error: boolean,
  errorMsg?: string 
}