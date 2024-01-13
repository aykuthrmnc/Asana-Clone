import User from "../../models/User.js";

export const list = () => {
  return User.find({});
};

export const insert = (data) => {
  const user = new User(data);
  return user.save();
};

export const loginUser = (data) => {
  return User.findOne(data);
};

export const modify = (where, data) => {
  // // Gelen datadaki üzerindeki bilgileri filtrelemek amaçlı kullanılabilir.
  // // Joi paketi bunu bizim için yapmaktadır.
  // const updatedData = Object.keys(data).reduce((obj, key) => {
  //   if (key !== "password") {
  //     obj[key] = data[key];
  //   }
  //   return obj;
  // }, {});

  return User.findOneAndUpdate(where, data, { new: true });
};

export const remove = (id) => {
  return User.findByIdAndDelete(id);
};
