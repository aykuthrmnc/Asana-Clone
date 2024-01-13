import BaseModel from "../models/Projects.js";
import BaseService from "./BaseService.js";

class ProjectsService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  list(where) {
    return this.Model?.find(where || {}).populate({
      path: "user_id",
      select: "full_name email profile_image",
    });
  }
}

export default new ProjectsService();
