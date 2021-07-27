import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showSingleBookDetail } from "../redux/actions/auth";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { BASE_URL } from "../utils/Api";
import { makeStyles } from "@material-ui/core/styles";
import { clearSingleBook } from "../redux/actions/auth";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardHeight: {
    maxWidth: 150,
  },
  media: {
    height: 145,
  },
}));

const Detail = (props) => {
  const history = useHistory();
  const { id } = useParams();

  const classes = useStyles();

  return (
    <div className="detail" align="center">
      <Card className={classes.cardHeight}>
        <CardMedia
          className={classes.media}
          name="coverPhoto"
          image={`${BASE_URL}${props.singleBook?.coverPhoto?.url}`}
        />
      </Card>
      <p>Name : {props.singleBook?.name}</p>
      <p>Author Name : {props.singleBook?.author}</p>
      <p>No of pages : {props.singleBook?.noOfPages}</p>
      <p>Category : {props.singleBook?.category}</p>
      <div>
        <button
          onClick={() => history.push(`/edit-book/${props.singleBook.id}`)}
        >
          {" "}
          Edit Book
        </button>
      </div>
    </div>
  );
};

export default Detail;
