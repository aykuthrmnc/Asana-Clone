import Project from "../../models/Projects.js";

export const list = (data) => {
  return Project.find(data || {}).populate({
    path: "user_id",
    select: "full_name email profile_image",
  });
};

export const insert = (data) => {
  //   ProjectModel
  const project = new Project(data);
  return project.save();
};

export const modify = (data, id) => {
  return Project.findByIdAndUpdate(id, data, { new: true });
  // return Project.findById(id).then((project) => {
  //   project.name = data?.name;
  //   return project.save();
  // });
};

export const remove = (id) => {
  return Project.findByIdAndDelete(id);
};
