import httpStatus from "http-status";
import ProjectService from "../services/ProjectService.js";
import ApiError from "../errors/ApiError.js";

class Project {
  index(req, res, next) {
    ProjectService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  create(req, res, next) {
    req.body.user_id = req.user; // req.user._id;
    ProjectService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  update(req, res, next) {
    ProjectService.update(req.params.id, req.body)
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

  deleteProject = (req, res) => {
    ProjectService.delete(req.params.id)
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
  };
}

export default new Project();
