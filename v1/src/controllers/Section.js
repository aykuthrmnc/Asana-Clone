import httpStatus from "http-status";
import SectionService from "../services/SectionService.js";

class Section {
  index(req, res) {
    if (!req.params.projectId) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "Proje bilgisi eksiktir." });
    }

    SectionService.list({ project_id: req.params.projectId })
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  create(req, res) {
    req.body.user_id = req.user; // req.user._id;

    SectionService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  update(req, res) {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "ID bilgisi eksiktir." });
    }

    SectionService.update(req.params.id, req.body)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  deleteSection(req, res) {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "ID bilgisi eksiktir." });
    }

    SectionService.delete(req.params.id)
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
  }
}

export default new Section();
