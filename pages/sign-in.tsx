import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useContext } from "react";
import { IKContext } from "../context/context";
import LoadingScreen from "../components/loading/LoadingScreen";
import useGetAuthState from "../hooks/useGetAuthState";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 0, 0),
  },
  google: {
    margin: theme.spacing(1, 0, 2, 0),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { state, dispatch } = useContext(IKContext);
  const { loading } = state;
  const router = useRouter();
  useEffect(() => {
    if (state.currentUser?.email) {
      router.push("/");
    }
  }, [state.currentUser?.email]);

  const loginWithGoogle = () => {
    const auth = getAuth();

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();
        // In memory persistence will be applied to the signed in Google user
        // even though the persistence was set to 'none' and a page redirect
        // occurred.
        return signInWithRedirect(auth, provider);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesi??n
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electr??nico"
                name="email"
                autoComplete="email"
                autoFocus
                disabled
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contrase??a"
                type="password"
                id="password"
                autoComplete="current-password"
                disabled
              />
              <FormControlLabel
                control={<Checkbox disabled value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled
              >
                Iniciar sesi??n
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.google}
                onClick={loginWithGoogle}
              >
                Iniciar sesi??n con Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Olvidaste tu contrase??a?
                  </Link>
                </Grid>
                <Grid item container justifyContent="center">
                  <Link href="#" variant="body2">
                    {"No tienes cuenta? Crea una cuenta!"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          {/* <Box mt={8}>
        <Copyright />
      </Box> */}
        </Container>
      )}
    </>
  );
}
