import {
  createStyles,
  makeStyles,
  Theme,
  Grid,
  InputBase,
  Card,
  Divider,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useContext } from "react";
import { IKContext } from "../../context/context";

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815,
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

export default function AddNote() {
  const [focused, setFocused] = useState(false);
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "350px",
      },
      card: {
        padding: theme.spacing(2),
      },
      content: {
        display: "flex",
        alignItems: "start",
      },
      title: {
        width: "100%",
      },
    })
  );
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const contentInfoRef = useRef<HTMLElement>();
  const titleRef = useRef<HTMLElement>();
  const rootRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useContext(IKContext);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.currentUser) {
      return;
    }
    console.log(title, content);
    try {
      const userDocRef = doc(db, `users/${state.currentUser.email}`);
      const userNotesCollRef = collection(userDocRef, "notes");

      await addDoc(userNotesCollRef, {
        title,
        content,
        createdAt: new Date(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (contentInfoRef.current) {
      contentInfoRef.current.addEventListener("focusin", (e) => {
        setFocused(true);
      });
      window.addEventListener("mousedown", (e) => {
        if (
          !(
            contentInfoRef.current?.contains(e.target as Node) ||
            rootRef.current?.contains(e.target as Node)
          ) &&
          focused
        ) {
          setFocused(false);
        }
      });
    }
  }, [contentInfoRef, focused]);

  return (
    <div className={classes.root} ref={rootRef}>
      <Card className={classes.card}>
        <form onSubmit={handleFormSubmit}>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="stretch"
          >
            {focused && (
              <>
                <Grid item>
                  <InputBase
                    ref={titleRef}
                    className={classes.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titulo"
                  />
                </Grid>
                <Divider />
              </>
            )}

            <Grid item>
              <InputBase
                ref={contentInfoRef}
                multiline
                value={content}
                style={{ minHeight: focused ? "100px" : "" }}
                onChange={(e) => setContent(e.target.value)}
                className={classes.content}
                placeholder="Añadir una nueva nota"
              />
            </Grid>
          </Grid>
          <button type="submit" style={{ display: "none" }} />
        </form>
      </Card>
    </div>
  );
}
