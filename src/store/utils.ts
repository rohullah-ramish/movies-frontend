import { Action, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export function isHydrateAction(action: Action): action is PayloadAction<any> {
  return action.type === HYDRATE;
}
