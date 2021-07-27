import React from "react";
import { SignUp } from "../components/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { signup, signupSuccess } from "../redux/actions/auth";
import { Link, useHistory } from "react-router-dom";

function SignupContainer() {
  const [submitted, setSubmitted] = useState(false);
  const [disable, setDisable] = useState(false);
  const registering = useSelector((state) => state.authReducer.registering);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data, e) => {
    setSubmitted(true);
    setDisable(true);
    console.log(data);
    if (setSubmitted) {
      dispatch(signup(data));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("working on signup ");
    if (token) {
      history.push("/");
    }
  }, []);

  return (
    <div>
      <SignUp submit={onSubmit} disable={disable} />
    </div>
  );
}

export default SignupContainer;
