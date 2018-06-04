var Client = require('../models/client');
var Provider = require('../models/provider');

exports.create = (req, res) => {
  var provider = new Provider({ name: req.body.name });
  provider
    .save()
    .then((response) => {
      res.json({ message: 'Provider was created', response: response });
    }).catch((error) => {
      if (error.errors.name) {
        res.json(
          {
            message: 'validation error',
            response: error.errors.name.message
          }
        );
      } else {
        res.status(400).json({ message: 'Error', response: error });
      }
    });
};

exports.delete = (req, res) => {
  Client.removeProvider(req.params.id)
  .then((response) => {
    Provider.findByIdAndRemove(req.params.id).then((r) => {
      if (r) {
        res.json({ message: 'Record was deleted', response: r });
      } else {
        res.status(404).json({ message: "Record wasn't found" });
      }
    }).catch((error) => {
      if (error) {
        res.status(400).json({ message: 'Error', response: error });
      }
      });
    }).catch((error) => {
      if (error) {
        res.status(400).json({ message: 'Error', response: error });
      }
    });
};

exports.update = (req, res) => {
  var provider_data = {
    name: req.body.name
  };
  Provider.findById(req.params.id).then((response) => {
    return Object.assign(response, provider_data);
  }).then((provider) => {
    return provider.save();
  }).then((response) => {
    if (response) {
      res.json({ message: 'Record was updated', response: response });
    } else {
      res.status(404).json({ message: "Record wasn't found" });
    }
  }).catch((error) => {
    if (error.errors.name) {
      res.json(
        {
          message: 'validation error',
          response: error.errors.name.message
        }
      );
    } else {
      res.status(400).json({ message: 'Error', response: error });
    }
  });
};
