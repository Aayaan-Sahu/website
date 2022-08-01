import { createContext, useContext } from "react";

export type MountedWrapper = {
  mounted: boolean;
  setMounted: (mounted: boolean) => void;
};

export const MountedContext = createContext<MountedWrapper>({
  mounted: false,
  setMounted: () => {},
})

export const useMountedContext = () => useContext(MountedContext);