import httpStatus from "http-status";
import ApiError from "../errors/ApiError.js";

const idChecker = (field) => (req, res, next) => {
  if (!req?.params?.[field || "id"]?.match(/^[0-9a-fA-F]{24}$/)) {
    next(new ApiError("Lütfen geçerli bir ID bilgisi giriniz.", httpStatus.BAD_REQUEST));
    return;
  }
  next();
};

export default idChecker;
