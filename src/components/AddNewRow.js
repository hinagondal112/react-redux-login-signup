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
import { useHistory } from "react-router-dom";
import { addBook } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { uploadCoverPhoto } from "../redux/actions/auth";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

export const AddNewRow = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState(null);
  const [disable, setDisable] = useState(false);
  const [image, setImage] = useState(null);
  const [state, setState] = useState();

  const classes = useStyles();

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
  } = useForm();

  return (
    <Container component="main" maxWidth="xs">
      <h1 align="center">Add new books</h1>
      <div className="addForm">
        <form
          onSubmit={handleSubmit(props.submit)}
          className={classes.form}
          noValidate
        >
          <hr />
          <TextField
            name="name"
            label="Book Name"
            fullWidth
            variant="outlined"
            autoComplete="given-name"
            {...register("name", {
              required: "This field is required",
            })}
            error={errors.name}
            helperText={errors.name?.message}
            error={errors.name}
          />
          <hr />
          <TextField
            name="author"
            label="Author"
            fullWidth
            variant="outlined"
            {...register("author", { required: true })}
            error={errors.author}
            helperText={errors.author && "Please enter Author name."}
          />
          <hr />
          <TextField
            name="noOfPages"
            label="No of pages"
            type="number"
            fullWidth
            variant="outlined"
            InputProps={{ inputProps: { min: 1, max: 100 } }}
            {...register("noOfPages", { required: true, min: 0 })}
            error={errors.noOfPages}
            helperText={errors.noOfPages && "Please write valid no of pages."}
          />

          <FormControl className={classes.textField}>
            <InputLabel align-content="left">Category</InputLabel>
            <Controller
              render={(props) => {
                return (
                  <Select
                    className="select"
                    value={props.field.value}
                    onChange={props.field.onChange}
                    required
                  >
                    <MenuItem value="horror">Horror</MenuItem>
                    <MenuItem value="thriller">Thriller</MenuItem>
                    <MenuItem value="suspense">Suspense</MenuItem>
                    <MenuItem value="action">Action</MenuItem>
                    <MenuItem value="drama">Drama</MenuItem>
                  </Select>
                );
              }}
              name="category"
              control={control}
            />
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={props.disable}
          >
            Add Book
          </Button>
        </form>
      </div>
    </Container>
  );
};
