import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "secret123", {
    expiresIn: "7d"
  });
};

export default generateToken;