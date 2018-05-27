var Mongoose = require('mongoose');
var Schema = Mongoose.Schema
var clientSchema = Schema(
  {
    name: String,
    email: String,
    phone: String,
    providers: [{ type: Schema.Types.ObjectId, ref: 'providers' }]
  }
);

clientSchema.statics.removeProvider = function removeProvider(id) {
  return new Promise(
    (resolve, reject) => {
      this.update(
        {},
        { $pull: { "providers": Mongoose.Types.ObjectId(id) } },
        { multi: true }
      ).then(result => resolve(result));
    });
}

module.exports = Mongoose.model('clients', clientSchema)
