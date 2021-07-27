import React, { useState } from "react";
import { clearSingleBook } from "../redux/actions/auth";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Detail from "../components/Detail";
import { showSingleBookDetail } from "../redux/actions/auth";
import { CircularProgress } from "@material-ui/core";

function DetailPageContainer() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const singleBook = useSelector((state) => state.authReducer.singleBook);

  useEffect(() => {
    setLoading(true);
    dispatch(showSingleBookDetail(id)).then((res) => {
      setLoading(false);
    });
    return () => {
      dispatch(clearSingleBook());
    };
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Detail singleBook={singleBook} />
        </div>
      )}
    </div>
  );
}

export default DetailPageContainer;
