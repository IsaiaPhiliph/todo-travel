import { User } from "firebase/auth";

export interface IKState {
  notes: IKNote[];
  drawerToggled: boolean;
  currentUser: User | undefined;
  loading: boolean;
  deleteModal: DeleteModal;
}

export interface IKNote {
  title: string;
  content: string;
}

export interface DeleteModal {
  toggled: boolean;
  id: string;
}

export const initialIKState: IKState = {
  notes: [],
  drawerToggled: false,
  currentUser: undefined,
  loading: true,
  deleteModal: { toggled: false, id: "" },
};
