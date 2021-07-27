import Api from "../../utils/Api";
import { setSnackbar } from "../reducer/snackbar";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_MESSAGE,
  GET_BOOKS_FAILURE,
  GET_BOOKS_SUCCESS,
  ADD_BOOKS_SUCCESS,
  ADD_BOOKS_FAILURE,
  SNACKBAR_SUCCESS,
  SNACKBAR_CLEAR,
  DELETE_BOOK,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  SINGLE_BOOK_SUCCESS,
  SINGLE_BOOK_Failure,
  UPDATE_SINGLE_BOOK,
  UPDATE_SINGLE_BOOK_FAILURE,
  UPLOAD_COVER_PHOTO_FAILURE,
  UPLOAD_COVER_PHOTO_SUCCESS,
  SINGLE_BOOK_DETAIL_FAILURE,
  SINGLE_BOOK_DETAIL_SUCCESS,
  CLEAR_SINGLE_BOOK,
} from "./actionTypes";

const users = JSON.parse(localStorage.getItem("users")) || [];

/*********************************login action*********************** */

export const login =
  ({ identifier, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({
      identifier,
      password,
    });

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };
    try {
      const response = await Api.post("/auth/local", body, config);

      dispatch(loginSuccess(identifier, password));

      if (response.data) {
        console.log(response.data, "=========================");
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: response.data.jwt,
          })
        );
      }

      return { status: response.status, data: response.data };
      dispatch(showSuccessSnackbar("Success!"));
    } catch (error) {
      dispatch(loginFailure());
      dispatch(setSnackbar(true, "error", "Login failed, please try again "));
      return {
        status: error.response.status,
        error: error,
      };
    }
  };
/*********************************Signup action******************************/
export const signup =
  ({ username, email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({
      username,
      email,
      password,
    });

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };
    try {
      const response = await Api.post(`/auth/local/register`, body, config);

      dispatch({ type: "SIGNUP_SUCCESS", payload: response.data });

      if (response.data) {
        localStorage.setItem(
          "token",
          JSON.stringify({
            isRegistered: true,
            token: response.data.jwt,
          })
        );
      }
      return { status: response.status, data: response.data };
      dispatch(setSnackbar(true, "success", "You Are Registered! "));
      console.log(response.data);
    } catch (error) {
      dispatch(signupFailure());
      dispatch(setSnackbar(true, "error", "Signup failed, please try again "));

      return { status: error.response.status, error: error };
    }
  };

/*********************************Get Book action*********************** */

export const getBook = () => async (dispatch) => {
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  token = token.token;

  console.log({ token }, "###");
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await Api.get("/books", config);

    dispatch(getBookSuccess(response.data));
    console.log(response);
    return { status: response?.status, data: response.data };
  } catch (error) {
    dispatch(getBookFailure());
    dispatch(
      setSnackbar(true, "error", "there is some problem, please try again ")
    );
    console.log(error);
    return {
      status: error?.response?.status,
      error: error,
    };
  }
};

/*********************************Add Book action*********************** */
/*******************************/
/**********************/
export const addBook =
  ({ name, author, noOfPages, category, coverPhoto }) =>
  async (dispatch) => {
    const body = JSON.stringify({
      name,
      author,
      noOfPages,
      category,
      coverPhoto,
    });

    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    token = token.token;

    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Api.post("/books", body, config)
      .then((response) => {
        dispatch(addBookSuccess());
        response = response.data;
        dispatch(setSnackbar(true, "success", "Book added successfully "));
        console.log(response);
        return response;
      })
      .catch((error) => {
        dispatch(addBookFailure());
        dispatch(
          setSnackbar(
            true,
            "error",
            "failed to complete process, please try again"
          )
        );
        console.log(error);
        return response;
      });
  };
/*********************************Delete Book action*********************** */
/*******************************/
/**********************/
export const deleteBook = (id) => async (dispatch) => {
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  token = token.token;

  console.log({ token }, "###");
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await Api.delete(`/books/${id}`, config)
    .then((response) => {
      console.log(response, "delete book response");
      dispatch(deleteBookSuccess());
      dispatch(setSnackbar(true, "success", "Book deleted successfully "));
      dispatch(getBook());
    })
    .catch()
    .catch((error) => {
      dispatch(deleteBookFailure());
      dispatch(
        setSnackbar(true, "error", "failed to delete book, please try again")
      );
      console.log(error);
    });
};
/*********************************Get single Book action*********************** */
/*******************************/
/**********************/

