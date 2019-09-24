import React, { useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import User from "./User";

function UserList(props) {
  // console.log(props);
  const userContext = useContext(UserContext);
  const { users, getUsers, filtered } = userContext;
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="tc">
      {filtered ? (
        filtered.map(user => <User user={user} key={user._id} {...props} />)
      ) : !users ? (
        <h3>Loading...</h3>
      ) : (
        users.map(user => <User user={user} key={user._id} {...props} />)
      )}
    </div>
  );
}

export default UserList;
