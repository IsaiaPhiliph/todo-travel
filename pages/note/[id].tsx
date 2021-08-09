import {
  Button,
  Card,
  CircularProgress,
  Container,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import SaveIcon from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/Check";
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  SnapshotOptions,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { IKContext } from "../../context/context";
import { setLoading } from "../../context/reducer";
import { db } from "../../firebase/firebase";
import PrimarySearchAppBar from "../../layout/AppBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      background: theme.palette.background.default,
    },
    inputsContainer: {
      width: "100%",
      padding: theme.spacing(2),
      "& > *": {
        width: "100%",
        "& > *": {
          width: "100%",
        },
      },
      "& > *:not(:last-child)": {
        marginBottom: theme.spacing(1),
      },
    },
    card: {
      marginTop: theme.spacing(4),
    },
    wrapper: {
      position: "relative",
    },
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

interface NoteData extends DocumentData {
  title: string;
  content: string;
}

export default function SingleNote() {
  const router = useRouter();
  const { id } = router.query;
  const [docRef, setDocRef] = useState<DocumentReference<NoteData>>();
  const { state, dispatch } = useContext(IKContext);
  const [saved, setSaved] = useState(false);
  const classes = useStyles();
  const [note, setNote] = useState<{
    data: NoteData;
    id: string;
  }>();
  useEffect(() => {
    if (state.currentUser) {
      const note = doc(
        db,
        `users/${state.currentUser.email}/notes/${id}`
      ) as DocumentReference<NoteData>;
      setDocRef(note);
      const getNoteDoc = async () => {
        const doc = await getDoc(note);
        const data = doc.data();
        const id = doc.id;
        if (data && id) setNote({ data, id });
      };
      getNoteDoc();
    }
  }, [id, state.currentUser]);
  const handleSave = async () => {
    try {
      dispatch(setLoading(true));
      if (docRef) await updateDoc(docRef, { ...note?.data });
      dispatch(setLoading(false));
      setSaved(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={classes.root}>
      <Head>
        <title>{note?.data.title}</title>
      </Head>
      <PrimarySearchAppBar />
      <Container>
        <Card className={classes.card}>
          <Grid
            className={classes.inputsContainer}
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Grid item>
              <TextField
                onChange={(e) => {
                  setSaved(false);
                  setNote((prevState) => {
                    if (prevState)
                      return {
                        ...prevState,
                        data: { ...prevState.data, title: e.target.value },
                      };
                  });
                }}
                variant="outlined"
                value={note?.data.title}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                multiline
                value={note?.data.content}
                onChange={(e) => {
                  setSaved(false);
                  setNote((prevState) => {
                    if (prevState)
                      return {
                        ...prevState,
                        data: { ...prevState.data, content: e.target.value },
                      };
                  });
                }}
              />
            </Grid>
            <Grid item container className={classes.wrapper}>
              <Button
                disabled={state.loading}
                startIcon={saved ? <CheckIcon /> : <SaveIcon />}
                onClick={handleSave}
                color="primary"
                variant="outlined"
              >
                Guardar
              </Button>
              {state.loading && (
                <CircularProgress
                  className={classes.buttonProgress}
                  size={24}
                />
              )}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}
