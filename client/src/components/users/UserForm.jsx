import React, { Fragment, useState, useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";

const UserForm = props => {
  const userContext = useContext(UserContext);
  const { addUser, updateUser, current, clearCurrent } = userContext;
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      city: ""
    }
  });

  useEffect(
    () => {
      if (current !== null) {
        setUser(current);
      } else {
        setUser({
          name: "",
          username: "",
          email: "",
          address: {
            street: "",
            city: ""
          }
        });
      }
    },
    [userContext, current]
  );

  // eslint-disable-next-line
  const { name, username, email } = user;

  // console.log(user);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onAddressChange = e => {
    const { street, city } = user.address;
    // console.log(user);
    // console.log(e.target.name);
    if (e.target.name === "street") {
      setUser({
        name,
        username,
        email,
        address: {
          street: e.target.value,
          city
        }
      });
    } else {
      setUser({
        name,
        username,
        email,
        address: {
          city: e.target.value,
          street
        }
      });
    }
  };

  const clearAll = () => {
    clearCurrent();
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addUser(user);
    } else {
      updateUser(user);
    }
    clearAll();
    // console.log(user);
    props.history.push("/");
  };

  return (
    <Fragment>
      <h1 className="tc ma2">
        {current ? "Update the user" : "Add a new user"}
      </h1>
      <form onSubmit={onSubmit} className="measure center">
        <div className="mt3">
          <label htmlFor="name">Name</label>
          <input
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={onChange}
            required
          />
        </div>
        <div className="mt3">
          <label htmlFor="username">Username</label>
          <input
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={onChange}
            required
          />
        </div>
        <div className="mt3">
          <label htmlFor="email">Email</label>
          <input
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
            type="email"
            name="email"
            value={email}
            placeholder="Email address"
            onChange={onChange}
            required
          />
        </div>
        <hr />
        {props.location.pathname === "/add" && (
          <Fragment>
            <div className="mt3">
              <label htmlFor="address">City</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="city"
                value={user.address.city}
                placeholder="Your city"
                onChange={onAddressChange}
                required
              />
            </div>
            <div className="mt3">
              <label htmlFor="address">Street</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="street"
                value={user.address.street}
                placeholder="Your street"
                onChange={onAddressChange}
                required
              />
            </div>
          </Fragment>
        )}
        <hr />
        <input
          className="mt3 pa2 ba bg-transparent hover-bg-black hover-white w-100 grow"
          type="submit"
          value={current ? "Update user" : "Add user"}
        />
      </form>
    </Fragment>
  );
};

export default UserForm;
