import { reactive } from 'vue'

export const AppState = reactive({
  user: {},
  profile: {},
  allBlogs: [],
  userBlogs: [],
  activeBlog: {},
  comments: [],
  profileBlogs: []
})
