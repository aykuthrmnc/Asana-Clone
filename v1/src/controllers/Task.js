import httpStatus from "http-status";
import TaskService from "../services/TaskService.js";
import ApiError from "../errors/ApiError.js";

class Task {
  index(req, res, next) {
    // if (!req.params.section_id) {
    //   next(new ApiError("Proje bilgisi eksiktir.", httpStatus.BAD_REQUEST));
    //   return;
    // }

    TaskService.list() // { section_id: req.params.section_id }
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  create(req, res, next) {
    req.body.user_id = req.user; // req.user._id;

    TaskService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  update(req, res, next) {
    TaskService.update(req.params.id, req.body)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  deleteTask(req, res, next) {
    TaskService.delete(req.params.id)
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

  makeComment(req, res, next) {
    TaskService.findOne({ _id: req.params.id })
      .then((task) => {
        if (!task) {
          next(new ApiError("Böyle bir kayıt bulunmamaktadır.", httpStatus.NOT_FOUND));
          return;
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
            next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
          });
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  deleteComment(req, res, next) {
    if (!req.params.id) {
      next(new ApiError("ID bilgisi eksiktir.", httpStatus.BAD_REQUEST));
      return;
    }

    TaskService.findOne({ _id: req.params.id })
      .then((task) => {
        if (!task) {
          next(new ApiError("Böyle bir kayıt bulunmamaktadır.", httpStatus.NOT_FOUND));
          return;
        }

        task.comments = task.comments.filter((c) => c._id != req.params.commentId);

        task
          .save()
          .then((response) => {
            return res.status(httpStatus.OK).send(response);
          })
          .catch((err) => {
            next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
          });
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  addSubTask(req, res, next) {
    TaskService.findOne({ _id: req.params.id })
      .then((task) => {
        if (!task) {
          next(new ApiError("Böyle bir kayıt bulunmamaktadır.", httpStatus.NOT_FOUND));
          return;
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
              .catch((err) => next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
          })
          .catch((err) => next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
      })
      .catch((err) => next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
  }

  getTask(req, res, next) {
    TaskService.findOne({ _id: req.params.id }, true)
      .then((task) => {
        if (!task) {
          next(new ApiError("Böyle bir kayıt bulunmamaktadır.", httpStatus.NOT_FOUND));
          return;
        }
        res.status(httpStatus.OK).send(task);
      })
      .catch((err) => next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
  }
}

export default new Task();
