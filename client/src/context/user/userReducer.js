import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_USERS,
  USERS_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_USERS,
  CLEAR_FILTER,
  ASCEND_USERS,
  DESCEND_USERS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: [...action.payload]
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        )
      };
    case USERS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_USERS:
      return {
        ...state,
        filtered: state.users.filter(contact => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case ASCEND_USERS:
      return {
        ...state,
        users: state.users.sort((a, b) => (a.name > b.name ? 1 : -1))
      };
    case DESCEND_USERS:
      return {
        ...state,
        users: state.users.sort((a, b) => (a.name < b.name ? 1 : -1))
      };
    default:
      return state;
  }
};
