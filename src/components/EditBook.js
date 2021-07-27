import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { useHistory, useParams } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  addBook,
  updateSingleBook,
  getSingleBook,
  getBook,
} from "../redux/actions/auth";
import { uploadCoverPhoto } from "../redux/actions/auth";

import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { CircularProgress } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { BASE_URL } from "../utils/Api";
import EditBookContainer from "../containers/EditBookContainer";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loader: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  formControl: {
    minWidth: 100,
  },
  cardHeight: {
    maxWidth: 150,
  },
  media: {
    height: 145,
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(3),
    "& p": {
      color: "red",
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const EditBook = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const classes = useStyles();

  const [state, setState] = useState({
    name: props.singleBook.name,
    author: props.singleBook.author,
    noOfPages: props.singleBook.noOfPages,
    category: props.singleBook.category,
  });

  const { name, author, noOfPages, category } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleImagePreview = (e) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      setImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm();

  return (
    <div>
      {loading ? (
        <div className={classes.loader}>
          {" "}
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Container component="main" maxWidth="xs">
            <h3 align="center">Update your book</h3>

            <div className="addForm">
              {props.singleBook && (
                <ValidatorForm
                  onSubmit={handleSubmit(() => props.submit(state))}
                  className={classes.form}
                >
                  <Card className={classes.cardHeight}>
                    <CardMedia
                      className={classes.media}
                      name="coverPhoto"
                      image={`${BASE_URL}${props.singleBook?.coverPhoto?.url}`}
                    />
                  </Card>

                  <hr />
                  <TextValidator
                    name="name"
                    label="Book Name"
                    fullWidth
                    variant="outlined"
                    autoComplete="given-name"
                    type="text"
                    //defaultValue={getValues("name")}
                    value={name}
                    onChange={handleInputChange}
                    validators={["required"]}
                    errorMessages={["please enter book name"]}
                  />
                  <hr />
                  <TextValidator
                    name="author"
                    label="Author"
                    fullWidth
                    type="text"
                    variant="outlined"
                    value={author || ""}
                    onChange={handleInputChange}
                    validators={["required"]}
                    errorMessages={["please enter author name"]}
                  />
                  <hr />
                  <TextValidator
                    name="noOfPages"
                    label="No of pages"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={noOfPages || ""}
                    onChange={handleInputChange}
                    validators={["minNumber:0"]}
                    errorMessages={["please enter valid no of pages"]}
                  />

                  <FormControl className={classes.textField}>
                    <InputLabel align-content="left">Category</InputLabel>

                    <Select
                      className="select"
                      value={category || ""}
                      onChange={handleInputChange}
                      name="category"
                      defaultValue=""
                      required
                    >
                      <MenuItem value="">Select category</MenuItem>
                      <MenuItem value="horror">Horror</MenuItem>
                      <MenuItem value="thriller">Thriller</MenuItem>
                      <MenuItem value="suspense">Suspense</MenuItem>
                      <MenuItem value="action">Action</MenuItem>
                      <MenuItem value="drama">Drama</MenuItem>
                    </Select>
                  </FormControl>
                  <hr />

                  <div className="addImage">
                    <label htmlFor="btn-upload">
                      <input
                        id="btn-upload"
                        name="btn-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          props.handleFileSelect(e);
                          handleImagePreview(e);
                        }}
                      />
                    </label>
                    <div>
                      <img src={image} />
                    </div>
                  </div>

                  <hr />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={props.disable}
                  >
                    Update Book
                  </Button>
                </ValidatorForm>
              )}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};
