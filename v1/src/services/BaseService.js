export default class BaseService {
  constructor(Model) {
    this.Model = Model;
  }

  list(where) {
    return this.Model?.find(where || {});
  }

  findOne(where) {
    return this.Model?.findOne(where);
  }

  create(data) {
    return new this.Model(data).save();
  }

  update(id, data) {
    return this.Model?.findByIdAndUpdate(id, data, { new: true });
    // return this.Model?.findById(id).then((item) => {
    //   item.name = data?.name;
    //   return item.save();
    // });
  }

  updateWhere(where, data) {
    return this.Model?.findOneAndUpdate(where, data, { new: true });
  }

  delete(id) {
    return this.Model?.findByIdAndDelete(id);
  }
}
