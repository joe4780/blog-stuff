<template>
  <div class="home">
    <div class="jumbotron jumbotron-fluid text-center mainPage">
      <div class="container align-content-center">
        <h1 class="display-4 text-light">
          Bloggz
        </h1>
        <p class="lead text-light">
          See what others are saying
        </p>
        <button type="button" class="btn btn-primary border-0 background-none" data-toggle="modal" data-target="#blogModal">
          Create Blog
        </button>

        <!-- Modal -->
        <div class="modal fade"
             id="blogModal"
             tabindex="-1"
             role="dialog"
             aria-labelledby="blogModalLabel"
             aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="blogModalLabel">
                  Drop a line
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="createBlog" action="">
                  <div class="col-8 offset-2 my-2">
                    <input type="text" placeholder="Blog Title" class="form-control" v-model="state.newBlog.title">
                  </div>
                  <div class="col-8 offset-2 my-2">
                    <input type="text" placeholder="Blog Body" class="form-control" v-model="state.newBlog.body">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Create Blog
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <blogs-component @click="showActiveBlog(blogs.id)" v-for="blogs in allBlogs" :key="blogs.tags" :blogs-prop="blogs" />
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import BlogsComponent from '../components/BlogsComponent'
import { AppState } from '../AppState'
import router from '../router'

export default {
  name: 'Home',
  components: { BlogsComponent },
  setup() {
    const state = reactive({
      newBlog: {}
    })
    onMounted(() => {
      blogsService.getAllBlogs()
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      allBlogs: computed(() => AppState.allBlogs),
      showActiveBlog(blogId) {
        blogsService.showActiveBlog(blogId)
        router.push({ name: 'ActiveBlogPage', params: { blogId: blogId } })
      },
      createBlog(newBlog) {
        console.log(state.newBlog.body, state.newBlog.title)
        blogsService.createBlog(state.newBlog)
      },
      getAllBlogs() {
        blogsService.getAllBlogs()
      }
    }
  }
}
</script>
