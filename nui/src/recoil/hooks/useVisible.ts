import { useRecoilValue } from "recoil";
import { visibleAtom } from "../atoms/visible.atom";

export const useVisible = () => {
  return useRecoilValue(visibleAtom);
};
