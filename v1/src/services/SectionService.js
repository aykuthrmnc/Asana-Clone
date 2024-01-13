import BaseModel from "../models/Sections.js";
import BaseService from "./BaseService.js";

class SectionService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  list(where) {
    return this.Model?.find(where || {}).populate({
      path: "user_id",
      select: "full_name email profile_image",
    });
    // .populate({
    //   path: "project_id",
    //   select: "name",
    // });
  }
}

export default new SectionService();
