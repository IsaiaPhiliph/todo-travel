import React from "react";
import { IKActions } from "./actions";
import { IKState, initialIKState } from "./state";

export const IKContext = React.createContext<{
  state: IKState;
  dispatch: React.Dispatch<IKActions>;
}>({
  state: initialIKState,
  dispatch: () => undefined,
});
