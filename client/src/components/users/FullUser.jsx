import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/user/userContext";

const FullUser = props => {
  const userContext = useContext(UserContext);
  const { users } = userContext;
  const { id } = props.match.params;
  const userToBe = users.filter(usr => usr._id.toString() === id.toString());
  const [user] = userToBe;
  // console.log(user);
  const { name, username, email } = user;
  // console.log(user);
  return (
    <div className="tc">
      <div className="bg-light-green dib br3 pa3 bw2 shadow-5">
        <div>
          <img
            src={`https://robohash.org/${id}?size=300x300&set=set4`}
            alt="Robot"
          />
        </div>
        <h2>{name}</h2>
        <h3>Username: {username}</h3>
        <p>{email}</p>
        {user.address && (
          <p>
            Hello! My name is {name.split(" ")[0]} , and I'm a developer. You
            can always find me at home, which is at {user.address.street} street
            in {user.address.city}.
          </p>
        )}
        <p>Thank you for coming to my page and I hope to hear from you.</p>
        <Link
          to="/"
          className="db mt3 pa2"
          style={{ color: "black", border: "4px double black" }}
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default FullUser;
