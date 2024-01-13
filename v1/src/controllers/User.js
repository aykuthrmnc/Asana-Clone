import * as uuid from "uuid";
import httpStatus from "http-status";
import path from "path";
import { fileURLToPath } from "url";
import { generateAccessToken, generateRefreshToken, passwordToHash } from "../scripts/utils/helper.js";
import eventEmitter from "../scripts/events/eventEmitter.js";
import UserService from "../services/UserService.js";
import ProjectService from "../services/ProjectService.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class User {
  index(req, res) {
    UserService.list(req.body)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  create(req, res) {
    req.body.password = passwordToHash(req.body.password);

    UserService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  update(req, res) {
    UserService.update(req.user?._id, req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  deleteUser(req, res) {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "ID bilgisi eksiktir." });
    }

    UserService.delete(req.params.id)
      .then((response) => {
        if (!response) {
          return res.status(httpStatus.NOT_FOUND).send({
            message: "Böyle bir kayıt bulunmamaktadır.",
          });
        }
        res.status(httpStatus.OK).send({
          message: "Kayıt silinmiştir.",
        });
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  projectList(req, res) {
    ProjectService.list({ user_id: req.user?._id })
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  login(req, res) {
    req.body.password = passwordToHash(req.body.password);

    UserService.findOne(req.body)
      .then((user) => {
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır." });
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
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  resetPassword(req, res) {
    const new_password = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`;
    UserService.updateWhere({ email: req.body.email }, { password: passwordToHash(new_password) })
      .then((user) => {
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır." });
        }
        eventEmitter.emit("send_email", {
          to: user.email,
          subject: "Şifre Sıfırlama",
          html: `Talebiniz üzerine şifre sıfırlama isteğiniz gerçekleşmiştir. <br/> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmayın! Yeni Şifreniz: <b>${new_password}</b>`,
        });

        res.status(httpStatus.OK).send({ message: "Şifre sıfırlama işlemi için sisteme kayıtlı e-posta adresinize gereken bilgileri gönderdik." });
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  changePassword(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.update(req.user?._id, req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  updateProfileImage(req, res) {
    if (!req?.files?.profile_image) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "Bu işlemi yapabilmek için dosya yüklenmesi gerekmektedir." });
    }

    const extension = path.extname(req.files.profile_image.name);
    const fileName = req?.user._id + extension;
    const folderPath = path.join(__dirname, "../uploads/user", fileName);

    req.files.profile_image.mv(folderPath, (error) => {
      if (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
      }

      UserService.update(req.user?._id, { profile_image: fileName })
        .then((response) => {
          res.status(httpStatus.CREATED).send(response);
        })
        .catch((err) => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    });
  }
}

export default new User();
