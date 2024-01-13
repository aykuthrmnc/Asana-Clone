import Section from "../../models/Section.js";

export const list = (data) => {
  return Section.find(data || {}).populate({
    path: "user_id",
    select: "full_name email profile_image",
  });
  // .populate({
  //   path: "project_id",
  //   select: "name",
  // });
};

export const insert = (data) => {
  return new Section(data).save();
};

export const modify = (data, id) => {
  return Section.findByIdAndUpdate(id, data, { new: true });
  // return Section.findById(id).then((section) => {
  //   section.name = data?.name;
  //   return section.save();
  // });
};

export const remove = (id) => {
  return Section.findByIdAndDelete(id);
};
