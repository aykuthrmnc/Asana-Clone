import httpStatus from "http-status";
import ProjectService from "../services/ProjectService.js";

export const index = (req, res) => {
  ProjectService.list()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

export const create = (req, res) => {
  req.body.user_id = req.user; // req.user._id;
  ProjectService.create(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

export const update = (req, res) => {
  if (!req.params.id) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "ID bilgisi eksiktir." });
  }

  ProjectService.update(req.params.id, req.body)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

export const deleteProject = (req, res) => {
  if (!req.params.id) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "ID bilgisi eksiktir." });
  }

  ProjectService.delete(req.params.id)
    .then((response) => {
      if (!response) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Böyle bir kayıt bulunmamaktadır.",
        });
      }
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};
