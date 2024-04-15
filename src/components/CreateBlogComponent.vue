<template>
  <div class="createBlog-component container-fluid">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#blogModal">
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
              Modal title
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
export default {
  name: 'CreateBlogComponent',
  setup() {
    const state = reactive({
      newBlog: {

      }
    })
    return {
      state,
      createBlog(newBlog) {
        blogsService.createBlog(state.newBlog)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
