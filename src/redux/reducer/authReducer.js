import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
  ADD_BOOKS_SUCCESS,
  ADD_BOOKS_FAILURE,
  DELETE_BOOK_SUCCESS,
  SINGLE_BOOK_SUCCESS,
  UPDATE_SINGLE_BOOK,
  UPDATE_SINGLE_BOOK_FAILURE,
  UPLOAD_COVER_PHOTO_SUCCESS,
  UPLOAD_COVER_PHOTO_FAILURE,
  SINGLE_BOOK_DETAIL_SUCCESS,
  SINGLE_BOOK_DETAIL_FAILURE,
  CLEAR_SINGLE_BOOK
} from "../actions/actionTypes";

const initialState = {
  identifier: null,
  password: null,
  isLoggedIn: true,
  registering: null,
  book: [],
  newBook: null,
  singleBook: null,
  coverPhoto: null,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        registering: true,
        user: action.payload,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case GET_BOOKS_SUCCESS:
      console.log(action.payload, "Reducer");
      return {
        ...state,
        isLoggedIn: true,
        book: action.payload,
      };

    case GET_BOOKS_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        book: null,
      };
    case ADD_BOOKS_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        newBook: action.payload,
      };
    case ADD_BOOKS_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        newBook: null,
      };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case SINGLE_BOOK_SUCCESS:
      return {
        ...state,
        singleBook: action.payload,
      };
    case UPDATE_SINGLE_BOOK:
      return {
        ...state,
        isLoggedIn: false,
        coverPhoto: action.payload
      };
    case UPDATE_SINGLE_BOOK_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };
    case UPLOAD_COVER_PHOTO_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        coverPhoto: action.payload,
      };
    case UPLOAD_COVER_PHOTO_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };
    case SINGLE_BOOK_DETAIL_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        singleBook: action.payload
      }
    case SINGLE_BOOK_DETAIL_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      }
    case CLEAR_SINGLE_BOOK:
          return {
            ...state,
            singleBook:null,
            isLoggedIn: false,
          
          }
    
    default:
      return state;
  }
};
