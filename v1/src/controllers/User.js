import * as uuid from "uuid";
import httpStatus from "http-status";
import path from "path";
import { fileURLToPath } from "url";
import { generateAccessToken, generateRefreshToken, passwordToHash } from "../scripts/utils/helper.js";
import eventEmitter from "../scripts/events/eventEmitter.js";
import UserService from "../services/UserService.js";
import ProjectService from "../services/ProjectService.js";
import ApiError from "../errors/ApiError.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class User {
  index(req, res, next) {
    UserService.list(req.body)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  create(req, res, next) {
    req.body.password = passwordToHash(req.body.password);

    UserService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  update(req, res, next) {
    UserService.update(req.user?._id, req.body)
      .then((response) => {
        if (!response) {
          next(new ApiError("Böyle bir kayıt bulunmamaktadır.", httpStatus.NOT_FOUND));
          return;
        }
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  deleteUser(req, res, next) {
    UserService.delete(req.params.id)
      .then((response) => {
        if (!response) {
          next(new ApiError("Böyle bir kayıt bulunmamaktadır.", httpStatus.NOT_FOUND));
          return;
        }
        res.status(httpStatus.OK).send({
          message: "Kayıt silinmiştir.",
        });
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  projectList(req, res, next) {
    ProjectService.list({ user_id: req.user?._id })
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  login(req, res, next) {
    req.body.password = passwordToHash(req.body.password);

    UserService.findOne(req.body)
      .then((user) => {
        if (!response) {
          next(new ApiError("Böyle bir kullanıcı bulunmamaktadır.", httpStatus.NOT_FOUND));
          return;
        }
        user = {
          ...user.toObject(),
          tokens: {
            access_token: generateAccessToken(user),
            refresh_token: generateRefreshToken(user),
          },
        };
        delete user.password;
        res.status(httpStatus.OK).send(user);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  resetPassword(req, res, next) {
    const new_password = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`;
    UserService.updateWhere({ email: req.body.email }, { password: passwordToHash(new_password) })
      .then((user) => {
        if (!user) {
          next(new ApiError("Böyle bir kullanıcı bulunmamaktadır.", httpStatus.NOT_FOUND));
          return;
        }
        eventEmitter.emit("send_email", {
          to: user.email,
          subject: "Şifre Sıfırlama",
          html: `Talebiniz üzerine şifre sıfırlama isteğiniz gerçekleşmiştir. <br/> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmayın! Yeni Şifreniz: <b>${new_password}</b>`,
        });

        res.status(httpStatus.OK).send({ message: "Şifre sıfırlama işlemi için sisteme kayıtlı e-posta adresinize gereken bilgileri gönderdik." });
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  changePassword(req, res, next) {
    req.body.password = passwordToHash(req.body.password);
    UserService.update(req.user?._id, req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((err) => {
        next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
      });
  }

  updateProfileImage(req, res, next) {
    if (!req?.files?.profile_image) {
      next(new ApiError("Bu işlemi yapabilmek için dosya yüklenmesi gerekmektedir.", httpStatus.BAD_REQUEST));
      return;
    }

    const extension = path.extname(req.files.profile_image.name);
    const fileName = req?.user._id + extension;
    const folderPath = path.join(__dirname, "../uploads/user", fileName);

    req.files.profile_image.mv(folderPath, (error) => {
      if (error) {
        next(new ApiError(error, httpStatus.INTERNAL_SERVER_ERROR));
        return;
      }

      UserService.update(req.user?._id, { profile_image: fileName })
        .then((response) => {
          res.status(httpStatus.CREATED).send(response);
        })
        .catch((err) => {
          next(new ApiError(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
        });
    });
  }
}

export default new User();
