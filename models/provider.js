var Mongoose = require('mongoose');
var Schema = Mongoose.Schema
var providerSchema = Schema(
  {
    name: {
      type: String,
      validate: [
        {
          validator: checkNameUniqueness,
          msg: 'Provider with this name already exists!'
        },
        {
          validator: checkIfBlank,
          msg: "Provider name must not be blank!"
        }
      ]
    }
  }
);

function checkNameUniqueness() {
  return new Promise((resolve, reject) => {
    Mongoose.model('providers', providerSchema)
      .findOne({ name: new RegExp("^" + this.name + "$", 'i') },
        (error, record) => {
          if (record && String(record._id) === String(this._id)) {
            resolve(true);
          } else if (!record) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
  });
}

function checkIfBlank() { return this.name.trim() === "" ? false : true }

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

module.exports = Mongoose.model('providers', providerSchema)
