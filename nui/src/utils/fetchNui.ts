import { MockListItem } from "../recoil/MockDataList/mockDataList.type";
import { mockDataList } from "./mockData";

function mockPromise<T>(data: T): Promise<T> {
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, 3000);
  });
}

/**
 * A wrapper around the `fetch` API for ease of use in NUI
 * @param eventName - The NUI callback name to target
 * @param data - The data to send
 */
export default async function fetchNui<T = any>(
  eventName: string,
  data?: any
): Promise<T> {
  let endpoint;
  if (process.env.NODE_ENV === "development") {
    // @ts-ignore
    return mockPromise<MockListItem>(mockDataList);
  }

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  try {
    const resp = await fetch(endpoint, options);

    return await resp.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
