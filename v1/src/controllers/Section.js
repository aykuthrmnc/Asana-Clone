import httpStatus from "http-status";
import SectionService from "../services/SectionService.js";
import ApiError from "../errors/ApiError.js";

class Section {
  index(req, res, next) {
    SectionService.list({ project_id: req.params.projectId })
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  create(req, res, next) {
    req.body.user_id = req.user; // req.user._id;

    SectionService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  update(req, res, next) {
    SectionService.update(req.params.id, req.body)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  deleteSection(req, res, next) {
    SectionService.delete(req.params.id)
      .then((response) => {
        if (!response) {
          next(new ApiError("Böyle bir kayıt bulunmamaktadır.", httpStatus.NOT_FOUND));
          return;
        }
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }
}

export default new Section();
