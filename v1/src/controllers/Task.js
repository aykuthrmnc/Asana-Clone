import httpStatus from "http-status";
import TaskService from "../services/TaskService.js";

class Task {
  index(req, res) {
    // if (!req.params.section_id) {
    //   return res.status(httpStatus.BAD_REQUEST).send({ message: "Proje bilgisi eksiktir." });
    // }

    TaskService.list() // { section_id: req.params.section_id }
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  create(req, res) {
    req.body.user_id = req.user; // req.user._id;

    TaskService.create(req.body)
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

    TaskService.update(req.params.id, req.body)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  deleteTask(req, res) {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "ID bilgisi eksiktir." });
    }

    TaskService.delete(req.params.id)
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

  makeComment(req, res) {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "ID bilgisi eksiktir." });
    }

    TaskService.findOne({ _id: req.params.id })
      .then((task) => {
        if (!task) {
          return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kayıt bulunmamaktadır." });
        }

        const comment = {
          ...req.body,
          user_id: req.user,
          commented_at: new Date(),
        };

        task.comments.push(comment);

        task
          .save()
          .then((response) => {
            return res.status(httpStatus.OK).send(response);
          })
          .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
          });
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  deleteComment(req, res) {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "ID bilgisi eksiktir." });
    }

    TaskService.findOne({ _id: req.params.id })
      .then((task) => {
        if (!task) {
          return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kayıt bulunmamaktadır." });
        }

        task.comments = task.comments.filter((c) => c._id != req.params.commentId);

        task
          .save()
          .then((response) => {
            return res.status(httpStatus.OK).send(response);
          })
          .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
          });
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  addSubTask(req, res) {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "ID bilgisi eksiktir." });
    }

    TaskService.findOne({ _id: req.params.id })
      .then((task) => {
        if (!task) {
          return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kayıt bulunmamaktadır." });
        }

        //! SUBTASK CREATE
        TaskService.create({ ...req.body, user_id: req.user })
          .then((subTask) => {
            task.sub_tasks.push(subTask);

            task
              .save()
              .then((response) => {
                return res.status(httpStatus.OK).send(response);
              })
              .catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err));
          })
          .catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err));
      })
      .catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err));
  }

  getTask(req, res) {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "ID bilgisi eksiktir." });
    }

    TaskService.findOne({ _id: req.params.id }, true)
      .then((task) => {
        if (!task) {
          return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kayıt bulunmamaktadır." });
        }
        res.status(httpStatus.OK).send(task);
      })
      .catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err));
  }
}

export default new Task();
