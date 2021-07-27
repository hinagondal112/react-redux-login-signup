import React from "react";
import { Login } from "../components/Login";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/auth";

const LoginContainer = () => {
  const [disable, setDisable] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    identifier: "",
    password: "",
  });
  const { identifier, password } = inputs;
  const onSubmit = (identifier, password) => {
    setSubmitted(true);
    setDisable(true);
    console.log(identifier, password);
    if (identifier && password) {
      const { from } = location.state || { from: { pathname: "/login" } };
      dispatch(login(identifier, password, from)).then((res) => {
        history.push("/");
      });
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
      <Login submit={onSubmit} disable={disable} />
    </div>
  );
};

export default LoginContainer;
