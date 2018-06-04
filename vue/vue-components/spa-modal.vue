<template>
  <div
    class="modal fade"
    id="clientForm"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Client</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter your name"
                v-model="formClient.name"
              >
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter email"
                v-model="formClient.email"
              >
            </div>

            <div class="form-group">
              <label for="phone">Phone</label>
              <input
                type="text"
                class="form-control"
                id="phone"
                placeholder="Enter your phone"
                v-model="formClient.phone"
              >
            </div>

            <label for="providers">Providers</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                id="provider"
                placeholder="Provider's name"
                v-model="formProvider.name"
              >
              <div class="input-group-append">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  v-if="formCreateProviderButton"
                  @click="$emit('send-form', 'createProvider')"
                >
                  Add
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  v-if="formUpdateProviderButton"
                  @click="$emit('send-form', 'updateProvider')"
                >
                  Update
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  v-if="formUpdateProviderButton"
                  @click="$emit('set-provider-button', 'create')"
                >
                  Cancel
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-10 offset-1">
                <div
                  class="alert alert-danger text-center"
                  role="alert"
                  v-if="formProviderValidationError != ''">
                    {{formProviderValidationError}}
                </div>
                <table class="table table-sm border">
                  <tbody>
                    <tr v-for="formProvider in formCurrentClientProviders">
                      <td class="border-0">
                        <input
                          type="checkbox"
                          value="test"
                          :id="formProvider._id"
                          :checked="formProvider.state"
                          @click="$emit('change-client-provider-state', formProvider)"
                        >
                      </td>
                      <td class="border-0">{{formProvider.name}}</td>
                      <td class="border-0 text-right">
                        <button
                          type="button"
                          class="btn btn-sm btn-link"
                          @click="$emit('set-provider-button', 'edit', formProvider)"
                        >
                          <img
                            class="glyph-icon"
                            src="libs/glyph-smarticons/svg/si-glyph-edit.svg"
                          />
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-link"
                          @click="$emit('send-delete-provider', formProvider)"
                        >
                          <img
                            class="glyph-icon"
                            src="libs/glyph-smarticons/svg/si-glyph-trash.svg"
                          />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger mr-auto float-left"
            data-dismiss="modal"
            @click="$emit('send-delete-client', formClient)"
          >
            Delete
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('send-form')"
            data-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'client',
      'provider',
      'createProviderButton',
      'updateProviderButton',
      'currentClientProviders',
      'providerValidationError'
    ],
    data() {
      return {
        formCurrentClientProviders: this.currentClientProviders,
        formCreateProviderButton: this.createProviderButton,
        formUpdateProviderButton: this.updateProviderButton,
        formClient: this.client,
        formProvider: this.provider,
        formProviderValidationError: this.providerValidationError
      }
    },
    watch: {
      currentClientProviders(value) {
        this.formCurrentClientProviders = value;
      },
      provider(value) {
        this.formProvider = value;
      },
      createProviderButton(value) {
        this.formCreateProviderButton = value;
      },
      updateProviderButton(value) {
        this.formUpdateProviderButton = value;
      },
      providerValidationError(value) {
        this.formProviderValidationError = value;
      }
    }
  }
</script>
