import { User } from "firebase/auth";
import {
  ActionType,
  AddNote,
  CloseDrawer,
  IKActions,
  SetLoading,
  SetUser,
  ToggleDeleteModal,
  ToggleDrawer,
} from "./actions";
import { DeleteModal, IKNote, IKState } from "./state";

export function IKReducer(state: IKState, action: IKActions): IKState {
  switch (action.type) {
    case ActionType.AddNote:
      return { ...state, notes: [...state.notes, action.payload] };

    case ActionType.ToggleDrawer:
      return { ...state, drawerToggled: !state.drawerToggled };
    case ActionType.CloseDrawer:
      return { ...state, drawerToggled: false };
    case ActionType.SetUser:
      return { ...state, currentUser: action.payload };
    case ActionType.SetLoading:
      return { ...state, loading: action.payload };
    case ActionType.ToggleDeleteModal:
      return { ...state, deleteModal: action.payload };
    default:
      return state;
  }
}

export const addNote = (note: IKNote): AddNote => ({
  type: ActionType.AddNote,
  payload: note,
});

export const toggleDrawer = (): ToggleDrawer => ({
  type: ActionType.ToggleDrawer,
});

export const closeDrawer = (): CloseDrawer => ({
  type: ActionType.CloseDrawer,
});

export const setUser = (user: User | undefined): SetUser => ({
  type: ActionType.SetUser,
  payload: user,
});

export const setLoading = (payload: boolean): SetLoading => ({
  type: ActionType.SetLoading,
  payload,
});

export const setDeleteModal = (payload: DeleteModal): ToggleDeleteModal => ({
  type: ActionType.ToggleDeleteModal,
  payload,
});
