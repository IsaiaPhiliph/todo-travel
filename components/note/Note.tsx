import {
  Card,
  CardContent,
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
  Link as MLink,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useContext } from "react";
import { IKContext } from "../../context/context";
import { setDeleteModal } from "../../context/reducer";
import { motion } from "framer-motion";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: "350px",
    },
    title: {
      textAlign: "left",
    },
    content: {
      textAlign: "left",
    },
    card: {},
    titleContainer: {
      padding: theme.spacing(0, 0, 1, 0),
    },
    contentContainer: {
      padding: theme.spacing(2, 0, 0, 0),
    },
    noteTitle: {
      cursor: "pointer",
    },
  })
);

export default function Note({
  title,
  content,
  id,
}: {
  title: string;
  content: string;
  id: string;
}) {
  const classes = useStyles();
  const { dispatch } = useContext(IKContext);
  const noteUrl = `note/${id}`;
  return (
    <motion.div layout className={classes.root}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className={classes.titleContainer}
          >
            <Link passHref href={noteUrl}>
              <MLink>
                <Typography>{title}</Typography>
              </MLink>
            </Link>

            <IconButton
              onClick={() =>
                dispatch(setDeleteModal({ toggled: true, id: id }))
              }
            >
              <DeleteOutlineIcon color="secondary" />
            </IconButton>
          </Grid>
          <Divider />
          <Grid container className={classes.contentContainer}>
            <Typography>{content}</Typography>
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );
}
