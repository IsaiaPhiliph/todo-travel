import { User } from "firebase/auth";
import { DeleteModal, IKNote } from "./state";

export enum ActionType {
  AddNote,
  ToggleDrawer,
  CloseDrawer,
  SetUser,
  SetLoading,
  ToggleDeleteModal,
}

export interface AddNote {
  type: ActionType.AddNote;
  payload: IKNote;
}

export interface SetUser {
  type: ActionType.SetUser;
  payload: User | undefined;
}

export interface ToggleDrawer {
  type: ActionType.ToggleDrawer;
}

export interface CloseDrawer {
  type: ActionType.CloseDrawer;
}

export interface SetLoading {
  type: ActionType.SetLoading;
  payload: boolean;
}

export interface ToggleDeleteModal {
  type: ActionType.ToggleDeleteModal;
  payload: DeleteModal;
}

export type IKActions =
  | AddNote
  | ToggleDrawer
  | CloseDrawer
  | SetUser
  | SetLoading
  | ToggleDeleteModal;
//
