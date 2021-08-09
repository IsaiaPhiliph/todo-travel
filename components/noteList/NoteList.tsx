import {
  Button,
  Card,
  Checkbox,
  Container,
  createStyles,
  FormControlLabel,
  Grid,
  makeStyles,
  Modal,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AddNote from "../../components/addNote/AddNote";
import Note from "../../components/note/Note";
import { IKContext } from "../../context/context";
import { setDeleteModal } from "../../context/reducer";
import { initialIKState } from "../../context/state";
import { db } from "../../firebase/firebase";
import PrimarySearchAppBar from "../../layout/AppBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    notesContainer: {
      marginTop: theme.spacing(4),
    },
    app: {
      minHeight: "100vh",
      background: theme.palette.background.default,
    },
    modal: {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

function shuffleArray(
  array: Array<{
    id: string;
    data: DocumentData;
  }>
) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default function NoteList() {
  const classes = useStyles();
  const [notes, setNotes] = useState<{ id: string; data: DocumentData }[]>();
  const { state, dispatch } = useContext(IKContext);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    const userDocRef = doc(db, `users/${state.currentUser?.email}`);
    const userNotesCollRef = collection(userDocRef, "notes");
    const unsuscribe = onSnapshot(userNotesCollRef, (snap) => {
      console.log(snap.docs);
      const docs = snap.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
      if (shuffle) {
        setNotes(shuffleArray(docs));
      } else {
        setNotes(docs);
      }
    });
    return () => unsuscribe();
  }, [state.currentUser?.email, shuffle]);

  const handleDeleteNote = async () => {
    try {
      const userRef = doc(db, `users/${state.currentUser?.email}`);
      const userNotesCollection = collection(userRef, "notes");
      const note = doc(userNotesCollection, state.deleteModal.id);
      await updateDoc(note, {
        removed: true,
      });
      dispatch(setDeleteModal(initialIKState.deleteModal));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid container className={classes.app} direction="column">
      <Container className={classes.notesContainer}>
        <Modal
          open={state.deleteModal.toggled}
          onClose={() => dispatch(setDeleteModal(initialIKState.deleteModal))}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Card className={classes.modal}>
            <Grid container spacing={2}>
              <Grid item>
                <Typography>
                  Estás seguro de que quieres eliminar esta nota?
                </Typography>
              </Grid>
              <Grid item container>
                <FormControlLabel
                  control={<Checkbox name="checkedB" color="secondary" />}
                  label="No volver a preguntar"
                />
              </Grid>
              <Grid container justifyContent="flex-end" spacing={2}>
                <Grid item>
                  <Button
                    onClick={() =>
                      dispatch(setDeleteModal(initialIKState.deleteModal))
                    }
                  >
                    Cancelar
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    onClick={handleDeleteNote}
                    variant="contained"
                    color="secondary"
                  >
                    Borrar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Modal>
        <Grid container spacing={4} direction="column" alignItems="center">
          <Grid container direction="column" alignItems="center" spacing={1}>
            <AddNote />
            <Button
              onClick={() => {
                setShuffle(!shuffle);
              }}
              color="primary"
            >
              Suffle
            </Button>
          </Grid>
          <Grid container spacing={2} item justifyContent="center">
            {notes?.map((note) => {
              return !note.data.removed ? (
                <Grid item key={note.id}>
                  <Note
                    title={note.data.title}
                    content={note.data.content}
                    id={note.id}
                  />
                </Grid>
              ) : null;
            })}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
