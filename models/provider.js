var mongoose = require('mongoose');
var Schema = mongoose.Schema
var providerSchema = Schema(
  {
    name: String
  }
);

providerSchema.statics.addIfNotExists = function addIfNotExists(p) {
  return new Promise(
    (resolve, reject) => {
      this.findOne({ _id: p._id })
        .then((result) => {
          if (result) {
            resolve({ "_id": result._id });
          } else {
            let provider = new this({ name: p.name });
            provider.save().then(
              (result) => {
                resolve({ "_id": result._id });
              }
            );
          }
        });
    }
  );
}

module.exports = mongoose.model('providers', providerSchema)
