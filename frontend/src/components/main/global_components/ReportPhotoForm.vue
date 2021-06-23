<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Photo report form</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form name="form" @submit.prevent="reportPhoto" class="photo-report-form">
            <div class="form-group">
              <label for="aboutMe"> write down your report : </label>
              <textarea  name="aboutMe" 
                        placeholder="please, write here ..."
                        type="text" 
                        cols="30" rows="2" 
                        class="form-control"
                        v-model="userMessage">
              </textarea>
              <div class="alert alert-danger" 
                  v-if="errors.has('aboutMe')" 
                  role="alert"> Error: you must submit a text of minimum 3 character long
              </div>
            </div>
                <div class="form-group">
                  <button v-show="userMessage.length >=5" class="btn btn-success send-report" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>
                      Sent report 
                      <font-awesome-icon id="icon-paper-plane" icon="paper-plane" />
                    </span>
                  </button>
                </div>
          </form>
          <button type="button" ref="modalCloser" @click="onReset" class="btn btn-secondary" data-dismiss="modal"> 
            Close 
            <font-awesome-icon id="icon-times-circle" icon="times-circle" />
          </button>
        </div>
        <div class="modal-footer" v-if="message || userMessage.length < 5">
          <span v-if="userMessage.length < 5"> Please, type in at least 5 characters</span>
          <span v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{message}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: ['photoUuid'],
    data() {
        return {
            loading: false,
            message: "",
            userMessage: "",
            submitted: false,
            successful: false,
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        photo() {
          return this.props.photoUuid;
        }
    },

    methods: {
        ...mapActions(["createReportPhotoAction", "getAllPhotosAction"]),

        onReset() {
          this.userMessage='';
          this.$validator.reset();
          this.message = "";
          this.$refs.modalCloser.click();
        },

        async reportPhoto() {
          try {
              this.message = '';
              this.submitted = true;
              this.loading = true;
              const photoUuid = this.photoUuid;
              const message = this.userMessage
              const data = {photoUuid, message };
              const response = await this.$store.dispatch("createPhotoReportAction", data);
              this.message = response.data;
              this.successful = true;
              this.loading = false;
              this.getAllPhotosAction();
              setTimeout(this.onReset, 1000);
          } catch(error) {
              this.loading = false;
              this.message = (error.response && error.response.data) || error.message || error.toString();
              this.successful = false;
          }
      },

  },
};
</script>

<style lang="scss" scoped> 
.photo-report-form {
  // z-index: 5!important;
  // position: absolute;
  // background: grey;
  // padding: 3rem 1rem;
}

.send-report {
  position: absolute;
  right: 2rem;
}

</style>
