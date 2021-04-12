import { useNuiEvent } from "./useNuiEvent";
import { useSetRecoilState } from "recoil";
import { visibleAtom } from "../recoil/atoms/visible.atom";

export const useMainService = () => {
  const setVisible = useSetRecoilState(visibleAtom);

  useNuiEvent<boolean>("setVisible", setVisible);
};
