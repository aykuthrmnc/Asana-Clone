import BaseModel from "../models/Users.js";
import BaseService from "./BaseService.js";

class UserService extends BaseService {
  constructor() {
    super(BaseModel);
  }
}

export default new UserService();
