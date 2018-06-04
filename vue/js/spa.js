import modal from "../vue-components/spa-modal.vue"
Vue.component('client-form', modal)

new Vue({
  el: '#root',

  data: {
    validationError: "",
    providerValidationError: "",
    clients: [],
    providers: [],
    createProviderButton: true,
    updateProviderButton: false,
    provider: {
      _id: null,
      name: ""
    },
    client: {
      name: "",
      email: "",
      phone: "",
      providers: []
    },
    clientsProvidersNames: [],
    currentClientProviders: {},
  },
  computed: {
    setClientProvidersNames() {
      this.clientsProvidersNames = {};
      this.clients.forEach(client => {
        var providersNames = "";
        client.providers.forEach(id => {
          this.providers.forEach(provider => {
            if (provider._id === id) {
              if (providersNames === '') {
                providersNames = provider.name;
              } else {
                providersNames = providersNames + ', ' + provider.name;
              }
              this.clientsProvidersNames[client._id] = providersNames;
            }
          });
        });
      });
    },
    setProviderCheckboxState() {
      this.currentClientProviders = JSON.parse(JSON.stringify(this.providers));
      this.currentClientProviders.forEach(provider => {
        if (this.client.providers.findIndex(p => p._id === provider._id) >= 0) {
          provider.state = true;
        } else {
          provider.state = false;
        }
      });
    },
  },
  methods: {
    setProviderButton(button, provider = null) {
      this.providerValidationError = "";
      if (button === 'edit') {
        this.createProviderButton = false;
        this.updateProviderButton = true;
        this.provider = provider;
      } else if (button === 'create') {
        this.createProviderButton = true;
        this.updateProviderButton = false;
        this.provider = { _id: null, name: null };
      }
    },
    changeClientProviderState(provider) {
      var index = this.currentClientProviders
                      .findIndex(p => p._id === provider._id);
      if (provider.state) {
        this.client.providers = this.client.providers.filter(x => {
          return x._id != provider._id
        });
        this.currentClientProviders[index].state = false;
      } else {
        this.client.providers.push(Object.assign({}, this.providers[index]));
        this.currentClientProviders[index].state = true;
      }
    },
    sendForm(type) {
      if (type === 'createProvider') {
        this.providerValidationError = "";
        this.sendNewProviderForm();
      } else if (type === 'updateProvider') {
        this.providerValidationError = "";
        this.sendUpdatedProviderForm();
      } else if (this.client._id === "") {
        this.sendNewClientForm();
      } else {
        this.sendUpdatedClientForm();
      }
    },
    clientProviders: function(ids = []) {
      this.client.providers = [];
      ids.forEach(id => {
        this.providers.forEach(provider => {
          if (provider._id === id) this.client.providers.push(provider);
        });
      });
    },
    fillCreateClientForm() {
      this.validationError = "";
      this.client._id = "";
      this.client.name = "";
      this.client.email = "";
      this.client.phone = "";
      this.provider.name = "";
      this.clientProviders();
      this.setProviderCheckboxState;
      this.setProviderButton('create');
    },
    fillEditClientForm(client) {
      this.validationError = "";
      this.client._id = client._id;
      this.client.name = client.name;
      this.client.email = client.email;
      this.client.phone = client.phone;
      this.clientProviders(client.providers);
      this.setProviderCheckboxState;
      this.setProviderButton('create');
    },
    sendDeleteClient(client) {
      this.validationError = "";
      axios
      .delete(`/clients/${client._id}`)
      .then((response) => {
        this.getNewData();
      })
      .catch((error) => { console.log(error); });
    },
    sendDeleteProvider(provider) {
      this.providerValidationError = "";
      axios
      .delete(`/providers/${provider._id}`)
      .then((response) => {
        this.getNewData();
      })
      .catch((error) => { console.log(error); });
    },
    sendUpdatedClientForm() {
      axios.put(
        `/clients/${this.client._id}`,
        {
          "name": this.client.name,
          "email": this.client.email,
          "phone": this.client.phone,
          "providers": this.client.providers
        }
      )
      .then((response) => {
        if (response.data && response.data.message === "validation error") {
          this.validationError = response.data.response;
        }
        this.getNewData();
      })
      .catch((error) => { console.log(error); });
    },
    sendNewClientForm() {
      axios.post(
        `/clients`,
        {
          "name": this.client.name,
          "email": this.client.email,
          "phone": this.client.phone,
          "providers": this.client.providers
        }
      )
      .then((response) => {
        if (response.data && response.data.message === "validation error") {
          this.validationError = response.data.response;
        }
        this.getNewData();
      })
      .catch((error) => { console.log(error); });
    },
    sendNewProviderForm() {
      axios.post(
        `/providers`,
        {
          "name": this.provider.name
        }
      )
      .then((response) => {
        if (response.data && response.data.message === "validation error") {
          this.providerValidationError = response.data.response;
        }
        this.getNewData();
      })
      .catch((error) => { console.log(error); });
    },
    sendUpdatedProviderForm() {
      axios.put(
        `/providers/${this.provider._id}`,
        {
          "name": this.provider.name
        }
      )
      .then((response) => {
        this.setProviderButton('create');
        if (response.data && response.data.message === "validation error") {
          this.providerValidationError = response.data.response;
        }
        this.getNewData();
      })
      .catch((error) => { console.log(error); });
    },
    getNewData() {
      axios.get('/clients').then(
        (response) => {
          this.clients = response.data.clients;
          this.providers = response.data.providers;
          this.setClientProvidersNames;
          this.setProviderCheckboxState;
          this.provider.name = "";
        }
      );
    }
  },
  mounted() {
    this.getNewData();
  }
});
