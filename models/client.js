var Mongoose = require('mongoose');
var Schema = Mongoose.Schema
var clientSchema = Schema(
  {
    name: String,
    email: {
      type: String,
      validate: [
        {
          validator: checkEmailUniqueness,
          msg: 'Client with this email already exists!'
        },
        {
          validator: checkIfBlank,
          msg: "Client email must not be blank!"
        }
      ]
    },
    phone: String,
    providers: [{ type: Schema.Types.ObjectId, ref: 'providers' }],
  }
);

function checkEmailUniqueness() {
  return new Promise((resolve, reject) => {
    Mongoose.model('clients', clientSchema)
      .findOne({ email: new RegExp("^" + this.email + "$", 'i') },
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

function checkIfBlank() { return this.email.trim() === "" ? false : true }

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
