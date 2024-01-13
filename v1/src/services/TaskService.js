import BaseModel from "../models/Tasks.js";
import BaseService from "./BaseService.js";

class TaskService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  list(where) {
    return this.Model?.find(where || {}).populate({
      path: "user_id",
      select: "full_name email profile_image",
    });
  }

  findOne(where, expand) {
    if (expand) {
      return this.Model?.findOne(where).populate([
        {
          path: "user_id",
          select: "full_name email profile_image",
        },
        {
          path: "comments",
          populate: {
            path: "user_id",
            select: "full_name email profile_image",
          },
        },
        {
          path: "sub_tasks",
          select: "title description isCompleted assigned_to due_date order sub_tasks statuses",
        },
      ]);
    }
    return this.Model?.findOne(where);
  }
}

export default new TaskService();
