import { api } from './AxiosService'
import { AppState } from '../AppState'
import router from '../router'

class BlogsService {
  async getAllBlogs() {
    try {
      const res = await api.get('blogs/')
      AppState.allBlogs = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getMyBlogs() {
    try {
      const res = await api.get('profile/blogs')
      AppState.userBlogs = res.data
      // console.log(res.data + 'user blogs')
    } catch (error) {
      console.error(error)
    }
  }

  async showActiveBlog(blogId) {
    try {
      const res = await api.get('blogs/' + blogId)
      AppState.activeBlog = res.data
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  async getComments(blogId) {
    try {
      const res = await api.get('blogs/' + blogId + '/comments')
      console.log(res)
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createBlog(newBlog) {
    try {
      const res = await api.post('blogs/', newBlog)
      console.log(res)
      this.getAllBlogs()
      router.push({ name: 'Home' })
    } catch (error) {
      console.error(error)
    }
  }

  async editBlog(blogData) {
    try {
      const res = await api.put('blogs/' + blogData.blogId, blogData)
      AppState.activeBlog = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async removeBlog(blogId) {
    try {
      await api.delete('blogs/' + blogId)
    } catch (error) {
      console.error(error)
    }
  }

  async addComment(comment) {
    try {
      const res = await api.post('comments/', comment)
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async editComment(commentInfo) {
    try {
      const res = await api.put('comments/' + commentInfo._id, commentInfo)
      AppState.comments = res.data
      this.getActiveBlogComments(commentInfo.blog)
    } catch (error) {
      console.error(error)
    }
  }

  async removeComment(commentId, blogId) {
    try {
      await api.delete('comments/' + commentId)
      this.getActiveBlogComments(blogId)
    } catch (error) {
      console.error(error)
    }
  }

  async getActiveBlogComments(blogData) {
    try {
      const res = await api.get('blogs/' + blogData + '/comments')
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const blogsService = new BlogsService()
