import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { mockDataListAtom } from "../atoms/mockDataList.atom";

export const useMockDataList = () => {
  return useRecoilState(mockDataListAtom);
};

export const useMockDataListValue = () => {
  return useRecoilValue(mockDataListAtom);
};

export const useSetMockDataList = () => {
  return useSetRecoilState(mockDataListAtom);
};
