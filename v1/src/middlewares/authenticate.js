import httpStatus from "http-status";
import JWT from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || null;
  if (token === null) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: "Bu işlemi yapmak için giriş yapılmalıdır." });
  }

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(httpStatus.FORBIDDEN).send({ error: err });
    }

    req.user = user?._doc;
    next();
  });
};

export default authenticate;
