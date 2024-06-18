import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //create a new user and save it to the db
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ messege: "User Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  //db operation

  const { username, password } = req.body;

  try {
    //check if the user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ messege: "Invalid Credentials" });

    //check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ messege: "Invalid Credential" });

    //generate cookie token and sent to the user
    ////res.setHeader("Set-Cookie", "test=", + "myVlaue").json("success");

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin : true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
        //secure:true
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messege: "Failed to login" });
  }
};
export const logout = (req, res) => {
  //clear the cookie
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
