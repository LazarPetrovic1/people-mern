import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UserContext from "../../context/user/userContext";

function Nav() {
  const userContext = useContext(UserContext);
  const { ascendUsers, descendUsers } = userContext;
  return (
    <nav
      className="pa2 flex justify-between bb b--white-10"
      style={{ backgroundColor: "#111" }}
    >
      <h1 className="link dim f6 f5-ns dib pa2">
        <Link to="/" style={{ color: "white" }}>
          RobotUsers
        </Link>
      </h1>
      <SearchBar />
      <Fragment>
        <button
          className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black"
          onClick={ascendUsers}
          style={{
            outline: "none",
            border: "4px double lightgray",
            userSelect: "none"
          }}
        >
          ASC
        </button>
        <button
          className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black"
          onClick={descendUsers}
          style={{
            outline: "none",
            border: "4px double lightgray",
            userSelect: "none"
          }}
        >
          DESC
        </button>
      </Fragment>
      <ul>
        <li className="link dim f6 f5-ns dib mr3">
          <Link to="/">Home</Link>
        </li>
        <li className="link dim f6 f5-ns dib mr3">
          <Link to="/add">Add another user</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
