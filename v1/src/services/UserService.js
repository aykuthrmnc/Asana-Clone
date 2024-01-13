import BaseModel from "../models/User.js";
import BaseService from "./BaseService.js";

class UserService extends BaseService {
  constructor() {
    super(BaseModel);
  }
}

export default new UserService();