export const getSingleBook = (id) => async (dispatch) => {
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  token = token.token;

  console.log({ token }, "###");
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await Api.get(`/books/${id}`, config)
    .then((response) => {
      console.log(response, "single book response");
      dispatch(getSingleBookSuccess(response.data));
      return response;
    })
    .catch((error) => {
      dispatch(getSingleBookFailure());
      dispatch(
        setSnackbar(
          true,
          "error",
          "failed to get single book, please try again"
        )
      );
    });
  return response;
};

/*******************************upload cover photo action*********************** */
/*******************************/
/**********************/

export const uploadCoverPhoto = (coverPhoto) => async (dispatch) => {
  const body = coverPhoto;

  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  token = token.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await Api.post("/upload", body, config)
    .then((response) => {
      dispatch(uploadCoverPhotoSuccess(coverPhoto));
      response = response.data;
      // dispatch(setSnackbar(true, "success", "Book added successfully "));
      console.log(response);
      return response;
    })
    .catch((error) => {
      dispatch(uploadCoverPhotoFailure());
      //   dispatch( setSnackbar(true, "error", "failed to complete process, please try again"));
      console.log(error);
    });
  return response;
};

/*******************************Update single Book action*********************** */
/*******************************/
/**********************/

export const updateSingleBook =
  ({ name, author, noOfPages, category, coverPhoto }, id) =>
  async (dispatch) => {
    console.log({ author, name });
    const body = JSON.stringify({
      name,
      author,
      noOfPages,
      category,
      coverPhoto,
    });

    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    token = token.token;
    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Api.put(`/books/${id}`, body, config)
      .then((response) => {
        console.log(response, "single book response");
        dispatch(updateSingleBookSuccess());
        dispatch(getBook());
        dispatch(setSnackbar(true, "success", "Book is updated successfully"));
      })
      .catch((error) => {
        dispatch(updateSingleBookFailure());
        dispatch(
          setSnackbar(
            true,
            "error",
            "failed to update single book, please try again"
          )
        );
      });
  };

/*******************************Show single book detail*********************** */
/*******************************/
/**********************/

export const showSingleBookDetail = (id) => async (dispatch) => {
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  token = token.token;

  console.log({ token }, "###");
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await Api.get(`/books/${id}`, config)
    .then((response) => {
      console.log(response, "single book response");
      dispatch(singleBookDetailSuccess(response.data));
      return response;
    })
    .catch((error) => {
      dispatch(singleBookDetailFailure());
      dispatch(
        setSnackbar(
          true,
          "error",
          "failed to get single book, please try again"
        )
      );
    });
  return response;
};

export const singleBookDetailSuccess = (singleBook) => ({
  type: SINGLE_BOOK_DETAIL_SUCCESS,
  payload: singleBook,
});

export const singleBookDetailFailure = (error) => ({
  type: SINGLE_BOOK_DETAIL_FAILURE,
  payload: error,
});

export const uploadCoverPhotoSuccess = (coverPhoto) => {
  console.log(coverPhoto, "photooooooooooo");
  return {
    type: UPLOAD_COVER_PHOTO_SUCCESS,
    payload: coverPhoto,
  };
};
export const uploadCoverPhotoFailure = (error) => ({
  type: UPLOAD_COVER_PHOTO_FAILURE,
  payload: error,
});

export const getSingleBookSuccess = (singleBook) => ({
  type: SINGLE_BOOK_SUCCESS,
  payload: singleBook,
});

export const getSingleBookFailure = (error) => ({
  type: SINGLE_BOOK_Failure,
  payload: error,
});

export const deleteBookSuccess = () => ({
  type: DELETE_BOOK_SUCCESS,
});
export const deleteBookFailure = () => ({
  type: DELETE_BOOK_FAILURE,
});

export const showSuccessSnackbar = (success) => ({
  type: SNACKBAR_SUCCESS,
  payload: success,
});

export const addBookSuccess = (newBook) => ({
  type: ADD_BOOKS_SUCCESS,
  payload: newBook,
});

export const addBookFailure = (error) => ({
  type: ADD_BOOKS_FAILURE,
  payload: error,
});

export const getBookSuccess = (book) => {
  return {
    type: GET_BOOKS_SUCCESS,
    payload: book,
  };
};

export const getBookFailure = (error) => ({
  type: GET_BOOKS_FAILURE,
  payload: error,
});

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const updateSingleBookSuccess = (book) => ({
  type: UPDATE_SINGLE_BOOK,
  payload: book,
});

export const updateSingleBookFailure = () => ({
  type: UPDATE_SINGLE_BOOK_FAILURE,
});

export const clearSingleBook = (singleBook) => {
  return {
    type: CLEAR_SINGLE_BOOK,
    payload: singleBook,
  };
};
