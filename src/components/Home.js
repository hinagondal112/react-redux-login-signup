import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { deleteBook, getBook } from "../redux/actions/auth";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { forwardRef } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { authReducer } from "../redux/reducer/authReducer";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Confirm from "./Confirm";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import { BASE_URL } from "../utils/Api";
import AddIcon from "@material-ui/icons/Add";
import DetailsTwoToneIcon from "@material-ui/icons/DetailsTwoTone";

//Styling
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  loader: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  body: {
    fontSize: 14,
  },
  avatar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 900,
    marginTop: 20,
  },
});

const Home = (props) => {
  //Main Function

  const classes = useStyles();
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.authReducer);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const history = useHistory();

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleDelete = (id) => {
    console.log("pressed");
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteBook(id));
  };

  return (
    <div>
      {loading ? (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <h1>Book Table</h1>
          <Grid container justifyContent="center">
            <Grid item>
              <IconButton
                onClick={() => history.push("/add-book")}
                edge="end"
                aria-label="comments"
              >
                <AddIcon />
                Add new Book
              </IconButton>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Cover Photo</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Author</StyledTableCell>
                  <StyledTableCell align="center">No Of Pages</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {book &&
                  book.map((obj) => (
                    <StyledTableRow key={obj.id}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Avatar
                          align="center"
                          className={classes.small}
                          src={`${BASE_URL}${obj.coverPhoto?.url}`}
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {obj.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {obj.author}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {obj.noOfPages}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {obj.category}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          onClick={() => history.push(`/show-detail/${obj.id}`)}
                          edge="end"
                          aria-label="comments"
                        >
                          <DetailsTwoToneIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => history.push(`/edit-book/${obj.id}`)}
                          edge="end"
                          aria-label="comments"
                        >
                          <EditIcon />
                        </IconButton>
                        &nbsp;
                        <IconButton
                          onClick={() =>
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this book?",
                              subtitle: "You can't undo this operation.",
                              onConfirm: () => {
                                handleDelete(obj.id);
                              },
                            })
                          }
                          edge="end"
                          aria-label="comments"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button onClick={handleLogout} variant="outlined" color="secondary">
            logout
          </Button>

          <Confirm
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
