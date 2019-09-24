import React, { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_USERS,
  USERS_ERROR,
  FILTER_USERS,
  CLEAR_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT,
  ASCEND_USERS,
  DESCEND_USERS
} from "../types";
import axios from "axios";

const UserState = props => {
  const initialState = {
    users: null,
    error: null,
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api");
      // console.log("RES.DATA", res.data);
      dispatch({ type: GET_USERS, payload: res.data });
    } catch (e) {
      dispatch({ type: USERS_ERROR, payload: e.message });
    }
  };

  // Add user
  const addUser = async user => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/add", user, config);

      dispatch({ type: ADD_USER, payload: res.data.user });
    } catch (e) {
      dispatch({ type: USERS_ERROR, payload: e.message });
    }
  };

  // Update user
  const updateUser = async user => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(`/api/update-user/${user._id}`, user, config);
      dispatch({ type: UPDATE_USER, payload: res.data });
    } catch (e) {
      dispatch({ type: USERS_ERROR, payload: e.response.msg });
    }
  };

  // Delete user
  const deleteUser = async id => {
    try {
      // eslint-disable-next-line
      const res = await axios.delete(`/api/user/${id}`);

      dispatch({ type: DELETE_USER, payload: id });
    } catch (e) {
      dispatch({ type: USERS_ERROR, payload: e.response.msg });
    }
  };

  // Set current target
  const setCurrent = user => {
    dispatch({ type: SET_CURRENT, payload: user });
  };

  // Clear current target
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Set search filter
  const filterUsers = text => {
    dispatch({ type: FILTER_USERS, payload: text });
  };

  // Clear search filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Ascend users
  const ascendUsers = () => {
    dispatch({ type: ASCEND_USERS });
  };

  // Descend users
  const descendUsers = () => {
    dispatch({ type: DESCEND_USERS });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        error: state.error,
        current: state.current,
        filtered: state.filtered,
        getUsers,
        addUser,
        updateUser,
        deleteUser,
        setCurrent,
        clearCurrent,
        filterUsers,
        clearFilter,
        ascendUsers,
        descendUsers
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
