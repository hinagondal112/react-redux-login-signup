import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddNewRow } from "../components/AddNewRow";
import { uploadCoverPhoto } from "../redux/actions/auth";
import { addBook } from "../redux/actions/auth";

function AddBookContainer() {
  const [submitted, setSubmitted] = useState(false);
  const [disable, setDisable] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFileSelect = (e) => {
    console.log(e.target.files[0]); //for now we only need one file
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data, e) => {
    setSubmitted(true);
    setDisable(true);
    console.log(data);
    if (setSubmitted) {
      let formData = new FormData();
      let imageUpload = null;
      console.log(file, "fileeeeeeeeeeeeeeeeeeeee");
      if (file) {
        formData.append("files", file);
        imageUpload = await dispatch(uploadCoverPhoto(formData));
      }
      console.log(imageUpload, "*******************************************");
      let addBookObject = {
        ...data,
        coverPhoto: file ? imageUpload[0].id : null,
      };
      dispatch(addBook(addBookObject)).then((res) => {
        history.push("/");
        console.log("book addeddddddddddddddddd");
      });
    }
  };
  return (
    <div>
      <AddNewRow
        submit={onSubmit}
        handleFileSelect={handleFileSelect}
        disable={disable}
      />
    </div>
  );
}

export default AddBookContainer;
