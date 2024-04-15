<template>
  <div class="comments-component card rounded shadow p-1 mb-2 bg-white">
    <div class=" col-12">
      <div class="row">
        <div class="col-12 grow shadow bg-light py-2 d-flex">
          <img :src="commentsProp.creator.picture" class="rounded-circle commentPics" alt="">
          <p class="pl-2 my-auto">
            {{ commentsProp.body }}
          </p>
          <button type="button" class="btn text border-0 bg-transparent " data-toggle="modal" data-target="#commentModal">
            <i class="far fa-edit"></i>
          </button>
          <button class="btn text-danger" @click="removeComment">
            <i class="fas fa-backspace"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <form @submit.prevent="editComment">
    <div class="modal" data-backdrop="false" tabindex="-1" role="dialog" id="commentModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Edit your comment
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group">
              <textarea class="form-control" aria-label="With textarea" v-model="state.editComment.body">
                  </textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" id="submitBtn">
              Save edits
            </button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
  <!-- <div v-if="commentsProp.creator.id == profile.id" class="comments-component card rounded shadow p-1 mb-2 bg-white align-items-center"> -->
  <!-- <h5>{{ commentsProp.creator.name }} <i class="far fa-comment-dots"></i></h5>
    <p>{{ commentsProp.body }}</p>
    <span>
      <button type="button" class="btn btn-success" data-toggle="modal" data-target="#commentModal">
        Edit?
      </button>
      <button class="btn btn-danger" v-if="commentsProp.creatorEmail == profile.email" @click="removeComment">
        &times;
      </button>
    </span>
  </div> -->
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'CommentsComponent',
  props: {
    commentsProp: Object
  },
  setup(props) {
    // const route = useRoute()
    const state = reactive({
      editComment: {
        blog: props.commentsProp.blog,
        _id: props.commentsProp._id
      }
    })
    // onMounted(() => AppState.comments)
    return {
      state,
      profile: computed(() => AppState.profile),
      comments: computed(() => props.commentsProp),
      removeComment() {
        blogsService.removeComment(props.commentsProp._id, props.commentsProp.blog)
      },
      editComment() {
        blogsService.editComment(state.editComment)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
