<template>
  <div class="activeBlog-page">
    <div class="row d-flex justify-content-center align-items-center text-center currentblog">
      <div class="col-6 card shadow-lg rounded overflow-auto">
        <!-- <img :src="activeBlog.creator.picture" class="img-fluid" /> -->
        <h1 class="mr-5">
          <u>{{ activeBlog.title }}</u>
        </h1>
        <h5>By: {{ activeBlog.creatorEmail }}</h5>
        <p class="mt-3">
          {{ activeBlog.body }}
        </p>
        <button v-if="activeBlog.creatorEmail" type="button" class="btn" data-toggle="modal" data-target="#blogModal">
          <i class="far fa-edit"></i>
        </button>
        <button @click="removeBlog" v-if="activeBlog.creatorEmail" class="text-danger border-0 bg-transparent">
          <i class="fas fa-backspace"></i>
        </button>

        <h2>Comments<i class="fas fa-comments ml-3"></i></h2>
        <!-- Comment Cpmponent  -->
        <comments-component v-for="comments in comments" :key="comments.body" :comments-prop="comments" />

        <!-- Add Comment -->
        <form class="form-group d-flex justify-content-center mt-3" @submit.prevent="addComment">
          <input type="text" name="comment" placeholder="Write a comment..." v-model="state.newComment.body">
          <button class="btn border-0 bg-transparent" type="submit">
            <i class="fas fa-reply"></i>
          </button>
        </form>

        <!-- Edit Modal -->
        <form @submit.prevent="editBlog">
          <div class="modal" tabindex="-1" role="dialog" id="blogModal">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">
                    <input class="border border-none" type="text" v-model="state.editBlog.title" placeholder="Title">
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="input-group">
                    <textarea class="form-control" aria-label="With textarea" v-model="state.editBlog.body">
                  </textarea>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary" id="submitBtn">
                    Save changes
                  </button>
                  <button type="button" class="btn btn-danger" data-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import CommentsComponent from '../components/CommentsComponent'
import router from '../router'
export default {
  name: 'ActiveBlogPage',
  components: { CommentsComponent },
  setup() {
    const route = useRoute()
    const state = reactive({
      newComment: {
        blog: route.params.blogId
      },
      editBlog: {
        blogId: route.params.blogId
      }
    })
    onMounted(() => {
      blogsService.showActiveBlog(route.params.blogId)
      blogsService.getComments(route.params.blogId)
    })
    return {
      state,
      activeBlog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      removeBlog() {
        blogsService.removeBlog(route.params.blogId)
        router.push({ name: 'Home' })
      },
      addComment() {
        blogsService.addComment(state.newComment)
      },
      editBlog() {
        blogsService.editBlog(state.editBlog)
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
