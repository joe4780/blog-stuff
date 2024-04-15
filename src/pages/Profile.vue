<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
    <div class="row">
      <blogs-component v-for="blog in userBlogs" :key="blog" :blogs-prop="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
import BlogsComponent from '../components/BlogsComponent'
import { blogsService } from '../services/BlogsService'
export default {
  name: 'Profile',
  setup() {
    onMounted(() => profileService.getProfile())
    onMounted(() => blogsService.getMyBlogs())
    return {
      profile: computed(() => AppState.profile),
      userBlogs: computed(() => AppState.userBlogs)
    }
  },
  components: { BlogsComponent }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
