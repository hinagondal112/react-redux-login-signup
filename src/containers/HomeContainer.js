import React from "react";
import Home from "../components/Home";
import { getBook } from "../redux/actions/auth";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

function HomeContainer() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.authReducer);

  useEffect(() => {
    setLoading(true);
    dispatch(getBook()).then((res) => {
      setLoading(false);
      console.log(res, "get book action");
    });
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Home />
        </div>
      )}
    </div>
  );
}

export default HomeContainer;
