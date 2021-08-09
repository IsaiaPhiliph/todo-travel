import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/dist/client/router";
import React, { Dispatch, useContext, useEffect } from "react";
import { IKActions } from "../context/actions";
import { IKContext } from "../context/context";
import { setLoading, setUser } from "../context/reducer";
import { firebaseApp } from "../firebase/firebase";

export default function useGetAuthState({
  dispatch,
}: {
  dispatch: Dispatch<IKActions>;
}) {
  const auth = getAuth(firebaseApp);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        dispatch(setLoading(false));
      } else {
        router.push("/sign-in");
        dispatch(setLoading(false));
      }
    });
  }, [auth, dispatch]);
  return;
}
