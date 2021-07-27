import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { setSnackbar } from "../redux/reducer/snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbars = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackbarOpen = useSelector(
    (state) => state?.snackbarReducer?.snackbarOpen
  );
  const snackbarType = useSelector(
    (state) => state?.snackbarReducer?.snackbarType
  );
  const snackbarMessage = useSelector(
    (state) => state?.snackbarReducer?.snackbarMessage
  );
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackbar(false, snackbarType, snackbarMessage));
  };

  console.log(snackbarOpen, "Open");
  console.log(snackbarType, "type");
  console.log(snackbarMessage, "message");

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
