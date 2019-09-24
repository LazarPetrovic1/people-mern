import React, { useContext, useState } from "react";
import UserContext from "../../context/user/userContext";

function SearchBar() {
  const userContext = useContext(UserContext);
  const [val, setVal] = useState("");

  const { filterUsers, clearFilter } = userContext;
  const onChange = e => {
    filterUsers(val);
    setVal(e.target.value);
    if (val === "") {
      clearFilter();
    }
  };
  return (
    <input
      type="text"
      placeholder="Search for a user"
      value={val}
      onChange={onChange}
      style={{ backgroundColor: "black", color: "white", paddingLeft: "12px" }}
    />
  );
}

export default SearchBar;

// pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100
