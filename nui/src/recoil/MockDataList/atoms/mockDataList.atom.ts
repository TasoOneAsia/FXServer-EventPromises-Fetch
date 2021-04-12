import { atom } from "recoil";
import { MockListItem } from "../mockDataList.type";

export const mockDataListAtom = atom<MockListItem[]>({
  key: "mockDataList",
  default: [],
});
