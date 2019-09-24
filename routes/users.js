const router = require("express").Router(),
  mongoose = require("mongoose"),
  config = require("config"),
  User = require("../models/User"),
  { check, validationResult } = require("express-validator");
const axios = require("axios");

// @route -- Post -- /
// @desc -- -- Seed the database
// @access -- -- Unknown
// @use -- Manually -- Postman -- Uncomment

// router.post("/", async (req, res) => {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/users"
//   );
//   const data = response.data;
//   console.log(response);
//   console.log(data);
//   const users = Array.from(data);
//
//   // users.forEach(user => {
//   //   let { name, email, username, address } = user;
//   //   let newUser = new User({
//   //     name,
//   //     email,
//   //     username,
//   //     address
//   //   });
//   //   newUser.save();
//   // })
//
//   for (user of users) {
//     let { name, email, username, address } = user;
//     let newUser = new User({
//       name,
//       email,
//       username,
//       address
//     });
//     newUser.save();
//   }
//
//   res.json({ msg: "Hello" });
// });

// @route -- Get -- /
// @desc -- -- Get & sort all users
// @access -- -- Public
// @use -- Manually/Automatically -- Postman/Code-exec

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    // console.log(users);
    res.json(users);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

// @route -- Post -- /add
// @desc -- -- Add a user to the database
// @access -- -- Public
// @use -- Manually/Automatically -- Postman/Code-exec

router.post(
  "/add",
  [
    check("name", "Please enter a name.")
      .not()
      .isEmpty(),
    check("username", "Please enter a username.")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email.").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      name,
      email,
      username,
      address: { street, city }
    } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) return res.status(400).json({ msg: "User already exists." });

      user = new User({
        name,
        email,
        username,
        address: {
          street,
          city
        }
      });

      user = await user.save();

      console.log(user);

      res.json({ user });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal server error.");
    }
  }
);

// @route -- Put -- /update-user/:id
// @desc -- -- Update or edit a specific user
// @access -- -- Public
// @use -- Manually/Automatically -- Postman/Code-exec

router.put("/update-user/:id", async (req, res) => {
  await console.log("RIKVEST", req);
  const { name, email, username, address, _id } = await req.body;
  await console.log("NAME", name);
  await console.log("EMAIL", email);
  await console.log("USERNAME", username);
  await console.log("ADDRESS", address);

  const userUpdated = {
    _id,
    name,
    username,
    email,
    ...address,
    ...req.body
  };

  if (name) userUpdated.name = name;
  if (username) userUpdated.username = username;
  if (email) userUpdated.email = email;
  if (address) userUpdated.address = address;

  await console.log("USER UPDATED", userUpdated);

  try {
    await console.log("REK PARAMS", req.params);
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          name: userUpdated.name,
          username: userUpdated.username,
          email: userUpdated.email,
          address: {
            city: userUpdated.address.city,
            street: userUpdated.address.street
          }
        }
      },
      { new: true }
    );
    await res.json({ user });
  } catch (e) {
    console.error(e.stack);
    res.status(500).send(e.message, "\n", e.stack);
  }
});

// @route -- Delete -- /user/:id
// @desc -- -- Delete a specific user
// @access -- -- Public
// @use -- Manually/Automatically -- Postman/Code-exec

router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found." });
    await User.findByIdAndRemove(id);
    res.json({ msg: "Contact successfully removed." });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
