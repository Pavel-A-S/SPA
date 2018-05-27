var Client = require('../models/client');
var Provider = require('../models/provider');

exports.index = (req, res) => {
  Client.find().then((clients) => {
    Provider.find().then((providers) => {
      res.json({ message: 'Ok', clients: clients, providers: providers });
    });
  });
};

exports.show = (req, res) => {
  client = Client.findById(req.params.id).then((response) => {
    if (response) {
      res.json({ message: 'Record was found', clients: [response] });
    } else {
      res.status(404).json({ message: "Record wasn't found" });
    }
  }).catch((error) => {
    if (error) {
      res.status(400).json({ message: 'Error', response: error });
    }
  });
};

exports.create = (req, res) => {
  var myPromises =
    req.body.providers.map(
      (p) => {
        return Provider.addIfNotExists(p);
      }
    );

  Promise.all(myPromises).then((results) => {
    var client = new Client({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      providers: results
    });

    client
      .save()
      .then((response) => {
        res.json({ message: 'Client was created', response: response });
      });

  });
};

exports.update = (req, res) => {
  var client_data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    providers: req.body.providers
  };
  Client.findOneAndUpdate({ _id: req.params.id }, client_data, { new: true })
    .then((response) => {
      if (response) {
        res.json({ message: 'Record was updated', response: response });
      } else {
        res.status(404).json({ message: "Record wasn't found" });
      }
    })
    .catch((error) => {
      if (error) {
        res.status(400).json({ message: 'Error', response: error });
      }
    });
};

exports.delete = (req, res) => {
  Client.findByIdAndRemove(req.params.id).then((response) => {
    if (response) {
      res.json({ message: 'Record was deleted', response: response });
    } else {
      res.status(404).json({ message: "Record wasn't found" });
    }
  }).catch((error) => {
    if (error) {
      res.status(400).json({ message: 'Error', response: error });
    }
  });
};
