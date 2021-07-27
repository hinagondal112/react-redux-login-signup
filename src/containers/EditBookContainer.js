import React from "react";
import {
  addBook,
  updateSingleBook,
  getSingleBook,
  getBook,
  uploadCoverPhoto,
} from "../redux/actions/auth";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditBook } from "../components/EditBook";
import { CircularProgress } from "@material-ui/core";

const EditBookContainer = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const { singleBook } = useSelector((state) => state?.authReducer);

  const [state, setState] = useState({
    name: "",
    author: "",
    noOfPages: "",
    category: "",
  });

  const { name, author, noOfPages, category } = state;

  const handleFileSelect = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setSubmitted(true);
    setDisable(true);

    console.log(data, "data");
    if (setSubmitted) {
      let formData = new FormData();
      let imageUpload = null;

      if (file) {
        formData.append("files", file);
        imageUpload = await dispatch(uploadCoverPhoto(formData));
      }

      let updatedData = null;

      imageUpload === null
        ? (updatedData = { ...data })
        : (updatedData = { ...data, coverPhoto: imageUpload[0]?.id });
      console.log(state, "state", data);
      dispatch(updateSingleBook(updatedData, id)).then((res) => {
        history.push("/");
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getSingleBook(id)).then((response) => {
      setLoading(false);
      console.log({ response });
    });
  }, []);

  useEffect(() => {
    console.log(singleBook, "singleBook");
    if (singleBook) {
      setState({ ...singleBook });
    }
  }, [singleBook]); // meny yeh useEffect component me lgaya tha to aa gya tha but us k bd update nae hoti book

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <EditBook
            submit={onSubmit}
            handleFileSelect={handleFileSelect}
            singleBook={state}
            disable={disable}
          />
        </div>
      )}
    </div>
  );
};

export default EditBookContainer;
