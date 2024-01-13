import Task from "../../models/Task.js";

export const list = (data) => {
  return Task.find(data || {}).populate({
    path: "user_id",
    select: "full_name email profile_image",
  });
};

export const findOne = (data, expand) => {
  if (expand) {
    return Task.findOne(data)
      .populate({
        path: "user_id",
        select: "full_name email profile_image",
      })
      .populate({
        path: "comments",
        populate: {
          path: "user_id",
          select: "full_name email profile_image",
        },
      })
      .populate({
        path: "sub_tasks",
        select: "title description isCompleted assigned_to due_date order sub_tasks statuses",
      });
  }
  return Task.findOne(data);
};

export const insert = (data) => {
  return new Task(data).save();
};

export const modify = (data, id) => {
  return Task.findByIdAndUpdate(id, data, { new: true });
  // return Task.findById(id).then((task) => {
  //   task.name = data?.name;
  //   return task.save();
  // });
};

export const remove = (id) => {
  return Task.findByIdAndDelete(id);
};
