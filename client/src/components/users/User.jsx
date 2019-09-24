import React, { Fragment, useContext } from "react";
import UserContext from "../../context/user/userContext";
import { Link } from "react-router-dom";

const User = props => {
  const { user } = props;
  const userContext = useContext(UserContext);
  const { deleteUser, setCurrent } = userContext;
  const { name, email, username, _id } = user;
  return (
    <Fragment>
      <div
        style={{ position: "relative" }}
        className="tc bg-light-green dib br3 pa3 grow ma2 bw2 shadow-5"
      >
        <span
          onClick={() => deleteUser(_id)}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 2,
            cursor: "pointer",
            fontSize: "2em"
          }}
          className="pa2"
        >
          &times;
        </span>
        <div>
          <img
            src={`https://robohash.org/${_id}?size=200x200&set=set4`}
            alt="Robot"
          />
        </div>
        <h2>{name}</h2>
        <h3>Username: {username}</h3>
        <p>E-mail: {email}</p>
        <Link
          to={`/update-user/${_id}`}
          className="ma1"
          style={{ color: "black" }}
          onClick={() => setCurrent(user)}
        >
          Update user
        </Link>
        <Link to={`/user/${_id}`} className="ma1" style={{ color: "black" }}>
          Visit {name && name.split(" ")[0]}
        </Link>
      </div>
    </Fragment>
  );
};

export default User;
